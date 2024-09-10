import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeaturedAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import getAvgRating from '../utils/avgRating';
import Error from './Error';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants';
import { addToCart } from '../slice/cartSlice';
import ConfirmationModal from '../components/common/ConfirmationModal';

const CourseDetails = () => {
    const token = useSelector((state) => state.auth.token);
    const course = useSelector((state) => state.course.course);
    const user = useSelector((state) => state.profile.user);
    const loading = useSelector((state) => state.profile.loading);
    const paymentLoading = useSelector((state) => state.course.paymentLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState([]);

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? [...isActive, id] : isActive.filter((e) => e !== id)
        );
    };

    useEffect(() => {
        const fetchFullCourseDetails = async () => {
            try {
                const response = await fetchCourseDetails(courseId);
                setCourseData(response);
            } catch (error) {
                console.log("Could not fetch course details");
            }
        };
        fetchFullCourseDetails();
    }, [courseId]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAvgRating(courseData?.CourseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    const [totalLectures, setTotalLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.CourseDetails.courseContent.forEach(section => {
            lectures += section.subSection.length || 0;
        });
        setTotalLectures(lectures);
    }, [courseData]);

    const handleCoursePurchase = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you cannot buy a course");
            return;
        }

        if (token) {
            dispatch(addToCart(courseData?.CourseDetails));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const handleShare = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
            toast.success("URL copied to clipboard!");
        } catch (error) {
            console.error('Failed to copy URL: ', error);
        }
    };

    if (loading || !courseData) {
        return <div>Loading...</div>;
    }

    if (!courseData?.success) {
        return <Error />;
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
        instructions,
    } = courseData?.CourseDetails;

    return (
        <div className='bg-richblack-800 text-white py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row lg:space-x-8'>
                    <div className='lg:w-2/3'>
                        <div className='mb-8'>
                            <h1 className='text-4xl font-bold mb-4'>{courseName}</h1>
                            <p className='mb-6'>{courseDescription}</p>
                            <div className='flex items-center gap-x-4 mb-6'>
                                <span className='text-yellow-25'>{avgReviewCount}</span>
                                <RatingStars reviewCount={avgReviewCount} starSize={20} />
                                <span>{`${ratingAndReviews.length} reviews`}</span>
                                <span>{`${studentsEnrolled.length} Students Enrolled`}</span>
                            </div>
                            <div className='mb-6'>
                                <p className="font-semibold">Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
                                <p>Created on {formatDate(createdAt)}</p>
                            </div>
                        </div>

                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold mb-4'>What you'll learn</h2>
                            <div>{whatYouWillLearn}</div>
                        </div>

                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold mb-4'>Course Content</h2>
                            <div className='mb-4'>
                                <span>{courseContent.length} sections</span>
                                <span className='ml-2'>{totalLectures} lectures</span>
                                <span className='ml-2'>Total length: {courseData?.totalDuration}</span>
                            </div>
                            <button className='text-yellow-25 mb-4' onClick={() => setIsActive([])}>Collapse all sections</button>
                            <div className='bg-richblack-700 p-4 rounded-lg'>
                                {courseContent.map((section, index) => (
                                    <div key={index} className='mb-4 border border-richblack-600 rounded-lg'>
                                        <div
                                            className='cursor-pointer flex justify-between items-center px-4 py-3 bg-richblack-800 rounded-t-lg'
                                            onClick={() => handleActive(index)}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <h3 className='text-xl font-bold'>{section.sectionName}</h3>
                                                <span className='text-yellow-25'>{section.subSection.length} lectures</span>
                                            </div>
                                            <span>{isActive.includes(index) ? '-' : '+'}</span>
                                        </div>
                                        {isActive.includes(index) && (
                                            <ul className='list-disc px-4 py-3 bg-richblack-700 rounded-b-lg'>
                                                {section.subSection.length > 0 ? (
                                                    section.subSection.map((subSec, subIndex) => (
                                                        <li key={subIndex} className='mb-2'>{subSec.title}</li>
                                                    ))
                                                ) : (
                                                    <li>No Lectures Available</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mb-8'>
                            <h2 className='text-2xl font-bold mb-4'>About the Author</h2>
                            <div className='flex items-center gap-4'>
                                <img src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`} alt="Instructor" className='h-14 w-14 rounded-full object-cover' />
                                <div>
                                    <p className='text-lg font-semibold'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                                    <p className='text-richblack-50'>{instructor?.additionalDetails?.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:w-1/3 bg-richblack-700 p-6 rounded-lg h-min'>
                        <img src={thumbnail} alt="Course Thumbnail" className='w-full rounded-lg mb-6' />
                        <p className='text-2xl font-bold mb-4'>Rs. {price}</p>
                        <div className='flex flex-col gap-4 mb-6'>
                            <button className='bg-yellow-500 text-black px-6 py-4 rounded-lg font-semibold' onClick={user && studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleCoursePurchase}>{user && studentsEnrolled.includes(user?._id) ? "Go to Course" :
                                "Buy Now"}
                            </button>
                            <button className='bg-richblack-800 text-white px-6 py-4 rounded-lg font-semibold' onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                        <button className='bg-transparent text-yellow-25 font-semibold' onClick={handleShare}>
                            Share this course
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default CourseDetails;
