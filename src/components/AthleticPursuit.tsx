import React from "react";
import Image from "next/image";

const AthleticPursuit = () => {
  return (
    <section className="bg-black text-white py-16 w-full mt-[150px] mb-[189px]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">LIVE THE ATHLETIC PURSUIT</h2>
        <p className="text-lg mt-2">STRENGTH. STYLE. SOUL</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src="/atheletic-pursuit/Gemini_Generated_Image_1.png"
              alt="Athlete 1"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative w-full aspect-[2/3]">
            <Image
              src="/atheletic-pursuit/Gemini_Generated_Image_2.png"
              alt="Athlete 2"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative w-full aspect-[2/3]">
            <Image
              src="/atheletic-pursuit/Gemini_Generated_Image_3.png"
              alt="Athlete 3"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AthleticPursuit;
