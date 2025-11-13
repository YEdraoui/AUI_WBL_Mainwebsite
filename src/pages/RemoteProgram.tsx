import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventCalendar from "@/components/EventCalendar";
import SuccessStoriesCarousel from "@/components/SuccessStoriesCarousel";
import StudentVideoStories from "@/components/StudentVideoStories";
import { JobsSection } from "@/components/JobsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Monitor, Clock, Users, DollarSign, CheckCircle, Zap, FileText, Target, Network, Brain, FolderOpen, ArrowRight } from "lucide-react";
const RemoteProgram = () => {
  const navigate = useNavigate();
  const keyFeatures = [{
    icon: Monitor,
    title: "Remote Flexibility",
    description: "Work from campus, home, or any suitable location"
  }, {
    icon: Zap,
    title: "Task-Based Projects",
    description: "Focused deliverables with clear objectives"
  }, {
    icon: Users,
    title: "Faculty Supervision",
    description: "Academic guidance throughout your experience"
  }, {
    icon: Clock,
    title: "Continuous Collaboration",
    description: "Ongoing communication with industry partners"
  }];
  const benefits = ["Flexible work arrangements", "Real industry project experience", "Academic supervision and support", "Technology skills development", "Time management skills", "Per-deliverable compensation (MAD 300 net)"];
  const projectTypes = [{
    title: "Technology",
    icon: Monitor,
    projects: ["Web development projects", "Mobile app prototypes", "Data analysis tasks", "Software testing", "UI/UX design"]
  }, {
    title: "Business",
    icon: FileText,
    projects: ["Market research", "Business plan development", "Social media strategy", "Content creation", "Process optimization"]
  }, {
    title: "Consulting",
    icon: Target,
    projects: ["Strategic analysis", "Industry research", "Competitive analysis", "Feasibility studies", "Process improvement"]
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-remote text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Remote@AUI Program
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Flexible Project-Based Work with Academic Support
            </p>
            <p className="text-lg mb-8 text-white/80 leading-relaxed">
              Work on real industry projects remotely while maintaining your academic schedule. 
              Perfect for building practical skills with faculty supervision and flexible execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")} className="text-lg px-8 py-4 bg-white text-remote hover:bg-white/90">
                Apply Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")} className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-remote">
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
              Designed for maximum flexibility while maintaining professional standards and academic integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => <Card key={index} className="text-center hover:shadow-lg transition-smooth">
                <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 bg-remote/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-remote" />
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

      {/* Project Types */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Types of Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Work on diverse projects that match your skills and career interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((category, index) => <Card key={index} className="bg-card hover:shadow-elegant transition-smooth border border-border/50">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 h-16 w-16 bg-remote/10 rounded-full flex items-center justify-center">
                    <category.icon className="h-8 w-8 text-remote" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.projects.map((project, projectIndex) => <li key={projectIndex} className="flex items-start">
                        <div className="h-2 w-2 bg-remote rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{project}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-12">
                How It Works
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 w-0.5 bg-remote/20" style={{
                height: 'calc(100% - 120px)'
              }}></div>
                
                <div className="space-y-12">
                  <div className="flex items-start relative">
                    <div className="h-8 w-8 bg-remote rounded-full flex items-center justify-center text-white font-bold text-sm mr-6 flex-shrink-0 relative z-10">
                      1
                    </div>
                    <div className="pt-1 flex-1">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        ✓ Job Applications
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">You Apply to open positions of Remote@AUI Program based on the requirements.</p>
                    </div>
                  </div>

                  <div className="flex items-start relative">
                    <div className="h-8 w-8 bg-remote rounded-full flex items-center justify-center text-white font-bold text-sm mr-6 flex-shrink-0 relative z-10">
                      2
                    </div>
                    <div className="pt-1 flex-1">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        ✓ Interviews & Selections
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">You go through the interview and selection process at the level of The Program and the company before you get selected for the Remote Position</p>
                    </div>
                  </div>

                  <div className="flex items-start relative">
                    <div className="h-8 w-8 bg-remote rounded-full flex items-center justify-center text-white font-bold text-sm mr-6 flex-shrink-0 relative z-10">
                      3
                    </div>
                    <div className="pt-1 flex-1">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        ✓ Remote Execution
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Work flexibly on deliverables with regular check-ins and faculty guidance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start relative">
                    <div className="h-8 w-8 bg-remote rounded-full flex items-center justify-center text-white font-bold text-sm mr-6 flex-shrink-0 relative z-10">
                      4
                    </div>
                    <div className="pt-1 flex-1">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        ✓ Delivery & Payment
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Submit completed deliverables and receive compensation upon approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <DollarSign className="h-12 w-12 text-remote mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Compensation Structure</h3>
              </div>
              
              <div className="bg-remote/10 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-remote">MAD 300</span>
                  <div className="text-muted-foreground">per deliverable (net)</div>
                </div>
              </div>

              <h4 className="font-semibold mb-4">Benefits Include:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <JobsSection 
        program="Remote@AUI"
        title="Available Remote@AUI Positions"
        description="Discover current remote opportunities that fit your schedule and academic commitments."
        className="bg-muted"
      />

      {/* Success Stories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Remote@AUI Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Students who gained valuable experience through flexible remote projects
            </p>
          </div>

          <SuccessStoriesCarousel program="Remote@AUI" />
        </div>
      </section>

      {/* Student Video Stories */}
      <StudentVideoStories />

      {/* Riipen Industry Projects Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-3 bg-remote/10 text-remote px-6 py-3 rounded-full text-sm font-medium mb-4">
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
                <span className="bg-remote/10 text-remote px-3 py-1 rounded-full font-medium">Join</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-remote/10 text-remote px-3 py-1 rounded-full font-medium">Collaborate</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-remote/10 text-remote px-3 py-1 rounded-full font-medium">Deliver</span>
                <ArrowRight className="h-4 w-4" />
                <span className="bg-remote/10 text-remote px-3 py-1 rounded-full font-medium">Get Feedback</span>
              </div>
            </div>

            {/* Visual Content - Cards */}
            <div className="space-y-6">
              <Card className="bg-card hover:shadow-lg transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-remote/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Network className="h-6 w-6 text-remote" />
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
                    <div className="h-12 w-12 bg-remote/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-remote" />
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
                    <div className="h-12 w-12 bg-remote/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="h-6 w-6 text-remote" />
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

      {/* Requirements */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Program Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-remote">Academic Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Minimum 2.5 GPA</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Completed at least 45 credit hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Good academic standing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Faculty advisor approval</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-remote">Technical Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Reliable internet connection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Personal computer/laptop</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Basic software skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                      <span>Communication tools proficiency</span>
                    </li>
                  </ul>
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
              Remote@AUI <span className="text-cyan-500">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Follow Remote@AUI events, project kickoffs, and submission deadlines.
            </p>
          </div>
          <EventCalendar program="Remote@AUI" title="Remote@AUI Events" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-remote text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work Remotely?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Remote@AUI and gain valuable industry experience while maintaining the flexibility to focus on your studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")} className="text-lg px-8 py-4 bg-white text-remote hover:bg-white/90">
              Apply for Remote@AUI
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")} className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-remote">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default RemoteProgram;