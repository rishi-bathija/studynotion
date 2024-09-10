import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { GiNinjaStar } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slice/cartSlice';
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturedAPI';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { total, totalItems, cart } = useSelector((state) => state.cart);
    console.log('cartdata', cart);

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        console.log("Course bought successfully");
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch);
    }

    return (
        <div className='text-richblack-5 p-6'>
            <h1 className='text-3xl font-bold mb-6'>Cart</h1>
            <p className='border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400'>{totalItems} Courses in Cart</p>
            {total > 0 ? (
                <div className='mt-8 flex flex-col lg:flex-row gap-10 justify-between'>
                    <div className="rendercartcourses w-full lg:w-[70%]">
                        <div className='flex flex-col gap-y-6'>
                            {cart.map((course, index) => (
                                <div key={index} className='flex justify-between items-center bg-richblack-800 p-6 rounded-lg border border-richblack-700'>
                                    <div className="left flex gap-x-6 items-center">
                                        <img src={course.thumbnail} className='w-[150px] h-[100px] rounded-lg object-cover' alt={course.courseName} />
                                        <div className='flex flex-col gap-y-2'>
                                            <p className='text-xl font-semibold text-richblack-50'>{course.courseName}</p>
                                            <p className='text-richblack-400'>{course.category.name}</p>
                                            <div className='flex items-center gap-x-2'>
                                                <span className='text-yellow-400' onClick={() => {
                                                    console.log('rating', course.rating);
                                                }}>4.7</span>
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    edit={false}
                                                    value={course.rating}
                                                    activeColor="#ffd700"
                                                    emptyIcon={<GiNinjaStar />}
                                                    fullIcon={<GiNinjaStar />}
                                                />
                                                <span className='text-richblack-400 text-sm'>{course.ratingAndReviews.length} Ratings</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right flex flex-col items-end gap-y-2">
                                        <button onClick={() => dispatch(removeFromCart(course._id))} className='flex items-center gap-x-2 text-pink-200 bg-richblack-700 py-3 px-[12px] rounded-md'>
                                            <RiDeleteBin6Line size={20} />
                                            <span className='text-sm'>Remove</span>
                                        </button>
                                        <p className='text-yellow-400 font-semibold text-2xl'>₹ {course.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rendertotalamount bg-richblack-800 p-6 rounded-lg border border-richblack-700 lg:w-[30%] h-min space-y-4">
                        <p className='text-lg font-semibold text-richblack-50 mb-4'>Total:</p>
                        <p className='text-3xl font-bold text-yellow-400 mb-6'>₹ {total}</p>
                        <IconBtn text="Buy Now" onClick={handleBuyCourse} customCLasses={"w-full justify-center bg-yellow-500 text-black"} />
                    </div>
                </div>
            ) : (
                <p className='text-richblack-300'>Your Cart is empty</p>
            )}
        </div>
    )
}

export default Cart;
