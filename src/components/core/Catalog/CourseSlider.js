import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';
import CatalogCourseCard from '../CatalogCourseCard';
import './CourseSlider.css';

const CourseSlider = ({ courses }) => {


    console.log('courses', courses);
    return (
        <div>
            {
                courses?.length ? (
                    <>
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={25}
                            pagination={{ clickable: true }}
                            modules={[Pagination, Autoplay, FreeMode, Navigation]}
                            className='mySwiper'
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                        >
                            {courses.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CatalogCourseCard course={course} height={'h-[250px]'} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </>
                ) : (
                    <p className="text-xl text-richblack-5">No Course Found</p>
                )
            }
        </div>
    );
}

export default CourseSlider;
