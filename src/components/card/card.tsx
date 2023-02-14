import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Button } from '../button/button';
import { Rating } from '../rating/rating';
import NoImage from '../../assets/no-image.jpg';

import style from './card.module.css'

interface CardProps {
    id: number;
    view: string;
    rating: number;
    img: string;
    name: string;
    author: string;
}

export const Card: FC<CardProps> = ({id, view, img, rating, name, author}) => (
    <Link 
        to={`/books/cat/${id}`} 
        data-test-id='card' 
        className={cn({
            [style.hWrap]: view === 'list', 
            [style.vWrap]: view === 'tile'
        })}
    >
        {view === 'tile' ? (
        <div className={style.card}>
            <img className={style.image} src={img ? img : NoImage} alt="book" width={174} height={242}/>
            <div className={style.body}>
                <div className={style.rating}>
                    {rating ? (
                        <Rating rating={rating}/>
                    ) : (
                        <p className={style.ghost}>ещё нет оценок</p>
                    )}
                </div>
                <h2 className={style.name}>{name}</h2>
                <p className={style.ghost}>{author}</p>
                <div className={style.btn}>
                    <Button>Забронировать</Button>
                </div>
            </div>
        </div>
    ) : (
        <div className={style.hCard}>
            <img src={img ? img : NoImage} alt="book" width={120} height={170}/>
            <div className={style.hBody}>
                <div className={style.titles}>
                    <h2 className={style.hName}>{name}</h2>
                    <p className={style.hAuthor}>{author}</p>
                </div>
                <div className={style.hBtns}>
                    {rating ? (
                        <Rating rating={rating} size='small'/>
                    ) : (
                        <p className={style.ghost}>ещё нет оценок</p>
                    )}
                    <div className={style.hBtn}>
                        <Button>Забронировать</Button>
                    </div>
                </div>
            </div>
        </div> 
    )}
  </Link>  
)