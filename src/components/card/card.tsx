import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import NoImage from '../../assets/no-image.jpg';
import { IBooks } from '../../types/books';
import { Button } from '../button/button';
import { Rating } from '../rating/rating';

import style from './card.module.css'
import { useAppSelector } from '../../hooks/hooks';

interface CardProps {
    book: IBooks;
    view: 'tile' | 'list';
}

export const Card: FC<CardProps> = ({book, view}) => {
    const {category} = useAppSelector(state => state.menu)

    return (
        <Link 
            to={`/books/${category.path}/${book.id}`} 
            data-test-id='card' 
            className={cn(style.card, {[style.horizontal]: view === 'list'})}
        >
            <div className={cn(style.image, {[style.horizontal]: view === 'list'})}>
                <img 
                    src={book.image?.url 
                            ? `https://strapi.cleverland.by${book.image.url}` 
                            : NoImage
                        } 
                    alt="book" 
                    width={view === 'tile' ? 174 : 120} 
                    height={view === 'tile' ? 242 : 170}
                />
            </div>
            <div className={cn(style.body, {[style.horizontal]: view === 'list'})}>
                <div className={cn(style.rating, {[style.visible]: view === 'tile'})}>
                    {book.rating ? (
                        <Rating rating={book.rating}/>
                    ) : (
                        <p className={style.ghost}>ещё нет оценок</p>
                    )}
                </div>
                <h2 className={cn(style.title, {[style.horizontal]: view === 'list'})}>{book.title}</h2>
                <p className={cn(style.ghost, {[style.horizontal]: view === 'list'})}>
                    {book.authors.length > 1 
                        ? book.authors.map(author => `${author}, `)
                        : `${book.authors}, `
                    }
                    {book.issueYear}
                </p>
                <div className={cn(style.btns, {[style.horizontal]: view === 'list'})}>
                    <div className={cn(style.rating, {[style.visible]: view === 'list'})}>
                        {book.rating ? (
                            <Rating rating={book.rating}/>
                        ) : (
                            <p className={style.ghost}>ещё нет оценок</p>
                        )}
                    </div>
                    <Button>Забронировать</Button>
                </div>
            </div>
    </Link>  
    )
}