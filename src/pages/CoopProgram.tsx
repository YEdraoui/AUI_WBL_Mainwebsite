import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventCalendar from "@/components/EventCalendar";
import EnhancedTimeline from "@/components/EnhancedTimeline";
import SuccessStoriesCarousel from "@/components/SuccessStoriesCarousel";
import StudentVideoStories from "@/components/StudentVideoStories";
import { JobsSection } from "@/components/JobsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, DollarSign, Users, CheckCircle, Award, FileText, RefreshCw } from "lucide-react";
const CoopProgram = () => {
  const navigate = useNavigate();
  const keyFeatures = [{
    icon: Calendar,
    title: "3-Week Winter Placements",
    description: "Intensive professional experience during winter break"
  }, {
    icon: Clock,
    title: "3-Month Summer Placements",
    description: "Extended engagement for deeper skill development"
  }, {
    icon: Award,
    title: "Repeatable Experience",
    description: "Participate multiple times over 2-3 years"
  }, {
    icon: Users,
    title: "American-Style Track",
    description: "Experiential learning following best practices"
  }];
  const benefits = ["Real-world professional experience", "Network building with industry professionals", "Enhanced employability upon graduation", "Mentorship from experienced professionals", "Salary compensation (MAD 1,000-3,000 net)"];
  const enhancedTimeline = [{
    id: "app1",
    phase: "Application",
    time: "September - October",
    description: "Submit application for winter placement",
    icon: FileText,
    color: "coop",
    type: "cycle1" as const
  }, {
    id: "match1",
    phase: "Matching",
    time: "November",
    description: "Company matching and interviews",
    icon: Users,
    color: "coop",
    type: "cycle1" as const
  }, {
    id: "winter",
    phase: "Winter Placement",
    time: "January",
    description: "3-week intensive experience",
    icon: Calendar,
    color: "coop",
    type: "cycle1" as const
  }, {
    id: "app2",
    phase: "Application",
    time: "February - March",
    description: "Second cycle for summer-only students",
    icon: RefreshCw,
    color: "blue",
    type: "cycle2" as const
  }, {
    id: "match2",
    phase: "Matching",
    time: "April",
    description: "Summer placement matching",
    icon: Users,
    color: "blue",
    type: "cycle2" as const
  }, {
    id: "summer",
    phase: "Summer Placement",
    time: "June - August",
    description: "3-month extended placement for both cycles",
    icon: Award,
    color: "purple",
    type: "shared" as const
  }, {
    id: "eval",
    phase: "Evaluation",
    time: "September",
    description: "Performance review and academic integration",
    icon: CheckCircle,
    color: "orange",
    type: "repeat" as const
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-coop text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Co-op Program
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Experience-Driven Learning Through Industry Partnerships
            </p>
            <p className="text-lg mb-8 text-white/80 leading-relaxed">
              Gain hands-on professional experience through structured 3-week winter and 3-month summer placements. 
              Our Co-op program follows the American experiential learning model, connecting classroom knowledge with real-world application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")} className="text-lg px-8 py-4 bg-white text-coop hover:bg-white/90">
                Apply Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-coop">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">Program Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Designed to provide comprehensive professional experience while maintaining academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => <Card key={index} className="text-center hover:shadow-aui transition-smooth border border-coop/10">
              <CardHeader>
                  <div className="mx-auto mb-4 h-16 w-16 bg-coop/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-coop" />
                </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">Program Timeline</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Two application cycles ensure multiple opportunities throughout the year
            </p>
          </div>
          <EnhancedTimeline items={enhancedTimeline} />
        </div>
      </section>

      {/* Compensation & Benefits */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Compensation & Benefits
              </h2>
              <div className="bg-card rounded-2xl p-8 mb-8 shadow-elegant border border-border/50">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-coop">MAD 1,000 - 3,000 (net)</span>
                </div>
                <p className="text-muted-foreground text-lg">
                  Competitive compensation based on placement type, company size, and student experience level.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border/50 hover:shadow-glow transition-smooth">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Program Benefits</h3>
                </div>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="h-6 w-6 bg-success/10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-success/20 transition-smooth">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <span className="text-foreground font-medium leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border/50 hover:shadow-glow transition-smooth">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Additional Perks</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <div className="h-6 w-6 bg-success/10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-success/20 transition-smooth">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">Professional development workshops</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="h-6 w-6 bg-success/10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-success/20 transition-smooth">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">Career counseling sessions</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="h-6 w-6 bg-success/10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-success/20 transition-smooth">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">Alumni network access</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="h-6 w-6 bg-success/10 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-success/20 transition-smooth">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">Industry event invitations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <JobsSection 
        program="Co-op"
        title="Available Co-op Positions"
        description="Explore current Co-op opportunities for winter and summer placements."
        className="bg-muted"
      />

      {/* Success Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students who transformed their careers through our Co-op program
            </p>
          </div>

          <SuccessStoriesCarousel program="Co-op" />
        </div>
      </section>

      {/* Student Video Stories */}
      <StudentVideoStories />

      {/* Events Calendar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Co-op Program <span className="text-blue-500">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with Co-op program events, application deadlines, and opportunities.
            </p>
          </div>
          <EventCalendar program="Co-op" title="Co-op Program Events" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coop text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Start Your Professional Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the Co-op program and gain the experience that will set you apart in today's competitive job market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")} className="text-lg px-8 py-4 bg-white text-coop hover:bg-white/90">
              Apply for Co-op Program
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-coop">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default CoopProgram;