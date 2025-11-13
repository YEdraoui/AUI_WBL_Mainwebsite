import { useState, useRef } from "react";
import { useSuccessVideos } from "@/hooks/useSuccessVideos";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StudentVideoStories = () => {
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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Student Video Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear directly from students who have transformed their careers through our programs
          </p>
        </div>

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
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm hover:bg-background shadow-elegant border border-border/50"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm hover:bg-background shadow-elegant border border-border/50"
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
                    className="w-64 scale-75 opacity-60 hover:opacity-80 cursor-pointer transition-smooth"
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
                    className="w-96 scale-100 z-10 cursor-pointer transition-smooth"
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
                    className="w-64 scale-75 opacity-60 hover:opacity-80 cursor-pointer transition-smooth"
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
                    className={`w-2 h-2 rounded-full transition-smooth ${
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
    </section>
  );
};

export default StudentVideoStories;