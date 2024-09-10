import React from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/auth/about/StatsComponent';
import LearningGrid from '../components/core/auth/about/LearningGrid';
import ContactFormSection from '../components/core/auth/about/ContactFormSection';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

const About = () => {
    return (
        <div className="mt-[100px] text-white bg-richblack-900 font-inter">
            {/* Banner Section */}
            <section className="max-w-maxContent mx-auto text-center py-10">
                <header className="text-4xl font-bold mb-4 text-yellow-50">
                    Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
                </header>
                <p className="max-w-maxContentTab mx-auto text-richblue-200">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, commodi. Quos repudiandae atque deserunt quia eius iusto ipsam magnam aperiam perferendis rerum doloribus error, voluptate earum nobis accusamus odio ad provident temporibus nulla architecto?
                </p>
                <div className="flex gap-5 justify-center mt-6">
                    <img src={BannerImage1} alt="Banner 1" className="rounded-md" />
                    <img src={BannerImage2} alt="Banner 2" className="rounded-md" />
                    <img src={BannerImage3} alt="Banner 3" className="rounded-md" />
                </div>
            </section>

            {/* Highlighted Section */}
            <section className="bg-richblack-700 py-10">
                <div className="max-w-maxContent mx-auto text-center">
                    <p className='text-2xl font-semibold'>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text="combines technology" /> <span className="text-yellow-200">expertise</span> and community to create an <span className="text-yellow-200">unparalleled education experience</span>.</p>
                </div>
            </section>

            {/* Founding Story Section */}
            <section className="max-w-maxContent mx-auto py-16 px-6 flex flex-col gap-10">
                <div className="flex justify-between gap-10 items-center bg-richblack-800 p-6 rounded-lg">
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold text-yellow-50 mb-4">Our Founding Story</h1>
                        <p className="text-richblue-100 mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, rerum ratione. Eveniet soluta accusantium, a quisquam eaque repudiandae reprehenderit, magni, nemo unde delectus cumque dolorum iste qui at quasi neque eius voluptas sunt esse iusto.
                        </p>
                        <p className="text-richblue-100">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque, iusto fugiat nihil magni sequi aliquid amet provident mollitia delectus, sint ut, fugit exercitationem reprehenderit distinctio accusamus voluptate non? Officiis aut sed amet laboriosam.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <img src={FoundingStory} alt="Founding Story" className="rounded-lg" />
                    </div>
                </div>

                {/* Vision and Mission Section */}
                <div className="flex justify-between gap-10">
                    <div className="w-1/2 bg-richblack-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-caribbeangreen-200 mb-4">Our Vision</h2>
                        <p className="text-richblue-100">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, vitae recusandae deleniti eaque et qui iste, aliquam dolor quasi nostrum pariatur ut similique tenetur, aspernatur delectus! Aperiam, rem iusto at commodi ab sit.
                        </p>
                    </div>
                    <div className="w-1/2 bg-richblack-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-caribbeangreen-200 mb-4">Our Mission</h2>
                        <p className="text-richblue-100">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam alias numquam minus, ipsa quis laborum, dolores eaque maiores dolorem possimus fuga blanditiis debitis! Voluptatem quos, neque voluptas quod deleniti quibusdam nihil voluptates impedit accusantium.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats and Learning Sections */}
            <StatsComponent />
            <section className="mx-auto flex flex-col items-center justify-between gap-5 py-10">
                <LearningGrid />
                <ContactFormSection />
            </section>

            {/* Reviews Section */}
            <section className="py-10">
                <div className="max-w-maxContent mx-auto">
                    <h3 className="text-2xl font-bold text-yellow-50 mb-6">Reviews from Other Learners</h3>
                    <ReviewSlider />
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
