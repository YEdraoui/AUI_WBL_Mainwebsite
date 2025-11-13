import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Presentation, FileDown, ExternalLink, File, Calendar, User, ChevronRight, Linkedin } from "lucide-react";
import { useResources, getCategoryLabel } from "@/hooks/useResources";
import { useBookingServices, getCategoryColor, getCategoryLabel as getServiceCategoryLabel } from "@/hooks/useBookingServices";

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'ppt':
    case 'pptx':
      return <Presentation className="h-8 w-8 text-orange-500" />;
    case 'doc':
    case 'docx':
      return <FileText className="h-8 w-8 text-blue-500" />;
    case 'pdf':
      return <File className="h-8 w-8 text-red-500" />;
    case 'xls':
    case 'xlsx':
      return <File className="h-8 w-8 text-green-500" />;
    default:
      return <File className="h-8 w-8 text-gray-500" />;
  }
};


const ResourceCard = ({ resource }: { resource: any }) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
          <CardDescription className="text-sm">
            {resource.description || "No description available"}
          </CardDescription>
        </div>
        <div className="ml-3 flex-shrink-0">
          {getFileIcon(resource.file_type)}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
          {resource.file_type.toUpperCase()}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={() => window.open(resource.file_url, '_blank')}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View and Download
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BookingServiceCard = ({ service }: { service: any }) => (
  <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
    <CardHeader className="pb-3 flex-shrink-0">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          {service.image_url ? (
            <img 
              src={service.image_url} 
              alt={service.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <User className="h-8 w-8 text-primary" />
          )}
        </div>
        <div className="flex-1 min-h-[4rem]">
          <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2 h-10 overflow-hidden">
            {service.description}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0 flex-grow flex flex-col justify-between">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2">
          {service.category && (
            <Badge variant="secondary" className={`text-xs ${getCategoryColor(service.category)}`}>
              {getServiceCategoryLabel(service.category)}
            </Badge>
          )}
          {service.duration && (
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {service.duration}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-2 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <ChevronRight className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Service Overview */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Service Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.full_description || service.description}
                </p>
              </div>

              {/* Service Details */}
              <div className="flex flex-wrap gap-3">
                {service.category && (
                  <Badge variant="secondary" className={getCategoryColor(service.category)}>
                    {getServiceCategoryLabel(service.category)}
                  </Badge>
                )}
                {service.duration && (
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    {service.duration}
                  </Badge>
                )}
              </div>

              {/* Provider Information */}
              {service.provider_name && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">Meet Your Expert</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      {service.provider_image_url ? (
                        <img 
                          src={service.provider_image_url} 
                          alt={service.provider_name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <User className="h-10 w-10 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{service.provider_name}</h4>
                      {service.provider_bio && (
                        <p className="text-muted-foreground text-sm mt-1">
                          {service.provider_bio}
                        </p>
                      )}
                      {service.provider_linkedin_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 h-8"
                          onClick={() => window.open(service.provider_linkedin_url, '_blank')}
                        >
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6 border-t">
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => window.open(service.booking_link, '_blank')}
              >
                Book Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          size="sm" 
          className="h-8"
          onClick={() => window.open(service.booking_link, '_blank')}
        >
          Book Session
        </Button>
      </div>
    </CardContent>
  </Card>
);

const RESOURCE_CATEGORIES = [
  { key: 'presentations', label: 'Presentations' },
  { key: 'student_guides', label: 'Student Guides' },
  { key: 'employer_guides', label: 'Employer Guides' },
  { key: 'cv_interview_guides', label: 'CV & Interview Guides' }
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("presentations");
  const { data: resources = [], isLoading, error } = useResources();
  const { data: bookingServices = [], isLoading: servicesLoading, error: servicesError } = useBookingServices();

  // Group resources by category
  const resourcesByCategory = resources.reduce((acc: any, resource: any) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-24">
            <div className="text-center">Loading resources...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-24">
            <div className="text-center text-red-500">Error loading resources</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Resources & <span className="text-primary">Guides</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your one-stop hub for presentations, guides, and documents to support your 
              work-based learning journey.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-fit mx-auto grid-cols-4 mb-12 gap-1">
                {RESOURCE_CATEGORIES.map((category) => (
                  <TabsTrigger key={category.key} value={category.key} className="text-sm">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {RESOURCE_CATEGORIES.map((category) => (
                <TabsContent key={category.key} value={category.key} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourcesByCategory[category.key]?.length > 0 ? (
                      resourcesByCategory[category.key].map((resource: any) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground text-lg">
                          No resources available in this category yet.
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                          Check back later for new resources.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Book a Session with an Expert Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Book a Session with an <span className="text-primary">Expert</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get personalized guidance from our experienced professionals to accelerate your career journey.
              </p>
            </div>

            {servicesLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading booking services...</p>
              </div>
            ) : servicesError ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading booking services</p>
              </div>
            ) : bookingServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookingServices.map((service: any) => (
                  <BookingServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No booking services available at the moment.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Check back later for expert sessions.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Need Additional Resources?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact our team for personalized assistance 
              or request additional materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => window.open("https://calendly.com/i-taurel-aui/wbl-programs-info-session", "_blank")}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'mailto:wbl@aui.ma?subject=Resource Request'}
              >
                Request Materials
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;