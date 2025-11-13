import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import StackedImages from "@/components/StackedImages";
import { useWhoWeAreImages } from "@/hooks/useWhoWeAreImages";

const WhoWeAreSection = () => {
  const navigate = useNavigate();
  const { data: images, isLoading } = useWhoWeAreImages();

  // Convert database images to StackedImages format
  const stackedImages = images?.map(img => ({
    src: img.image_url,
    alt: img.alt_text
  })) || [];

  return (
    <section className="relative py-20 bg-gradient-to-br from-background to-secondary/5 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-1 bg-primary/10 rotate-45"></div>
        <div className="absolute top-40 left-20 w-24 h-1 bg-secondary/10 -rotate-45"></div>
        <div className="absolute bottom-32 right-40 w-28 h-1 bg-primary/8 rotate-12"></div>
        <div className="absolute top-1/4 left-12 w-8 h-8 bg-primary/5 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-1/4 right-12 w-6 h-6 bg-secondary/8 rotate-12 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Who We Are
              </h2>
              <h3 className="text-xl md:text-2xl font-medium text-primary mb-6">
                Work-Based Learning at AUI, under the Office of Employability & Entrepreneurship (E+E)
              </h3>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Work-Based Learning (WBL) at AUI bridges academic study with real-world professional experience. 
              Operating under the Office of Employability & Entrepreneurship (E+E), WBL programs prepare students 
              for career success while helping employers access motivated, job-ready talent.
            </p>

            {/* Mission Statement */}
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-lg font-medium text-foreground italic">
                "Through our WBL programs, we empower students to gain valuable experience, employers to build 
                strong talent pipelines, and AUI to create lasting impact in employability and innovation."
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                onClick={() => navigate("/employers")} 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-colors px-8 py-3 text-lg"
              >
                Explore WBL Programs
              </Button>
            </div>
          </div>

          {/* Right Column - Image Stack */}
          <div className="relative">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm h-96 w-full">
              {!isLoading && stackedImages.length > 0 ? (
                <StackedImages images={stackedImages} className="h-full" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                      <Users size={64} className="text-primary" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-primary">
                      Students & Employers
                    </h4>
                    <p className="text-muted-foreground">
                      Connecting talent with opportunity through work-based learning
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Decorative elements around the image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;