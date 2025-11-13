import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Building2, TrendingUp } from "lucide-react";
import StackedImages from "@/components/StackedImages";
const HeroSection = () => {
  const navigate = useNavigate();
  return <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 lg:py-24 overflow-hidden">
      {/* Enhanced Curved Geometric Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Multiple Circle Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-16 left-16 w-24 h-24 border-2 border-white/30 rounded-full"></div>
          <div className="absolute top-32 right-32 w-16 h-16 border-2 border-white/35 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 border-2 border-white/30 rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 border-2 border-white/25 rounded-full"></div>
          <div className="absolute top-20 left-1/2 w-12 h-12 border-2 border-white/40 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-18 h-18 border-2 border-white/35 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-14 h-14 border-2 border-white/30 rounded-full"></div>
        </div>
        
        {/* Flowing Wave Elements */}
        <div className="absolute top-1/4 left-8 w-3 h-32 bg-white/20 rounded-full transform rotate-12"></div>
        <div className="absolute top-1/3 right-12 w-2 h-24 bg-white/25 rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-1/3 left-12 w-2.5 h-28 bg-white/22 rounded-full transform rotate-24"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-20 bg-white/18 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-26 bg-white/20 rounded-full transform -rotate-30"></div>
        
        {/* Abstract Geometric Accents */}
        <div className="absolute top-1/2 right-1/4 w-8 h-16 bg-white/15 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white/12 rounded-lg transform rotate-30"></div>
        <div className="absolute top-1/5 right-1/5 w-6 h-12 bg-white/18 rounded-full transform rotate-60"></div>
        <div className="absolute bottom-1/5 right-1/4 w-12 h-6 bg-white/15 rounded-full transform rotate-15"></div>
        
        {/* Additional Scattered Elements */}
        <div className="absolute top-40 left-1/4 w-4 h-4 bg-white/25 rounded-full"></div>
        <div className="absolute top-60 right-1/3 w-6 h-6 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/5 w-5 h-5 bg-white/22 rounded-full"></div>
        <div className="absolute bottom-60 right-1/5 w-7 h-7 bg-white/18 rounded-full"></div>
        <div className="absolute top-1/3 left-20 w-3 h-8 bg-white/20 rounded-full transform rotate-75"></div>
        <div className="absolute bottom-1/3 right-24 w-4 h-10 bg-white/17 rounded-full transform -rotate-45"></div>
      </div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-[1.1] text-white">
                Combine Academic Excellence with <span className="bg-gradient-to-r from-secondary-light to-secondary bg-clip-text text-amber-300">Career Success</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">Al Akhawayn University's Work-Based Learning programs connect Students with real-world professional experience through Co-op, Remote@AUI, and Alternance programs.</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button variant="default" size="lg" onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")} className="text-lg px-10 py-6 bg-white text-primary font-semibold border-2 border-white hover:bg-primary-light hover:text-white hover:border-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Apply for Programs
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-10 py-6 bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  Hire AUI Students
                </Button>
              </div>
            </div>

            {/* Image Stack */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm h-96 w-full max-w-md">
                <StackedImages images={[{
                src: "/lovable-uploads/306aedfa-dcef-4ec2-8d89-01d3125cebe7.png",
                alt: "AUI students collaborating in library workspace"
              }, {
                src: "/lovable-uploads/a169f132-2f67-4e82-84e8-44367cae89a9.png",
                alt: "AUI students working together on computers"
              }, {
                src: "/lovable-uploads/c808dfa2-3d28-4c15-9e91-bfd242033b45.png",
                alt: "AUI students collaborating outdoors on projects"
              }]} className="h-full" />
              </div>
            </div>
          </div>

          {/* Key Stats - Reduced Size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-serif">100+</div>
              <div className="text-muted-foreground font-medium">Students Placed</div>
            </div>
            
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 font-serif">30+</div>
              <div className="text-muted-foreground font-medium">Partner Companies</div>
            </div>
            
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-serif">88%</div>
              <div className="text-muted-foreground font-medium">Employment Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        
      </div>
    </section>;
};
export default HeroSection;