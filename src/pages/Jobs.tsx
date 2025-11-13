import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { JobsSection } from "@/components/JobsSection";
const Jobs = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Work-Based Learning Opportunities</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Discover Alternance, co-op positions, and remote opportunities across all AUI Work-Based Learning programs. Find the perfect match for your career goals and academic journey.</p>
          </div>
        </section>

        {/* Jobs Section */}
        <JobsSection showAllPrograms={true} showFilters={true} title="All Available Positions" description="Browse through all current opportunities across Co-op, Remote@AUI, and Alternance programs." />
      </main>
      
      <Footer />
    </div>;
};
export default Jobs;