import React, { useEffect, useState } from 'react'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

const RatingStars = ({ reviewCount, starSize }) => {
    const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 0 });

    useEffect(() => {
        const wholeStars = Math.floor(reviewCount) || 0;
        setStarCount({
            full: wholeStars,
            half: Number.isInteger(reviewCount) ? 0 : 1,
            empty: Number.isInteger(reviewCount) ? 5 - wholeStars : 4 - wholeStars
        })
    }, [reviewCount]);

    return (
        <div className='flex'>
            {[...new Array(starCount.full)].map((_, i) => (
                <TiStarFullOutline key={i} size={starSize || 20} />
            ))}

            {[...new Array(starCount.half)].map((_, i) => (
                <TiStarHalfOutline key={i} size={starSize || 20} />
            ))}

            {[...new Array(starCount.empty)].map((_, i) => (
                <TiStarOutline key={i} size={starSize || 20} />
            ))}

        </div>
    )
}

export default RatingStars
