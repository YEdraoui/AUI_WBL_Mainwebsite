import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine program colors based on current route
  const getProgramColors = () => {
    if (location.pathname.includes('/coop')) {
      return {
        bg: 'bg-coop',
        text: 'text-coop-foreground',
        textMuted: 'text-coop-foreground/80',
        textLight: 'text-coop-foreground/60',
        border: 'border-coop-foreground/20',
        buttonHover: 'hover:bg-coop-light'
      };
    }
    if (location.pathname.includes('/remote')) {
      return {
        bg: 'bg-remote',
        text: 'text-remote-foreground',
        textMuted: 'text-remote-foreground/80',
        textLight: 'text-remote-foreground/60',
        border: 'border-remote-foreground/20',
        buttonHover: 'hover:bg-remote-light'
      };
    }
    if (location.pathname.includes('/alternance')) {
      return {
        bg: 'bg-alternance',
        text: 'text-alternance-foreground',
        textMuted: 'text-alternance-foreground/80',
        textLight: 'text-alternance-foreground/60',
        border: 'border-alternance-foreground/20',
        buttonHover: 'hover:bg-alternance-light'
      };
    }
    // Default to primary green
    return {
      bg: 'bg-primary',
      text: 'text-primary-foreground',
      textMuted: 'text-primary-foreground/80',
      textLight: 'text-primary-foreground/60',
      border: 'border-white/20',
      buttonHover: 'hover:bg-secondary'
    };
  };

  const colors = getProgramColors();
  const quickLinks = [{
    name: "Co-op Program",
    path: "/coop"
  }, {
    name: "Remote@AUI",
    path: "/remote"
  }, {
    name: "Alternance",
    path: "/alternance"
  }];
  const resources = [{
    name: "For Employers",
    path: "/employers"
  }, {
    name: "Application Guide",
    path: "/resources"
  }, {
    name: "News & Events",
    path: "/news-events"
  }, {
    name: "Program Comparison",
    path: "/compare"
  }];
  return <footer className={`${colors.bg} ${colors.text}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/76cdff03-32a8-46bd-bcb2-8963e211f871.png" alt="Al Akhawayn University" className="h-16 w-auto" />
            </div>
            <div className="text-lg font-serif font-semibold">Work-Based Learning</div>
            <p className={`${colors.textMuted} leading-relaxed text-sm`}>
              Connecting academic excellence with real-world professional experience 
              through innovative work-based learning programs.
            </p>
            <div className="flex space-x-3">
              <div 
                onClick={() => window.open("https://www.linkedin.com/showcase/employability-entrepreneurship-office-al-akhawayn-university/posts/?feedView=all", "_blank")}
                className={`h-9 w-9 bg-white/10 rounded-md flex items-center justify-center ${colors.buttonHover} transition-fast cursor-pointer`}
              >
                <Linkedin className="h-4 w-4" />
              </div>
              <div 
                onClick={() => window.open("https://www.instagram.com/aui.eeo/", "_blank")}
                className={`h-9 w-9 bg-white/10 rounded-md flex items-center justify-center ${colors.buttonHover} transition-fast cursor-pointer`}
              >
                <Instagram className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>Programs</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.name}>
                  <button onClick={() => navigate(link.path)} className={`${colors.textMuted} hover:${colors.text} transition-fast font-medium text-sm`}>
                    {link.name}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>Resources</h3>
            <ul className="space-y-2">
              {resources.map(resource => <li key={resource.name}>
                  <button onClick={() => navigate(resource.path)} className={`${colors.textMuted} hover:${colors.text} transition-fast font-medium text-sm`}>
                    {resource.name}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                <span className={`${colors.textMuted} text-sm`}>
                  Al Akhawayn University<br />
                  Ifrane, Morocco
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                <span className={`${colors.textMuted} text-sm`}>
                  wbl@aui.ma
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                <span className={`${colors.textMuted} text-sm`}>+212 694805652</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        

        {/* Bottom Bar */}
        <div className={`border-t ${colors.border} pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <div className={`${colors.textLight} text-sm mb-3 md:mb-0`}>
            © 2025 Al Akhawayn University. All rights reserved.
          </div>
          <div className="flex space-x-4 text-sm">
            <button className={`${colors.textLight} hover:${colors.text} transition-fast`}>
              Privacy Policy
            </button>
            <button className={`${colors.textLight} hover:${colors.text} transition-fast`}>
              Terms of Service
            </button>
            <button className={`${colors.textLight} hover:${colors.text} transition-fast`}>
              Accessibility
            </button>
          </div>
        </div>
      </div>
            <div style="text-align: center; margin-top: 10px;"><a href="#" onClick={(e) => { e.preventDefault(); alert(\"Hanene is the best! \"); }} style="font-size: 10px; opacity: 0.5; color: inherit; text-decoration: none; cursor: pointer;"></a></div>`n      </footer>;
};
export default Footer;
