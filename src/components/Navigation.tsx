import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const programItems = [
    {
      name: "Co-op Program",
      path: "/coop"
    },
    {
      name: "Remote@AUI", 
      path: "/remote"
    },
    {
      name: "Alternance",
      path: "/alternance"
    }
  ];
  
  const navItems = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "For Employers", 
      path: "/employers"
    }
  ];
  return <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm border-b border-border/20 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 py-2">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/lovable-uploads/3088454a-afd1-4300-ae80-44d26eedd86c.png" alt="Al Akhawayn University" className="h-14 w-auto" />
            
            {/* Separator Line */}
            <div className="w-0.5 h-8 bg-border/40"></div>
            
            <div className="text-lg font-serif font-semibold text-primary">
              Work-Based Learning
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate("/")} 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 ${
                location.pathname === "/" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              Home
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`flex items-center text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 ${
                  ["/coop", "/remote", "/alternance"].includes(location.pathname) ? "border-primary text-primary" : "border-transparent"
                }`}
              >
                Programs
                <ChevronDown size={16} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                {programItems.map(item => (
                  <DropdownMenuItem 
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              onClick={() => navigate("/employers")} 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 ${
                location.pathname === "/employers" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              For Employers
            </button>
            
            <button 
              onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")} 
              className="text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 border-transparent"
            >
              Open Positions
            </button>
            
            <button 
              onClick={() => navigate("/resources")} 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 ${
                location.pathname === "/resources" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              Resources
            </button>
            
            <button 
              onClick={() => navigate("/news-events")} 
              className={`text-foreground hover:text-primary transition-colors font-medium pb-1 border-b-2 ${
                location.pathname === "/news-events" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              News & Events
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors px-6"
            >
              Partner with Us
            </Button>
            <Button 
              onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")} 
              className="bg-primary text-white hover:bg-primary/90 transition-colors px-6"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-3">
              <button onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Home
              </button>
              
              <div className="text-left text-muted-foreground font-medium py-1 text-sm">
                Programs
              </div>
              {programItems.map(item => (
                <button key={item.name} onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-1 pl-4">
                  {item.name}
                </button>
              ))}
              
              <button onClick={() => {
                navigate("/employers");
                setIsMenuOpen(false);
              }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                For Employers
              </button>
              
              <button onClick={() => {
                window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank");
                setIsMenuOpen(false);
              }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Open Positions
              </button>
              
              <button onClick={() => {
                navigate("/resources");
                setIsMenuOpen(false);
              }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                Resources
              </button>
              
              <button onClick={() => {
                navigate("/news-events");
                setIsMenuOpen(false);
              }} className="text-left text-foreground hover:text-primary transition-colors font-medium py-2">
                News & Events
              </button>
              
              <div className="pt-3 space-y-2">
                <Button 
                  onClick={() => {
                    window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank");
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Partner with Us
                </Button>
                <Button onClick={() => {
                  window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank");
                  setIsMenuOpen(false);
                }} className="w-full bg-primary text-white hover:bg-primary/90">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;