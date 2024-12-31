import React, { useEffect, useState } from 'react';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { useParams } from 'react-router-dom';
import { getCatalogPageDetails } from '../services/operations/catalogAPI';
import CatalogCourseCard from '../components/core/CatalogCourseCard';

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
                setCatalogData(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    return (
        <div className="text-white bg-richblack-900 min-h-screen">
            {/* <div className="max-w-maxContent mx-auto py-10"> */}
            {/* Breadcrumb */}

            <div className="w-screen bg-richblack-800">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent px-4 lg:px-0">
                    <p className="text-sm">
                        Home / Catalog / <span className="text-yellow-50">{catalogData?.selectedCategory?.name}</span>
                    </p>
                    <p className="text-3xl font-bold">{catalogData?.selectedCategory?.name}</p>
                    <p className="text-richblack-200">{catalogData?.selectedCategory?.description}</p>
                </div>
            </div>


            {/* Courses to get you started */}
            <div className="mb-10 max-w-maxContent mx-auto py-10">
                <h2 className="text-4xl font-bold">Courses to get you started</h2>
                <div className="flex gap-x-6 mt-4">
                    <p
                        className={`${active === 1 ? "border-b-2 border-yellow-50 text-yellow-50" : "text-richblack-50"} cursor-pointer transition-all duration-200`}
                        onClick={() => setActive(1)}>
                        Most Popular
                    </p>
                    <p
                        className={`${active === 2 ? "border-b-2 border-yellow-50 text-yellow-50" : "text-richblack-50"} cursor-pointer transition-all duration-200`}
                        onClick={() => setActive(2)}>
                        New
                    </p>
                </div>
                <div className="mt-6">
                    <CourseSlider courses={catalogData?.selectedCategory?.courses} />
                </div>
            </div>

            {/* Top Courses in Category */}
            <div className="mb-10 max-w-maxContent mx-auto py-10">
                <h2 className="text-4xl font-bold">Top Courses in {catalogData?.selectedCategory?.name}</h2>
                <div className="mt-6">
                    <CourseSlider courses={catalogData?.differentCategory?.courses} />
                </div>
            </div>

            {/* Frequently Bought */}
            <div className='max-w-maxContent mx-auto py-10'>
                <h2 className="text-4xl font-bold mb-6">Frequently Bought Courses</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                        catalogData?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                            <CatalogCourseCard course={course} key={index} height={'h-[400px]'} />
                        ))
                    }
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

export default Catalog;
