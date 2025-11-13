import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, DollarSign, Users, CheckCircle, Award, Monitor, Building2, BookOpen, Zap } from "lucide-react";

const ProgramComparison = () => {
  const navigate = useNavigate();

  const programs = [
    {
      name: "Co-op Program",
      tagline: "Experience-Driven Learning",
      description: "Structured professional placements with academic integration",
      duration: "3-week winter + 3-month summer",
      frequency: "Repeats and rotates over 2-3 years",
      workStyle: "On-site company placement",
      compensation: "MAD 1,000-3,000 net per month",
      timeCommitment: "Part-time seasonal",
      academicIntegration: "Academic credit opportunities (Internship)",
      supervision: "Company mentors", 
      targetStudents: "All Levels except Graduating Seniors",
      gpaRequirement: "None",
      keyBenefits: [
        "Real-world professional experience",
        "Network building with industry professionals", 
        "Enhanced employability upon graduation",
        "Mentorship from experienced professionals",
        "American-style experiential learning"
      ],
      path: "/coop",
      color: "coop",
      icon: Award
    },
    {
      name: "Remote@AUI",
      tagline: "Flexible Project-Based Work",
      description: "Remote project work with faculty supervision and flexibility",
      duration: "Project-based deliverables",
      frequency: "Continuous availability",
      workStyle: "Remote (campus/home/anywhere)",
      compensation: "MAD 300 per deliverable net",
      timeCommitment: "Flexible part-time",
      academicIntegration: "Company supervision included",
      supervision: "Faculty advisor + company liaison",
      targetStudents: "All Levels who want to work independently and remotely",
      gpaRequirement: "None", 
      keyBenefits: [
        "Flexible work while studying",
        "Real industry project experience",
        "Technology skills development",
        "Time management skills",
        "Work-life balance optimization"
      ],
      path: "/remote",
      color: "remote",
      icon: Monitor
    },
    {
      name: "Alternance Program", 
      tagline: "Professional Immersion",
      description: "Deep professional integration with academic continuity",
      duration: "Full semester commitment",
      frequency: "4 days/week ongoing",
      workStyle: "On-site company immersion",
      compensation: "MAD 1,000-4,000 net per month",
      timeCommitment: "Near full-time",
      academicIntegration: "Condensed weekend classes",
      supervision: "Company mentors + faculty support",
      targetStudents: "Juniors & Seniors",
      gpaRequirement: "None",
      keyBenefits: [
        "Deep professional integration",
        "Long-term mentorship relationships",
        "Enhanced career prospects",
        "Industry network development",
        "Seamless transition to full-time work"
      ],
      path: "/alternance",
      color: "alternance",
      icon: Building2
    }
  ];

  const comparisonCategories = [
    {
      title: "Program Structure",
      items: [
        { label: "Duration", key: "duration" },
        { label: "Frequency", key: "frequency" },
        { label: "Work Style", key: "workStyle" },
        { label: "Time Commitment", key: "timeCommitment" }
      ]
    },
    {
      title: "Academic Integration",
      items: [
        { label: "Academic Integration", key: "academicIntegration" },
        { label: "Supervision", key: "supervision" },
        { label: "GPA Requirement", key: "gpaRequirement" }
      ]
    },
    {
      title: "Financial & Career",
      items: [
        { label: "Compensation", key: "compensation" },
        { label: "Target Students", key: "targetStudents" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Compare All Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Find the Perfect Work-Based Learning Path for Your Goals
            </p>
            <p className="text-lg mb-8 text-white/80 leading-relaxed">
              Compare our three distinct programs side by side to understand which one aligns best 
              with your career aspirations, schedule preferences, and academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Program Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three distinct approaches to work-based learning, each designed for different student needs and career goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className={`text-center hover:shadow-aui transition-smooth border-${program.color}/20`}>
                <CardHeader>
                  <div className={`mx-auto mb-4 h-16 w-16 bg-${program.color}/10 rounded-full flex items-center justify-center`}>
                    <program.icon className={`h-8 w-8 text-${program.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{program.name}</CardTitle>
                  <CardDescription className={`text-lg font-medium text-${program.color}`}>
                    {program.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Compensation:</span>
                      <span className={`text-${program.color} font-semibold`}>{program.compensation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time Commitment:</span>
                      <span className="text-muted-foreground">{program.timeCommitment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">GPA Required:</span>
                      <span className="text-muted-foreground">{program.gpaRequirement}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open("https://recruitcrm.io/jobs/MyCareer", "_blank")}
                    className="w-full mt-6"
                    variant="default"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Detailed Comparison</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare key features and requirements across all three programs
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {comparisonCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center">{category.title}</h3>
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-0">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-4 bg-muted font-semibold text-left border-r border-border">
                              Feature
                            </th>
                            {programs.map((program, programIndex) => (
                              <th key={programIndex} className={`p-4 bg-${program.color}/5 font-semibold text-center border-r border-border last:border-r-0`}>
                                {program.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td className="p-4 font-medium border-r border-border bg-muted/30">
                                {item.label}
                              </td>
                              {programs.map((program, programIndex) => (
                                <td key={`value-${programIndex}-${itemIndex}`} className="p-4 text-sm text-muted-foreground border-r border-border last:border-r-0 text-center">
                                  {program[item.key as keyof typeof program] as string}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Comparison */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Key Benefits by Program</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understand the unique advantages each program offers to help you make the right choice
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="bg-white border border-border/50">
                <CardHeader>
                  <CardTitle className={`text-xl text-${program.color} flex items-center`}>
                    <program.icon className="h-6 w-6 mr-2" />
                    {program.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.keyBenefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Which Program is Right for You?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Use this guide to determine which program best matches your goals and circumstances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Choose Co-op Program if...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• You want structured, intensive experiences</li>
                  <li>• You prefer seasonal work commitments</li>
                  <li>• You want to try multiple Departments</li>
                  <li>• You value mentorship and networking</li>
                  <li>• You're comfortable with traditional work environments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Choose Remote@AUI if...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• You need maximum flexibility</li>
                  <li>• You're self-motivated and disciplined</li>
                  <li>• You want to balance work with studies</li>
                  <li>• You prefer project-based work</li>
                  <li>• You want to develop remote work skills</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Choose Alternance if...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• You're ready for near full-time commitment</li>
                  <li>• You want deep professional integration</li>
                  <li>• You're in your junior or senior year</li>
                  <li>• You want to see the work environment in Casablanca</li>
                  <li>• You want the highest earning potential</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">Ready to Choose Your Path?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Each program offers unique advantages. Select the one that aligns with your goals and start your professional journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              onClick={() => window.open("https://websites.recruitcrm.io/40820761-d057-4a43-a0ea-035caec9ef2c", "_blank")}
              className="text-lg px-8 py-4 bg-primary hover:bg-primary-light"
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const bookingUrl = "https://outlook.office.com/bookwithme/user/3727daa00c184cc2aa83b46bb59cafee@aui.ma?anonymous&ismsaljsauthenabled&ep=plink";
                window.open(bookingUrl, "_blank", "noopener,noreferrer");
              }}
              className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Contact an Advisor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramComparison;