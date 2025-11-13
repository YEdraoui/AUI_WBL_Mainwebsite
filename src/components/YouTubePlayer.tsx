import { useState } from "react";
import { Play, Building2, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface YouTubePlayerProps {
  title: string;
  company: string;
  department?: string | null;
  videoUrl: string;
  isActive?: boolean;
  onClick?: () => void;
}

const YouTubePlayer = ({ 
  title, 
  company, 
  department, 
  videoUrl, 
  isActive = false,
  onClick 
}: YouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  const handlePlay = () => {
    setIsPlaying(true);
    onClick?.();
  };

  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'ring-2 ring-primary scale-105 shadow-lg' 
          : 'hover:shadow-md hover:scale-102'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          {!isPlaying ? (
            <>
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-200 hover:scale-110"
                >
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </button>
              </div>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Building2 className="h-4 w-4" />
            <span>{company}</span>
          </div>
          {department && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{department}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubePlayer;