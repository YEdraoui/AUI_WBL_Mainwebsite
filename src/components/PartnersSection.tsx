import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "@/hooks/useCompanies";
import { Skeleton } from "@/components/ui/skeleton";
import { Monitor, Banknote, Antenna, Factory, Briefcase } from "lucide-react";
const PartnersSection = () => {
  const navigate = useNavigate();
  const {
    data: companies,
    isLoading,
    error
  } = useCompanies();

  // Use database companies or fallback to empty array
  const partners = companies || [];

  // Double the partners array for seamless infinite scroll
  const extendedPartners = [...partners, ...partners];
  const sectors = ["Technology & IT", "Banking & Finance", "Telecommunications", "Manufacturing", "Consulting", "Healthcare", "Energy & Mining", "Aviation & Logistics"];
  return <section className="relative py-24 bg-muted overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-16 w-20 h-1 bg-primary/20 rotate-45"></div>
        <div className="absolute top-32 left-32 w-16 h-1 bg-primary/15 rotate-45"></div>
        <div className="absolute top-1/2 right-16 w-24 h-1 bg-secondary/20 rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-18 h-1 bg-secondary/15 rotate-45"></div>
        <div className="absolute top-1/4 left-8 w-8 h-8 bg-primary/10 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-1/4 right-8 w-10 h-10 bg-secondary/10 rotate-12 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Trusted by Leading 
            <span className="text-primary"> Companies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our students gain experience at top organizations across diverse industries, 
            building the skills employers value most.
          </p>
        </div>

        {/* Moving Company Carousel */}
        <div className="mb-16 overflow-hidden">
          {isLoading ? <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, index) => <Skeleton key={index} className="flex-shrink-0 mx-4 h-24 min-w-[280px] rounded-xl" />)}
            </div> : error ? <div className="text-center text-muted-foreground py-8">
              Unable to load company data
            </div> : <div className="relative">
              {/* Moving carousel container */}
              <div className="flex animate-[slide_30s_linear_infinite] hover:[animation-play-state:paused]">
                {extendedPartners.map((partner, index) => <div key={`${partner.id}-${index}`} className="flex-shrink-0 mx-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-primary/10 min-w-[280px]">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl flex-shrink-0">
                        {partner.logo_url ? <img src={partner.logo_url} alt={`${partner.name} logo`} className="w-12 h-12 object-contain rounded" /> : <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">
                              {partner.name.charAt(0)}
                            </span>
                          </div>}
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold text-primary/90 mb-1">
                          {partner.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {partner.sector || 'General Business'}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted to-transparent pointer-events-none z-10"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted to-transparent pointer-events-none z-10"></div>
            </div>}
          
          {/* Helper text */}
          <p className="text-center text-sm text-muted-foreground mt-6 opacity-60">
            Hover to pause • Continuously scrolling partner showcase
          </p>
        </div>

        {/* Industry Sectors */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Industries We Serve
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connecting talent with opportunities across diverse sectors.
            </p>
          </div>
          
          {/* Scrollable Industry Grid */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max px-4">
                {[
                  { name: "Technology", icon: Monitor, colors: "bg-gradient-coop" },
                  { name: "Finance", icon: Banknote, colors: "bg-gradient-primary" },
                  { name: "Telecom", icon: Antenna, colors: "bg-gradient-remote" },
                  { name: "Manufacturing", icon: Factory, colors: "bg-gradient-alternance" },
                  { name: "Consulting", icon: Briefcase, colors: "bg-gradient-secondary" }
                ].map((industry, index) => {
                  const IconComponent = industry.icon;
                  
                  return (
                    <div 
                      key={index} 
                      className="group bg-white rounded-xl p-8 shadow-aui hover:shadow-xl border border-primary/10 transition-all duration-300 hover:-translate-y-2 cursor-default text-center min-w-[200px] flex-shrink-0"
                    >
                      <div className={`w-20 h-20 mx-auto mb-6 ${industry.colors} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent size={36} strokeWidth={1.5} />
                      </div>
                      <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                        {industry.name}
                      </h4>
                      <div className="w-8 h-1 bg-primary/20 rounded-full mx-auto mt-3 group-hover:bg-primary transition-colors duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-muted to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-muted to-transparent pointer-events-none z-10"></div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-xl p-12 shadow-aui border border-primary/10">
          <h3 className="text-3xl font-serif font-bold mb-4">
            Ready to Partner with AUI?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our network of leading employers and gain access to Morocco's most talented students. 
            Build your future workforce today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-8 py-4">
              Become a Partner
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default PartnersSection;