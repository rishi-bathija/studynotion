import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiConnector';
import { ratingEndpoints } from '../../services/api';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const allReviews = async () => {
            const { data } = await apiConnector("GET", ratingEndpoints.REVIEW_DETAILS_API);

            console.log('review response', data);

            if (data?.success) {
                setReviews(data?.data);
            }

            console.log('reviews', reviews);
        }
        allReviews();

    }, []);

    return (
        <div className='text-white w-full'>
            <div className='my-[50px] h-[190px] max-w-maxContent'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{ delay: 2500, }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className='w-full'>
                    {reviews?.map((review, index) => (
                        <SwiperSlide key={index}>
                            {/* Render your review content here */}
                            <div className='flex flex-col gap-3'>
                                <div className='flex gap-4 items-center'>
                                    <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} alt="" className='h-9 w-9 object-cover rounded-full' />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                        <h2 className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </h2>
                                    </div>
                                </div>
                                <p>{review?.review}</p>
                                <div className='flex items-center gap-2'>
                                    <h3 className="font-semibold text-yellow-100">
                                        {review.rating.toFixed(1)}
                                    </h3>
                                    <ReactStars
                                        count={5}
                                        value={review?.rating}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider;
