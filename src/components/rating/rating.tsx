import { FC, useState } from 'react';

import cn from 'classnames';

import {ReactComponent as Star} from '../../assets/star.svg';

import style from './rating.module.css';


const arr = [1,2,3,4,5]

interface RatingProps {
    rating: number;
    size?: 'small' | 'large';
} 

export const Rating: FC<RatingProps> = ({rating: rate = 0, size}) => {
    const [rating, setRating] = useState(rate);
    const [hover, setHover] = useState(0);

    return (
    <div className={style.rating}>
        {arr.map((item) =>  (
            <button
                type="button"
                key={item}
                onClick={(e) => {
                    e.preventDefault()
                    setRating(item)
                }}
                onMouseEnter={() => setHover(item)}
                onMouseLeave={() => setHover(rating)}
            >
                <Star width={20} height={19} className={cn(style.star, {
                    [style.on]: item <= (hover || rating),
                    [style.off]: item > (hover || rating),
                    [style.large]: size === 'large',
                    [style.small]: size === 'small',
                })}/>
            </button>
        ))}
    </div>
)}