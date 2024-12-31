import React from 'react';

const StatsComponent = () => {
    const statsData = [
        { count: "5k", label: "Active Students" },
        { count: "10+", label: "Mentors" },
        { count: "200+", label: "Courses" },
        { count: "50+", label: "Awards" },
    ];

    return (
        <section className="bg-richblack-800 py-8">
            <div className="max-w-maxContent mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {statsData.map((stat, index) => (
                    <div key={index} className="text-white">
                        <h1 className="text-4xl font-bold text-yellow-400">{stat.count}</h1>
                        <h2 className="mt-2 text-lg">{stat.label}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsComponent;
