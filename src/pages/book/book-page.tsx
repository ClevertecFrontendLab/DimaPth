import React, { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import {ReactComponent as HideIcon} from '../../assets/hide-icon.svg';
import {ReactComponent as ShowIcon} from '../../assets/show-icon.svg';
import UserIcon from '../../assets/user-icon.png';
import { Button } from '../../components/button/button';
import { Rating } from '../../components/rating/rating';
import { Slider } from '../../components/slider/slider';
import { Loader } from '../../components/loader/loader';
import { Error } from '../../components/error/error';
import { useFetchBookByIDQuery } from '../../redux/books-api';
import { useAppSelector } from '../../hooks/hooks';

import style from './book-page.module.css';

export const BookPage: FC = () => {
    const [isOpen, setIsOpen] = useState(true)

    const {bookId} = useParams<{bookId?: string}>();
    
    const {category} = useAppSelector(state => state.menu)

    const {data, isFetching, isError, isSuccess} = useFetchBookByIDQuery(bookId)
    
    return (
    <section className={style.bookPage}>
        <div className={style.breadcrumbs}>
            <span>
                <Link 
                    to={`/books/${category.path}`}
                    data-test-id='breadcrumbs-link'
                    >
                    {category.name}
                </Link>
            </span>
            <span className={style.divider}>/</span>
            <span data-test-id='book-name'>{data?.title}</span>
        </div>
        {isFetching && <Loader />}
        {isError && <Error />}
        {isSuccess && (
            <React.Fragment>
            <div className={style.main}>
                <Slider images={data?.images}/>
                <div>
                    <div className={style.info}>
                        <h2 className={style.title} data-test-id='book-title'>{data.title}</h2>
                        <h3 className={style.subTitle}>{data.authors}</h3>
                        <div className={style.btn}>
                            <Button size='large'>Забронировать</Button> 
                        </div>
                    </div>
                    <div className={cn(style.about, style.desktop)}>
                        <h3 className={style.title}>О книге</h3>
                        <p className={style.text}>{data.description}</p>
                    </div>
                </div>
            </div>
            <div className={cn(style.about, style.mobile)}>
                    <h3 className={style.title}>О книге</h3>
                    <p className={style.text}>{data.description}</p>
            </div>
            <div className={style.rating}>
                <h3 className={style.title}>Рейтинг</h3>
                <div className={style.wrap}>
                    <Rating rating={data.rating || 0} size='large' />
                    {data.rating ? <span>{data.rating}</span> : 'ещё нет оценок'}
                </div>
            </div>
            <div className={style.details}>
                <h3 className={style.title}>Подробная информация</h3>
                <div className={style.table}>
                    <div className={style.column}>
                            <div className={style.item}>
                                <div>Издательство</div>
                                <div>{data.publish}</div>
                            </div>
                            <div className={style.item}>
                                <div>Год издания</div>
                                <div>{data.issueYear}</div>
                            </div>
                            <div className={style.item}>
                                <div>Страниц</div>
                                <div>{data.pages}</div>
                            </div>
                            <div className={style.item}>
                                <div>Переплёт</div>
                                <div>{data.cover}</div>
                            </div>
                            <div className={style.item}>
                                <div>Формат</div>
                                <div>{data.format}</div>
                            </div>
                    </div>
                    <div className={style.column}>
                        <div className={style.item}>
                            <div>Жанр</div>
                            <div>{data.categories.join(', ')}</div>
                        </div>
                        <div className={style.item}>
                            <div>Вес</div>
                            <div>{data.weight}</div>
                        </div>
                        <div className={style.item}>
                            <div>ISBN</div>
                            <div>{data.ISBN}</div>
                        </div>
                        <div className={style.item}>
                            <div>Изготовитель</div>
                            <div>{data.producer}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.reviews}>
                <h3 className={style.title}>
                    Отзывы &nbsp;<span>{data.comments?.length || 0}</span>
                    <button type='button' onClick={() => setIsOpen(!isOpen)} data-test-id='button-hide-reviews'>
                        {isOpen ? <HideIcon /> : <ShowIcon />}
                    </button>
                </h3>
                <div className={cn({[style.hidden]: !isOpen})}>   
                    {data.comments?.map(comment => (
                        <div key={comment.id} className={style.review}>
                            <div className={style.user}>
                                <img 
                                    src={`https://strapi.cleverland.by${comment.user.avatarUrl}` && UserIcon}
                                    alt="user" 
                                />
                                <div className={style.userInfo}>
                                    <span>{comment.user.firstName} {comment.user.lastName}</span>
                                    <span>
                                        {new Date(comment.createdAt)
                                            .toLocaleString('ru', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                        }
                                    </span>
                                </div>
                            </div>
                            <div>
                                <Rating rating={comment.rating}/>
                            </div>
                            <p className={style.text}>{comment.text}</p>
                        </div>
                    ))}
                </div>
                <div className={style.btn}>
                    <Button size='large' data-test-id='button-rating'>оценить книгу</Button>
                </div>
            </div>

            </React.Fragment>
        )}
    </section>
    )
};
