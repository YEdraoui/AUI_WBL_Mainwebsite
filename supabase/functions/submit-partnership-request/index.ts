import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PartnershipRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  roleProjectType: string;
  timeline?: string;
  additionalNotes?: string;
}

// Simple rate limiting store (in-memory, resets when function restarts)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '')
              .trim()
              .substring(0, 1000); // Limit length
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const checkRateLimit = (clientIP: string): boolean => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 requests per 15 minutes per IP
  
  const current = rateLimitStore.get(clientIP);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  console.log('Partnership request handler called');

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-forwarded-for') || 
                     'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = 'https://rtnxxjwfffbqyrrulzym.supabase.co';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseServiceKey) {
      throw new Error('Missing Supabase service role key');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request data
    const requestData: PartnershipRequest = await req.json();
    console.log('Received partnership request from IP:', clientIP);

    // Validate required fields
    if (!requestData.companyName || !requestData.contactPerson || !requestData.email || !requestData.roleProjectType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Validate email format
    if (!isValidEmail(requestData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Sanitize all input fields
    const sanitizedData = {
      companyName: sanitizeInput(requestData.companyName),
      contactPerson: sanitizeInput(requestData.contactPerson),
      email: requestData.email.toLowerCase().trim(),
      phone: requestData.phone ? sanitizeInput(requestData.phone) : null,
      roleProjectType: sanitizeInput(requestData.roleProjectType),
      timeline: requestData.timeline ? sanitizeInput(requestData.timeline) : null,
      additionalNotes: requestData.additionalNotes ? sanitizeInput(requestData.additionalNotes) : null,
    };

    // Additional validation checks
    if (sanitizedData.companyName.length < 2 || sanitizedData.contactPerson.length < 2) {
      return new Response(
        JSON.stringify({ error: "Company name and contact person must be at least 2 characters long" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Store in database with sanitized data
    const { data: dbData, error: dbError } = await supabase
      .from('partnership_requests')
      .insert({
        company_name: sanitizedData.companyName,
        contact_person: sanitizedData.contactPerson,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        role_project_type: sanitizedData.roleProjectType,
        timeline: sanitizedData.timeline,
        additional_notes: sanitizedData.additionalNotes,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Partnership request saved to database:', dbData);

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('Missing Resend API key');
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content
    const emailHtml = `
      <h2>New Partnership Request Submitted</h2>
      <p>A new partnership request has been submitted through the AUI Work-Based Learning website.</p>
      
      <h3>Company Details:</h3>
      <ul>
        <li><strong>Company Name:</strong> ${sanitizedData.companyName}</li>
        <li><strong>Contact Person:</strong> ${sanitizedData.contactPerson}</li>
        <li><strong>Email:</strong> ${sanitizedData.email}</li>
        ${sanitizedData.phone ? `<li><strong>Phone:</strong> ${sanitizedData.phone}</li>` : ''}
      </ul>
      
      <h3>Project Details:</h3>
      <ul>
        <li><strong>Role/Project Type:</strong> ${sanitizedData.roleProjectType}</li>
        ${sanitizedData.timeline ? `<li><strong>Timeline:</strong> ${sanitizedData.timeline}</li>` : ''}
      </ul>
      
      ${sanitizedData.additionalNotes ? `
      <h3>Additional Notes:</h3>
      <p>${sanitizedData.additionalNotes}</p>
      ` : ''}
      
      <hr>
      <p><small>This request was submitted on ${new Date().toLocaleString()} via the AUI Work-Based Learning partnership form.</small></p>
    `;

    // Send email
    const emailResponse = await resend.emails.send({
      from: "AUI Work-Based Learning <onboarding@resend.dev>",
      to: ["s.elabidi@aui.ma"],
      subject: `New Partnership Request from ${sanitizedData.companyName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Partnership request submitted successfully",
        requestId: dbData.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-partnership-request function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to submit partnership request", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);