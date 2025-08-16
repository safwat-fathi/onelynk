import React from 'react';

interface AvatarProps {
  /**
   * The image source URL
   */
  src?: string;
  /**
   * The alt text for the image
   */
  alt?: string;
  /**
   * The initials to display when no image is provided
   */
  initials?: string;
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Whether the avatar should have a ring indicating status
   */
  hasRing?: boolean;
  /**
   * The color of the avatar when showing initials
   * @default "neutral"
   */
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  initials = "",
  size = "md",
  hasRing = false,
  color = "neutral",
  className = ""
}) => {
  // Size classes mapping
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  // Text size classes mapping
  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  // Ring classes
  const ringClass = hasRing ? "ring ring-offset-2 ring-offset-base-100" : "";

  // If src is provided and not empty, show image
  if (src) {
    return (
      <div className={`avatar ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full ${ringClass}`}>
          <img 
            src={src} 
            alt={alt} 
          />
        </div>
      </div>
    );
  }

  // Otherwise show initials
  return (
    <div className={`avatar placeholder ${className}`}>
      <div className={`!flex items-center justify-center ${sizeClasses[size]} rounded-full ${ringClass} bg-${color} text-${color}-content`}>
        <span className={textSizeClasses[size]}>{initials}</span>
      </div>
    </div>
  );
};

export default Avatar;