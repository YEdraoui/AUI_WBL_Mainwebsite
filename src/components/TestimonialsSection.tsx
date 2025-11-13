import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useSuccessVideos } from "@/hooks/useSuccessVideos";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const { data: videos = [], isLoading } = useSuccessVideos();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToVideo = (index: number) => {
    setActiveVideoIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const videoWidth = container.scrollWidth / videos.length;
      container.scrollTo({
        left: index * videoWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    const newIndex = activeVideoIndex > 0 ? activeVideoIndex - 1 : videos.length - 1;
    scrollToVideo(newIndex);
  };

  const scrollRight = () => {
    const newIndex = activeVideoIndex < videos.length - 1 ? activeVideoIndex + 1 : 0;
    scrollToVideo(newIndex);
  };

  // Static employer testimonials data
  const employerTestimonials = [
    {
      name: "Ahmed Talbi",
      role: "HR Director",
      company: "InnovTech Solutions",
      content: "AUI students bring exceptional technical skills and professionalism. Our partnership has resulted in full-time hires and ongoing collaborations.",
      logo: "IT"
    },
    {
      name: "Laila Mansouri",
      role: "Operations Manager",
      company: "Global Services Morocco",
      content: "The structured approach of AUI's work-based learning programs ensures students are work-ready from day one. Highly recommended.",
      logo: "GSM"
    }
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-28 h-1 bg-primary/15 rotate-45"></div>
        <div className="absolute top-40 left-40 w-20 h-1 bg-primary/10 rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-32 h-1 bg-secondary/15 rotate-45"></div>
        <div className="absolute bottom-20 right-40 w-24 h-1 bg-secondary/10 rotate-45"></div>
        <div className="absolute top-1/3 right-12 w-12 h-12 bg-primary/8 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-1/3 left-12 w-10 h-10 bg-secondary/8 rotate-12 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Success Stories from 
            <span className="text-primary"> Our Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from students and employers who have experienced the transformative power of work-based learning.
          </p>
        </div>

        {/* Student Video Stories */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Student Video Stories</h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-muted-foreground">Loading videos...</div>
            </div>
          ) : videos.length > 0 ? (
            <div className="relative max-w-5xl mx-auto">
              {/* Navigation Buttons */}
              {videos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                    onClick={scrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                    onClick={scrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Video Carousel */}
              <div className="flex justify-center items-center gap-4 px-16 min-h-[400px]">
                {videos.length > 0 && (
                  <>
                    {/* Left Video */}
                    <div 
                      className="w-64 scale-75 opacity-60 hover:opacity-80 cursor-pointer transition-all duration-500"
                      onClick={() => scrollToVideo(activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1)}
                    >
                      <YouTubePlayer
                        title={videos[activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1]?.title}
                        company={videos[activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1]?.company}
                        department={videos[activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1]?.department}
                        videoUrl={videos[activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1]?.video_url}
                        isActive={false}
                        onClick={() => scrollToVideo(activeVideoIndex === 0 ? videos.length - 1 : activeVideoIndex - 1)}
                      />
                    </div>

                    {/* Center Video (Active) */}
                    <div 
                      className="w-96 scale-100 z-10 cursor-pointer transition-all duration-500"
                      onClick={() => scrollToVideo(activeVideoIndex)}
                    >
                      <YouTubePlayer
                        title={videos[activeVideoIndex]?.title}
                        company={videos[activeVideoIndex]?.company}
                        department={videos[activeVideoIndex]?.department}
                        videoUrl={videos[activeVideoIndex]?.video_url}
                        isActive={true}
                        onClick={() => scrollToVideo(activeVideoIndex)}
                      />
                    </div>

                    {/* Right Video */}
                    <div 
                      className="w-64 scale-75 opacity-60 hover:opacity-80 cursor-pointer transition-all duration-500"
                      onClick={() => scrollToVideo(activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1)}
                    >
                      <YouTubePlayer
                        title={videos[activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1]?.title}
                        company={videos[activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1]?.company}
                        department={videos[activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1]?.department}
                        videoUrl={videos[activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1]?.video_url}
                        isActive={false}
                        onClick={() => scrollToVideo(activeVideoIndex === videos.length - 1 ? 0 : activeVideoIndex + 1)}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Video Indicators */}
              {videos.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === activeVideoIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => scrollToVideo(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No success stories available at the moment.</p>
            </div>
          )}
        </div>

        {/* Employer Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12">Employer Perspectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {employerTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-primary/5 border-primary/20 hover:shadow-lg transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-xl font-bold mr-4">
                      {testimonial.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;