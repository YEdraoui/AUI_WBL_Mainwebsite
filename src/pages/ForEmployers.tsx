import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StackedImages from "@/components/StackedImages";
import CalendlyWidget from "@/components/CalendlyWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Target, Award, Handshake, MessageSquare, UserCheck, Calendar, CheckCircle, Building2, Clock, MapPin, DollarSign, GraduationCap, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Hero Section Component
const EmployerHero = () => {
  return <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Hire AUI Students.<br />
              <span className="text-amber-200">Build Your Talent Pipeline.</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Flexible tracks to match your needs—Alternance, Co-op, and Remote@AUI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => {
                const element = document.getElementById('partnership-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }} className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                Submit Partnership
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Request a Call
              </Button>
            </div>
          </div>
          
          {/* Right Image Stack */}
          <div className="relative">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm h-96">
              <StackedImages
                images={[
                  {
                    src: "/lovable-uploads/306aedfa-dcef-4ec2-8d89-01d3125cebe7.png",
                    alt: "AUI students collaborating in library workspace"
                  },
                  {
                    src: "/lovable-uploads/a169f132-2f67-4e82-84e8-44367cae89a9.png", 
                    alt: "AUI students working together on computers"
                  },
                  {
                    src: "/lovable-uploads/c808dfa2-3d28-4c15-9e91-bfd242033b45.png",
                    alt: "AUI students collaborating outdoors on projects"
                  }
                ]}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
};

// Benefits Cards Component
const BenefitsSection = () => {
  const benefits = [{
    icon: <UserCheck className="h-8 w-8" />,
    title: "Pre-vetted, Adaptable Talent",
    description: "Access screened students with strong academic performance and diverse skill sets across engineering, business, and Humanities."
  }, {
    icon: <Target className="h-8 w-8" />,
    title: "Low-Risk, High-Value Engagements",
    description: "Test potential hires through structured programs with clear objectives and measurable outcomes."
  }, {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Better Than Typical Internship & PFE",
    description: "Structured programs with clear objectives, academic support, and real business impact—not just observational roles."
  }, {
    icon: <Award className="h-8 w-8" />,
    title: "Early Access to Future Hires",
    description: "Build relationships with top talent before graduation and secure your recruitment pipeline."
  }];
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Why Partner with AUI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with Morocco's brightest students through proven work-based learning programs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => <Card key={index} className="text-center p-6 hover:shadow-aui transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};

// Track Comparison Component
const TrackComparison = () => {
  const tracks = [{
    name: "Co-op",
    badge: "Flexible",
    commitment: "3 weeks (winter) / 3 months (summer)",
    duration: "Repeats and rotates over 2-3 years",
    stipend: "MAD 1,000–3,000 (net)",
    bestFor: "Pipeline building",
    supervision: "Direct company oversight",
    examples: "Internships, Special projects, Skills assessment",
    colors: {
      primary: "text-coop",
      border: "border-coop",
      bg: "bg-coop",
      icon: "text-coop"
    }
  }, {
    name: "Remote@AUI",
    badge: "Project-based",
    commitment: "Deliverable-focused",
    duration: "Flexible timeline",
    stipend: "~MAD 300 per deliverable (net)",
    bestFor: "Specific tasks & consulting",
    supervision: "Faculty coordination",
    examples: "Research, Digital marketing, Data analysis",
    colors: {
      primary: "text-remote",
      border: "border-remote",
      bg: "bg-remote",
      icon: "text-remote"
    }
  }, {
    name: "Alternance",
    badge: "Long-term",
    commitment: "4 days/week during semester",
    duration: "Semester-long engagement",
    stipend: "MAD 1,000–4,000 (net)",
    bestFor: "Full-time role preparation",
    supervision: "Faculty + Company mentorship",
    examples: "Project management, Business analysis, Software development",
    colors: {
      primary: "text-alternance",
      border: "border-alternance",
      bg: "bg-alternance",
      icon: "text-alternance"
    }
  }];
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Compare Hiring Tracks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the engagement model that best fits your hiring needs and timeline.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => <Card key={index} className={`relative overflow-hidden hover:shadow-aui transition-all duration-300 h-full ${track.colors.border}`}>
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-2xl font-serif font-bold ${track.colors.primary}`}>
                    {track.name}
                  </h3>
                  <Badge className={`${track.colors.bg} text-white`}>
                    {track.badge}
                  </Badge>
                </div>
                
                <div className="space-y-4 mb-6 flex-grow">
                  <div className="flex items-start gap-3">
                    <Clock className={`h-5 w-5 ${track.colors.icon} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground">{track.commitment}</p>
                      <p className="text-sm text-muted-foreground">{track.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <DollarSign className={`h-5 w-5 ${track.colors.icon} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground">Typical Stipend</p>
                      <p className="text-sm text-muted-foreground">{track.stipend}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className={`h-5 w-5 ${track.colors.icon} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground">Best For</p>
                      <p className="text-sm text-muted-foreground">{track.bestFor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className={`h-5 w-5 ${track.colors.icon} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground">Supervision</p>
                      <p className="text-sm text-muted-foreground">{track.supervision}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Briefcase className={`h-5 w-5 ${track.colors.icon} mt-0.5`} />
                    <div>
                      <p className="font-medium text-foreground">Example Tasks</p>
                      <p className="text-sm text-muted-foreground">{track.examples}</p>
                    </div>
                  </div>
                </div>
                
                <Button className={`w-full text-white hover:opacity-90 ${track.colors.bg}`} onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")}>
                  Contact Us
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};

// How It Works Component
const HowItWorks = () => {
  const steps = [{
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Share Your Needs",
    description: "Tell us about your role requirements, project scope, and timeline preferences."
  }, {
    icon: <UserCheck className="h-8 w-8" />,
    title: "We Match Students",
    description: "Our team screens candidates and provides you with a curated shortlist of qualified students."
  }, {
    icon: <Calendar className="h-8 w-8" />,
    title: "Interview & Select",
    description: "Conduct interviews with our coordination support and select your preferred candidates."
  }, {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Onboard & Review",
    description: "Start the engagement with our onboarding support and ongoing supervision framework."
  }];
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, structured process to connect you with top AUI talent.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};

// Success Metrics Component
const SuccessMetrics = () => {
  const metrics = [{
    number: "100+",
    label: "Students Placed",
    color: "text-primary"
  }, {
    number: "30+",
    label: "Partner Companies",
    color: "text-secondary"
  }, {
    number: "88%",
    label: "Employment Rate",
    color: "text-primary"
  }];
  const testimonials = [{
    quote: "AUI students brought fresh perspectives and strong technical skills to our team. The faculty support made the collaboration seamless.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Morocco"
  }, {
    quote: "Through the Alternance program, we identified and hired three exceptional graduates. It's become our primary recruitment channel.",
    author: "Ahmed Bennani",
    role: "Operations Manager",
    company: "InnovateHub"
  }];
  return <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => <Card key={index} className="text-center p-8 hover:shadow-aui transition-all duration-300">
              <CardContent className="pt-6">
                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${metric.color}`}>
                  {metric.number}
                </div>
                <div className="text-muted-foreground font-medium text-lg">
                  {metric.label}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            What Our Partners Say
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="p-6 hover:shadow-aui transition-all duration-300">
              <CardContent className="pt-6">
                <blockquote className="text-lg text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};

// Partnership Support Component
const PartnershipSupport = () => {
  const supportItems = ["Pre-screening and candidate matching", "Interview coordination and scheduling", "Contract templates and legal guidance", "Faculty mentoring and project oversight", "Regular progress reporting and feedback", "Remote, hybrid, or on-site work arrangements", "IP protection and confidentiality frameworks", "Performance evaluation and certification"];
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
              Comprehensive Partnership Support
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We provide end-to-end support to ensure successful collaborations and maximum value for your organization.
            </p>
            
            <div className="grid gap-4">
              {supportItems.map((item, index) => <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>)}
            </div>
          </div>
          
          <Card className="p-8">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Handshake className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Ready to Partner?
                </h3>
                <p className="text-muted-foreground">
                  Join 30+ companies already working with AUI students.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={() => {
                  const element = document.getElementById('partnership-form');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Submit Partnership
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};

// CTA Form Component
const CTAForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    roleProjectType: '',
    timeline: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await supabase.functions.invoke('submit-partnership-request', {
        body: formData
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to submit request');
      }

      setSubmitSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        roleProjectType: '',
        timeline: '',
        additionalNotes: ''
      });
    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitError(error.message || 'Failed to submit partnership request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-green-600 rounded-2xl p-12 mb-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Request Submitted Successfully!
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Thank you for your interest in partnering with AUI. We've received your request and will contact you within 24-48 hours.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setSubmitSuccess(false)}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </section>;
  }

  return <section id="partnership-form" className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Let's Build Your Talent Pipeline
            </h2>
            <p className="text-xl text-white/90">
              Submit your requirements and we'll connect you with qualified AUI students.
            </p>
          </div>
          
          <Card className="p-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input 
                    id="contactPerson" 
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@company.com" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+212 6XX XXX XXX" 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="roleProjectType">Role/Project Type *</Label>
                  <Input 
                    id="roleProjectType" 
                    value={formData.roleProjectType}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Developer, Marketing Intern" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input 
                    id="timeline" 
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="e.g., Starting February 2024" 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea 
                    id="additionalNotes" 
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your requirements, preferred track, or any specific needs..." 
                    className="min-h-[120px]" 
                    disabled={isSubmitting}
                  />
                </div>
                
                {submitError && (
                  <div className="md:col-span-2">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {submitError}
                    </div>
                  </div>
                )}
                
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-light text-white disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")}
                    disabled={isSubmitting}
                  >
                    Schedule a Call Instead
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [{
    question: "What are the typical timelines for each program?",
    answer: "Alternance runs during academic semesters (Sept-Jan, Feb-June). Co-op offers winter sessions (3 weeks in January) and summer sessions (3 months, June-August). Remote@AUI projects have flexible timelines based on deliverable complexity, typically 2-8 weeks."
  }, {
    question: "What's expected of us?",
    answer: "We handle the heavy lifting! Our team assists with the entire selection process by pre-screening candidates and matching them to your requirements. We manage all program paperwork including contracts, agreements, and compliance documentation. Throughout the engagement, we provide ongoing faculty support for student supervision and deliverable review to ensure project success."
  }, {
    question: "What about intellectual property and confidentiality?",
    answer: "We provide standard IP and confidentiality agreement templates. Students sign NDAs as required. For sensitive projects, we can facilitate additional legal frameworks. All work products follow agreed ownership terms."
  }, {
    question: "How do you evaluate student performance?",
    answer: "We use structured evaluation forms completed by both employer and student. Performance metrics include technical competency, professionalism, communication, and project outcomes. Final grades require employer input."
  }, {
    question: "Can students work remotely?",
    answer: "Absolutely! Remote@AUI allows students to work fully remotely for your company. Co-Ops and Alternance are intended to give students hands-on experience within a company on-site, in-person."
  }, {
    question: "What if a student doesn't meet expectations?",
    answer: "We provide early intervention through regular check-ins. If issues arise, we facilitate discussions between all parties and can arrange alternative placements if needed. Our goal is successful outcomes for everyone."
  }, {
    question: "Are there costs beyond student compensation?",
    answer: "No additional fees to employers. You only pay agreed student stipends/compensation. AUI handles all administrative coordination, supervision, and evaluation processes at no cost to partners."
  }, {
    question: "How far in advance should we plan?",
    answer: "For Alternance and Co-op, 6-8 weeks advance notice ensures best candidate matching. Remote@AUI projects can often start within 2-3 weeks. Earlier planning allows for better student selection and preparation."
  }];
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about partnering with AUI.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                    <h3 className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />}
                  </button>
                  
                  {openIndex === index && <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>}
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};

// Main For Employers Page Component
const ForEmployers = () => {
  return <div className="min-h-screen">
      <Navigation />
      <main>
        <EmployerHero />
        <BenefitsSection />
        <TrackComparison />
        <HowItWorks />
        <SuccessMetrics />
        <PartnershipSupport />
        
        {/* Calendly Widget Section */}
        <section className="relative py-24 bg-background overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-32 h-1 bg-primary/15 rotate-45"></div>
            <div className="absolute top-40 right-40 w-24 h-1 bg-primary/10 rotate-45"></div>
            <div className="absolute bottom-32 left-20 w-28 h-1 bg-secondary/15 rotate-45"></div>
            <div className="absolute bottom-16 left-40 w-20 h-1 bg-secondary/10 rotate-45"></div>
            <div className="absolute top-1/3 left-12 w-12 h-12 bg-primary/8 rotate-45 rounded-lg"></div>
            <div className="absolute bottom-1/3 right-12 w-10 h-10 bg-secondary/8 rotate-12 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Schedule a <span className="text-primary">Consultation</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to partner with AUI? Schedule a meeting to discuss your hiring needs and explore our programs.
              </p>
            </div>
            
            {/* Calendly Widget */}
            <div className="mt-16">
              <CalendlyWidget className="rounded-lg overflow-hidden shadow-lg" />
              <p className="text-center text-sm text-muted-foreground mt-3">
                If the scheduler doesn't load, open it here: <a className="underline text-primary" href="https://calendly.com/i-taurel-aui/wbl-programs-info-session?primary_color=1c9551" target="_blank" rel="noopener noreferrer">Calendly link</a>
              </p>
            </div>
          </div>
        </section>
        
        <CTAForm />
        <FAQ />
      </main>
      <Footer />
    </div>;
};
export default ForEmployers;