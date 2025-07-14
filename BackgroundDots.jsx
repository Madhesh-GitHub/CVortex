import React from 'react';

const BackgroundDots = ({
  dotSize = 1.2,
  dotColor = '#fb3a5d',
  backgroundColor = 'transparent',
  gap = 15,
  className,
  fade = true,
  style,
  ...props
}) => {
  const encodedDotColor = encodeURIComponent(dotColor);

  const maskStyle = fade
    ? {
        maskImage: 'radial-gradient(circle, white 10%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle, white 10%, transparent 90%)',
      }
    : {};

  const backgroundStyle = {
    backgroundColor,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='${gap}' height='${gap}' viewBox='0 0 ${gap} ${gap}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodedDotColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='${dotSize}' cy='${dotSize}' r='${dotSize}'/%3E%3C/g%3E%3C/svg%3E")`,
    ...maskStyle,
    ...style,
  };

  return (
    <div
      className={`absolute inset-0 h-full w-full z-0 pointer-events-none ${className}`}
      style={backgroundStyle}
      {...props}
    />
  );
};

export default BackgroundDots;