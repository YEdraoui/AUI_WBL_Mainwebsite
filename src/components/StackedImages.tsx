import { useState, useEffect } from "react";

interface StackedImagesProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const StackedImages = ({ images, className = "" }: StackedImagesProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Reorder images based on current index
  const orderedImages = [
    ...images.slice(currentIndex),
    ...images.slice(0, currentIndex)
  ];

  return (
    <div 
      className={`relative w-full h-full cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {orderedImages.map((image, index) => (
        <div
          key={`${image.src}-${currentIndex}-${index}`}
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isHovered 
              ? `transform ${
                  index === 0 ? '-translate-x-20 -translate-y-12 rotate-[-12deg]' :
                  index === 1 ? 'translate-x-20 -translate-y-6 rotate-[10deg]' :
                  'translate-x-0 translate-y-16 rotate-[-5deg]'
                } scale-85` 
              : 'transform translate-x-0 translate-y-0 rotate-0 scale-100'
          }`}
          style={{
            zIndex: orderedImages.length - index,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default StackedImages;