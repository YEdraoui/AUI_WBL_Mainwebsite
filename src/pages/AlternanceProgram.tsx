import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventCalendar from "@/components/EventCalendar";
import SuccessStoriesCarousel from "@/components/SuccessStoriesCarousel";
import StudentVideoStories from "@/components/StudentVideoStories";
import { JobsSection } from "@/components/JobsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Building2, DollarSign, CheckCircle, BookOpen, Network, Brain, FolderOpen, ArrowRight } from "lucide-react";

const AlternanceProgram = () => {
  const navigate = useNavigate();

  const keyFeatures = [
    {
      icon: Calendar,
      title: "4 Days in Company",
      description: "Monday through Thursday in professional environment"
    },
    {
      icon: BookOpen,
      title: "Fridays & Weekends Classes",
      description: "Maintain academic progress with condensed schedule"
    },
    {
      icon: Clock,
      title: "Semester-Long Commitment",
      description: "Extended engagement for deep professional integration"
    },
    {
      icon: Building2,
      title: "Professional Immersion",
      description: "Full integration into company teams and culture"
    }
  ];

  const benefits = [
    "Deep professional integration",
    "Long-term mentorship relationships",
    "Academic credit for professional experience",
    "Enhanced career prospects",
    "Industry network development",
    "Competitive compensation (MAD 1,000-4,000)"
  ];

  const weeklySchedule = [
    { day: "Monday", activity: "Company Work", time: "9:00 AM - 5:00 PM", type: "professional" },
    { day: "Tuesday", activity: "Company Work", time: "9:00 AM - 5:00 PM", type: "professional" },
    { day: "Wednesday", activity: "Company Work", time: "9:00 AM - 5:00 PM", type: "professional" },
    { day: "Thursday", activity: "Company Work", time: "9:00 AM - 5:00 PM", type: "professional" },
    { day: "Friday", activity: "Academic Classes", time: "8:00 AM - 5:00 PM", type: "academic" },
    { day: "Saturday", activity: "Academic Classes", time: "8:00 AM - 2:00 PM", type: "academic" },
    { day: "Sunday", activity: "Study/Rest", time: "Flexible", type: "personal" }
  ];

  const requirements = [
    "Minimum 3.0 GPA for eligibility",
    "Completed at least 60 credit hours",
    "Junior or Senior standing",
    "Company partnership agreement",
    "Faculty advisor approval",
    "Commitment to full semester"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-alternance text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Alternance Program
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional Immersion with Academic Continuity
            </p>
            <p className="text-lg mb-8 text-white/80 leading-relaxed">
              Experience true professional immersion by spending 4 days per week in a company while 
              continuing your academic studies. This intensive program prepares you for seamless transition to full-time employment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg" 
                onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")}
                className="text-lg px-8 py-4 bg-white text-alternance hover:bg-white/90"
              >
                Apply Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")}
                className="text-lg px-8 py-4 border-white text-white hover-bg-white hover:text-alternance"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Program Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining intensive professional experience with academic excellence for comprehensive career preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-smooth">
                <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 bg-alternance/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-alternance" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Weekly Schedule</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Balanced structure combining professional work with academic requirements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {weeklySchedule.map((item, index) => (
                <Card 
                  key={index} 
                  className={`${
                    item.type === 'professional' ? 'bg-alternance/5 border-alternance/20' :
                    item.type === 'academic' ? 'bg-remote/5 border-remote/20' :
                    'bg-muted/50 border-muted-foreground/20'
                  } hover:shadow-md transition-smooth`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white ${
                          item.type === 'professional' ? 'bg-alternance' :
                          item.type === 'academic' ? 'bg-remote' :
                          'bg-muted-foreground'
                        }`}>
                          {item.day.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{item.day}</div>
                          <div className="text-muted-foreground">{item.activity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.time}</div>
                        <div className={`text-sm capitalize ${
                          item.type === 'professional' ? 'text-alternance' :
                          item.type === 'academic' ? 'text-remote' :
                          'text-muted-foreground'
                        }`}>
                          {item.type}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compensation & Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Compensation & Benefits
              </h2>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-secondary mr-4" />
                  <span className="text-2xl font-bold text-alternance">MAD 1,000 - 4,000 (net)</span>
                </div>
                <p className="text-muted-foreground">
                  Higher compensation range reflecting the increased commitment and professional responsibility.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Program Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-alternance mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Program Requirements</h3>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-alternance mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>

                <div className="mt-8 p-4 bg-alternance/10 rounded-lg">
                  <h4 className="font-semibold text-alternance mb-2">Application Timeline</h4>
                <p className="text-sm text-muted-foreground">
                  Applications open in March for Fall semester and October for Spring semester. 
                  Early application recommended due to limited company partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <JobsSection 
        program="Alternance" 
        title="Available Alternance Positions"
        description="Discover current Alternance opportunities that combine intensive professional work with academic study."
        className="bg-background"
      />

      {/* Success Stories */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Alternance Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Students who transformed their career prospects through intensive professional experience
            </p>
          </div>

          <SuccessStoriesCarousel program="Alternance" />
        </div>
      </section>

      {/* Student Video Stories */}
      <StudentVideoStories />

      {/* Riipen Industry Projects Section */}
      <section className="py-24 bg-muted border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-3 bg-alternance/10 text-alternance px-6 py-3 rounded-full text-sm font-medium mb-4">
                  <span className="text-base font-semibold">Projects Powered by</span>
                  <img src="/lovable-uploads/51e0e646-866d-4f11-87f7-0d9ae9c5b5be.png" alt="Riipen" className="h-8 w-auto" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Gain Real Experience. Build Real Connections.
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Through Riipen, AUI students can take part in real projects with companies worldwide. 
                These extracurricular experiences let you practice professional skills, expand your network, 
                and showcase results to employers.
              </p>

              {/* 4-step strip */}
              <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
                <span className="bg-alternance/10 text-alternance px-3 py-1 rounded-full font-medium">Join</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-alternance/10 text-alternance px-3 py-1 rounded-full font-medium">Collaborate</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-alternance/10 text-alternance px-3 py-1 rounded-full font-medium">Deliver</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-alternance/10 text-alternance px-3 py-1 rounded-full font-medium">Get Feedback</span>
              </div>
            </div>

            {/* Visual Content - Cards */}
            <div className="space-y-6">
              <Card className="bg-card hover:shadow-lg transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-alternance/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Network className="h-6 w-6 text-alternance" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Real Projects</h3>
                      <p className="text-muted-foreground">Work directly with companies on live challenges.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card hover:shadow-lg transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-alternance/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-alternance" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Career Skills</h3>
                      <p className="text-muted-foreground">Build teamwork, problem-solving, and communication.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card hover:shadow-lg transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-alternance/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="h-6 w-6 text-alternance" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Professional Portfolio</h3>
                      <p className="text-muted-foreground">Collect feedback and highlight achievements.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Alternance Program <span className="text-primary">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Track Alternance program events, company meetings, and important deadlines.
            </p>
          </div>
          <EventCalendar 
            program="Alternance"
            title="Alternance Program Events"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-alternance text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Professional Immersion?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            The Alternance program offers the most intensive work-based learning experience. 
            Are you ready to dive deep into professional life while completing your degree?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")}
              className="text-lg px-8 py-4 bg-white text-alternance hover:bg-white/90"
            >
              Apply for Alternance Program
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")}
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-alternance"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AlternanceProgram;