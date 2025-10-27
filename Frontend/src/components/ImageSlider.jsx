
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider1 from "../assets/slider1.jpg"
import slider2 from "../assets/slider2.jpg"
import slider3 from "../assets/slider3.jpg"
import slider4 from "../assets/slider4.jpg"
import slider5 from "../assets/slider5.jpg"



const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    slider5
    
  ];
  
 
export default function ImageSlider() {
  return (
    <div className="px-4 sm:px-8 py-4 bg-white">
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
      <Swiper
  modules={[Pagination, Autoplay, ]}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop
  className="w-full aspect-video md:h-[400px] lg:h-[500px]"
   style={{
    "--swiper-theme-color": "#605fff", // active bullet color
  }}
>
  {images.map((src, index) => (
    <SwiperSlide key={index}>
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        className="w-full h-full  object-contain"
      />
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </div>
  );
}