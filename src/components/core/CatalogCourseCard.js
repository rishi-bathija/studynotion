import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getAvgRating from '../../utils/avgRating';
import RatingStars from '../common/RatingStars';

const CatalogCourseCard = ({ course, height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img src={course.thumbnail} alt="" className={`${height} w-full object-cover rounded-xl`} />
                    </div>
                    <div>
                        <p>{course.courseName}</p>
                        <p>{course.instructor.firstName}{course.instructor.lastName}</p>
                        <div className='flex gap-x-3'>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars reviewCount={avgReviewCount} />
                            <span>{course.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p>{course.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CatalogCourseCard
