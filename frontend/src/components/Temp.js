import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

const Temp = () => {
    return (
        <div className="w-full h-auto">
            {/* Ensure the main container is responsive */}
            <div className='main flex flex-col md:flex-row w-full h-full gap-y-5 md:gap-x-5'>
                {/* Responsive image container */}
                <div className='left w-full md:w-[50%]'>
                    <img
                        src="https://miro.medium.com/v2/resize:fit:1400/0*mD7F8b6gIjsq3gsi"
                        alt=""
                        className='w-full h-full object-cover md:h-screen'
                    />
                </div>
                {/* Right container with responsive text and sliders */}
                <div className='right flex flex-col gap-y-2 my-auto px-4 md:px-0'>
                    {/* Responsive title section */}
                    <div className='title text-caribbeangreen-300 flex items-center gap-2'>
                        <span className='border-b-2 border-white flex-grow w-[80px] -translate-y-0.7'></span>
                        <span className="text-center md:text-left">YOU ARE IN GOOD COMPANY</span>
                    </div>
                    {/* Responsive heading */}
                    <div className='heading flex flex-col text-white text-2xl md:text-3xl'>
                        <span>Client Centric</span>
                        <span>Thoughtful Solutions</span>
                    </div>
                    {/* Responsive slider section */}
                    <div className='slider flex flex-col gap-y-2 w-full md:w-[50%]'>
                        <div className='slider1'>
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                spaceBetween={5} // Decreased space between slides
                                modules={[Autoplay, FreeMode, Navigation]}
                                className='mySwiper'
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 5,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 5,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 5,
                                    },
                                }}
                            >
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className='slider2'>
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                spaceBetween={5}  // Decreased space between slides
                                modules={[Autoplay, FreeMode, Navigation]}
                                className='mySwiper'
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 5,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 5,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 5,
                                    },
                                }}
                            >
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="https://img.freepik.com/premium-vector/cartoon-character-playing-chess-game_29937-4039.jpg"
                                        alt=""
                                        className='w-[100px] mx-auto'
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temp;
