import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAvgRating from '../../utils/avgRating';
import RatingStars from '../common/RatingStars';

const CatalogCourseCard = ({ course, height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className="bg-richblack-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link to={`/courses/${course._id}`}>
                {/* Course Thumbnail */}
                <div className={`${height} w-full`}>
                    <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className={`w-full h-full object-cover rounded-t-lg`}
                    />
                </div>

                {/* Course Details */}
                <div className="p-4">
                    {/* Course Name */}
                    <p className="text-lg font-semibold text-richblack-5 mb-2 truncate">
                        {course.courseName}
                    </p>

                    {/* Instructor Name */}
                    <p className="text-sm text-richblack-200 mb-4">
                        {course.instructor.firstName} {course.instructor.lastName}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-x-2 mb-4">
                        <span className="text-yellow-50 font-bold">{avgReviewCount || 0}</span>
                        <RatingStars reviewCount={avgReviewCount} />
                        <span className="text-richblack-200">
                            ({course.ratingAndReviews.length} Ratings)
                        </span>
                    </div>

                    {/* Course Price */}
                    <p className="text-xl font-bold text-yellow-50">
                        ${course.price}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default CatalogCourseCard;
