import React from 'react';

const ShimmerMovieCard = () => {
    return (
        <div className="w-36 md:w-48 lg:w-56 xl:w-60 pr-4 flex-shrink-0 animate-pulse">
            <div className="w-full h-48 md:h-64 lg:h-72 bg-gray-700 rounded-lg shadow-lg"></div>
            <div className="p-2 md:p-3">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    );
};

const ShimmerRow = () => {
    // Render 5-8 shimmering cards per row
    const cards = Array.from({ length: 7 }).map((_, i) => (
        <ShimmerMovieCard key={i} />
    ));
    return (
        <div className="flex overflow-x-hidden no-scrollbar gap-4 py-4">
            {cards}
        </div>
    );
};

const Shimmer = () => {
    // Render 3-4 rows of shimmering movie lists
    const rows = Array.from({ length: 3 }).map((_, i) => (
        <ShimmerRow key={i} />
    ));
    return (
        <div className="p-4 md:p-8 m-4 md:m-0 mt-16 md:-mt-52 relative z-20 bg-black text-white bg-opacity-90 md:bg-opacity-80 rounded-xl shadow-2xl mx-auto w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
            {rows}
        </div>
    );
};

export default Shimmer;
