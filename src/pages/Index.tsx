import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ProgramCards from "@/components/ProgramCards";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import EventCalendar from "@/components/EventCalendar";
import CalendlyWidget from "@/components/CalendlyWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <ProgramCards />
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
                Upcoming <span className="text-primary">Events</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stay updated with all program events, deadlines, and opportunities across our career development programs.
              </p>
            </div>
            <EventCalendar 
              title="All Program Events" 
              showAllPrograms={true}
            />
            
            {/* Calendly Widget */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Schedule a <span className="text-primary">Meeting</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ready to discuss opportunities or have questions? Schedule a meeting with us.
                </p>
              </div>
              <CalendlyWidget className="rounded-lg overflow-hidden shadow-lg" />
              <p className="text-center text-sm text-muted-foreground mt-3">
                If the scheduler doesn't load, open it here: <a className="underline text-primary" href="https://calendly.com/i-taurel-aui/wbl-programs-info-session?primary_color=1c9551" target="_blank" rel="noopener noreferrer">Calendly link</a>
              </p>
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
