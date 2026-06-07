"use client";

import { useState } from "react";
import { getIconComponent } from "@/lib/icon-resolver";

interface LogoImageProps {
  src: string;
  alt: string;
  className: string;
  fallbackIcon: string;
  fallbackText: string;
  iconSize: number;
  iconClass: string;
}

export default function LogoImage({
  src,
  alt,
  className,
  fallbackIcon,
  fallbackText,
  iconSize,
  iconClass,
}: LogoImageProps) {
  const [error, setError] = useState(false);
  const LogoIcon = getIconComponent(fallbackIcon);

  if (error) {
    return (
      <>
        <LogoIcon size={iconSize} className={iconClass} />
        <span className="font-mono">{fallbackText}</span>
      </>
    );
  }

  return (
    <>
      <img src={src} alt={alt} className={className} onError={() => setError(true)} />
      <span className="font-mono">{fallbackText}</span>
    </>
  );
}
