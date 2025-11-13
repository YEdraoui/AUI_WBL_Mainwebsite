import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, DollarSign, Calendar } from "lucide-react";

const ProgramCards = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: "Co-op Program",
      tagline: "Experience-Driven Learning",
      description: "Gain hands-on experience through 3-week winter and 3-month summer placements, repeats and rotates over 2-3 years.",
      features: [
        { icon: Calendar, text: "3-week winter + 3-month summer placements" },
        { icon: Clock, text: "Repeats and rotates over 2-3 years" },
        { icon: MapPin, text: "American-style experiential track" },
        { icon: DollarSign, text: "MAD 1,000-3,000 net compensation" }
      ],
      path: "/coop",
      gradient: "from-coop to-coop-light"
    },
    {
      title: "Remote@AUI",
      tagline: "Flexible Project-Based Work",
      description: "Work on real projects remotely with faculty supervision, perfect for building skills while maintaining academic focus.",
      features: [
        { icon: MapPin, text: "Remote work from AUI Campus/home" },
        { icon: Clock, text: "Task-based project deliverables" },
        { icon: Calendar, text: "Company supervision included" },
        { icon: DollarSign, text: "MAD 300 per deliverable net" }
      ],
      path: "/remote",
      gradient: "from-remote to-remote-light"
    },
    {
      title: "Alternance Program",
      tagline: "Professional Immersion",
      description: "Spend 4 days per week in companies while continuing academic studies, perfect for long-term professional development.",
      features: [
        { icon: Calendar, text: "4 days/week in company" },
        { icon: Clock, text: "Fridays + weekends classes" },
        { icon: MapPin, text: "Semester-long commitment" },
        { icon: DollarSign, text: "MAD 1,000-4,000 net compensation" }
      ],
      path: "/alternance",
      gradient: "from-alternance to-alternance-light"
    }
  ];

  return (
    <section className="relative py-24 bg-muted overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 right-16 w-24 h-1 bg-primary/20 rotate-45"></div>
        <div className="absolute top-32 right-32 w-16 h-1 bg-primary/15 rotate-45"></div>
        <div className="absolute bottom-32 left-16 w-32 h-1 bg-secondary/20 rotate-45"></div>
        <div className="absolute bottom-16 left-32 w-20 h-1 bg-secondary/15 rotate-45"></div>
        <div className="absolute top-1/2 right-8 w-10 h-10 bg-primary/10 rotate-45 rounded-lg"></div>
        <div className="absolute top-1/4 left-8 w-8 h-8 bg-secondary/10 rotate-12 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Choose Your Path to 
            <span className="text-primary"> Professional Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Three distinct programs designed to match your career goals, schedule preferences, and professional aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="group hover:shadow-aui transition-smooth cursor-pointer bg-white border border-border/50 overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${program.gradient}`}></div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-fast">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-secondary">
                  {program.tagline}
                </CardDescription>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {program.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {program.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3 text-sm">
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature.text}</span>
                  </div>
                ))}

                <div className="pt-6">
                  <Button 
                    onClick={() => navigate(program.path)}
                    className="w-full group-hover:scale-105 transition-smooth"
                    variant="default"
                  >
                    Learn More & Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Not sure which program is right for you?
          </p>
          <Button variant="outline" size="lg" onClick={() => navigate("/compare")}>
            Compare All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramCards;