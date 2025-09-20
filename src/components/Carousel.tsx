"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/carousel/198b0e171616083.64f99764d284a.jpg',
  '/carousel/0493f3171616083.64f99764d50e0.jpg',
  '/carousel/bc8b0c171616083.64f99764d0ce0.jpg',
  '/carousel/eac999171616083.64f99764d4562.jpg',
  '/carousel/f8699c171616083.64f99764d1bc0.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-lg">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={src} alt={`Slide ${index + 1}`} layout="fill" objectFit="fill" />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
