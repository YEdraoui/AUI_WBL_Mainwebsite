import { useSuccessStories } from '@/hooks/useSuccessStories';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, User } from 'lucide-react';

interface SuccessStoriesCarouselProps {
  program: 'Co-op' | 'Remote@AUI' | 'Alternance';
}

const SuccessStoriesCarousel = ({ program }: SuccessStoriesCarouselProps) => {
  const { data: stories, isLoading, error } = useSuccessStories(program);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="h-16 w-16 rounded-full mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded" />
              </div>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load success stories at this time.</p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No success stories available yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Carousel 
        className="w-full max-w-7xl mx-auto" 
        opts={{ 
          align: "start", 
          loop: true,
          skipSnaps: false,
          dragFree: false
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {stories.map((story, index) => (
            <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="h-full">
                <Card className="bg-card border-border shadow-sm hover:shadow-md transition-smooth h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header with student and company info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center flex-1 min-w-0">
                        {/* Student Image */}
                        <div className="h-12 w-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-semibold text-sm mr-3 flex-shrink-0">
                          {story.student_image_url ? (
                            <img 
                              src={story.student_image_url} 
                              alt={story.student_name}
                              className="h-12 w-12 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`h-12 w-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-semibold text-sm ${story.student_image_url ? 'hidden' : 'flex'}`}>
                            {story.student_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                        </div>
                        
                        {/* Student Info */}
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="font-semibold text-foreground truncate">
                            {story.student_name}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {story.company_name}
                          </div>
                        </div>
                      </div>
                      
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {story.company_logo_url ? (
                          <img 
                            src={story.company_logo_url} 
                            alt={`${story.company_name} logo`}
                            className="h-10 w-10 object-contain rounded bg-white p-1 border border-border"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`h-10 w-10 bg-muted rounded flex items-center justify-center border border-border ${story.company_logo_url ? 'hidden' : 'flex'}`}>
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Experience Text */}
                    <div className="flex-1">
                      <p className="text-muted-foreground italic leading-relaxed text-sm line-clamp-6">
                        "{story.experience_text}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Buttons on Left and Right */}
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 border-border bg-background/80 backdrop-blur-sm hover:bg-background" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 border-border bg-background/80 backdrop-blur-sm hover:bg-background" />
      </Carousel>
    </div>
  );
};

export default SuccessStoriesCarousel;