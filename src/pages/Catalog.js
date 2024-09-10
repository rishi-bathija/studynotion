import React, { useEffect, useState } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/api'
import { useParams } from 'react-router-dom'
import { getCatalogPageDetails } from '../services/operations/catalogAPI'
import CatalogCourseCard from '../components/core/CatalogCourseCard'


const Catalog = () => {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [catalogData, setCatalogData] = useState(null);
    const [active, setActive] = useState(1);

    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector('GET', categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageDetails(categoryId);
                console.log("Printing res: ", res);
                setCatalogData(res);
                console.log('caatalogdata', catalogData);
            } catch (error) {
                console.log(error);
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])

    return (
        <div className='text-white'>
            <div>
                <p>{`Home / Catalog /`}<span>{catalogData?.selectedCategory?.name}</span></p>
                <p>{catalogData?.selectedCategory?.name}</p>
                <p>{catalogData?.selectedCategory?.description}</p>
            </div>

            <div>
                {/* section1 */}
                <div>
                    <div>Courses to get you started
                        <div className="flex gap-x-3">
                            <p className={`${active === 1 ? "border-b-2 border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer transition-all duration-200`} onClick={() => setActive(1)}>Most Popular</p>
                            <p className={`${active === 2 ? "border-b-2 border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer transition-all duration-300`} onClick={() => setActive(2)}>New</p>
                        </div>
                    </div>
                    <div>
                        <CourseSlider courses={catalogData?.selectedCategory?.courses} />
                    </div>
                </div>

                {/* section2 */}
                <div>
                    <p>Top Courses in {catalogData?.selectedCategory?.name}</p>
                    <div>
                        <CourseSlider courses={catalogData?.differentCategory?.courses} />
                    </div>
                </div>

                {/* section3 */}
                <div>
                    <div>Frequently Bought Courses</div>
                    <div>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            {
                                catalogData?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                    <CatalogCourseCard course={course} key={index} height={'h-[400px]'} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog
