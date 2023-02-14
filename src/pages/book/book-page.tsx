import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../../components/button/button';
import { Rating } from '../../components/rating/rating';
import UserIcon from '../../assets/user-icon.png';
import BookImageBig from '../../assets/book-image-big.jpg';
import {ReactComponent as ShowIcon} from '../../assets/show-icon.svg';
import {ReactComponent as HideIcon} from '../../assets/hide-icon.svg';

import style from './book-page.module.css';
import { Slider } from '../../components/slider/slider';

const books = [
    {
        id: 1,
        img: '',
        category: 'Бизнес книги',
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
        author: 'Адитья Бхаргава, 2019',
    },
    {
        id: 2,
        img: [BookImageBig],
        category: 'Бизнес книги',
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
        author: 'Адитья Бхаргава, 2019',
    },
    {
        id: 3,
        img: [BookImageBig, BookImageBig, BookImageBig, BookImageBig, BookImageBig, BookImageBig],
        category: 'Бизнес книги',
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
        author: 'Адитья Бхаргава, 2019',
    },
]

const reviews = [
    {
        img: UserIcon,
        name: 'Иван Иванов',
        data: '5 января 2019',
        rating: 4,
        text: 'Omae wa mo shindeiru',
    },
    {
        img: UserIcon,
        name: 'Николай Качков',
        data: '20 июня 2018',
        rating: 4,
        text: 'Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.',
    },
    {
        img: UserIcon,
        name: 'Екатерина Беляева',
        data: '18 февраля 2018',
        rating: 4,
        text: '',
    },
]

export const BookPage: FC = () => {
    const [isOpen, setIsOpen] = useState(true)
    const {bookId} = useParams<{bookId?: string}>();
    const book: any = bookId && books.find(item => item.id === +bookId);
    
    
    return (
    <section className={style.bookPage}>
        <div className={style.breadcrumbs}>
            <span><Link to='/'>{book.category}</Link></span>
            <span className={style.divider}>/</span>
            <span>{book.name}</span>
        </div>
        <div >
            <div className={style.main}>
                <Slider img={book.img}/>
                <div>
                    <div className={style.info}>
                        <h2 className={style.title}>{book.name}</h2>
                        <h3 className={style.subTitle}>{book.author}</h3>
                        <div className={style.btn}>
                            <Button size='large'>Забронировать</Button> 
                        </div>
                    </div>
                    <div className={cn(style.about, style.desktop)}>
                        <h3 className={style.title}>О книге</h3>
                        <p className={style.text}>Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?</p>
                        <p className={style.text}>Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.</p>
                    </div>
                </div>
            </div>
            <div className={cn(style.about, style.mobile)}>
                    <h3 className={style.title}>О книге</h3>
                    <p className={style.text}>Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?</p>
                    <p className={style.text}>Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.</p>
            </div>
        </div>
        <div className={style.rating}>
            <h3 className={style.title}>Рейтинг</h3>
            <div className={style.wrap}>
                <Rating rating={4} size='large' />
                <span>4.3</span>
            </div>
        </div>
        <div className={style.details}>
            <h3 className={style.title}>Подробная информация</h3>
            <div className={style.table}>
                <div className={style.column}>
                        <div className={style.item}>
                            <div>Издательство</div>
                            <div>Питер</div>
                        </div>
                        <div className={style.item}>
                            <div>Год издания</div>
                            <div>2019</div>
                        </div>
                        <div className={style.item}>
                            <div>Страниц</div>
                            <div>288</div>
                        </div>
                        <div className={style.item}>
                            <div>Переплёт</div>
                            <div>Мягкая обложка</div>
                        </div>
                        <div className={style.item}>
                            <div>Формат</div>
                            <div>70х100</div>
                        </div>
                </div>
                <div className={style.column}>
                    <div className={style.item}>
                        <div>Жанр</div>
                        <div>Компьютерная литература</div>
                    </div>
                    <div className={style.item}>
                        <div>Вес</div>
                        <div>370 г</div>
                    </div>
                    <div className={style.item}>
                        <div>ISBN</div>
                        <div>978-5-4461-0923-4</div>
                    </div>
                    <div className={style.item}>
                        <div>Изготовитель</div>
                        <div>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</div>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.reviews}>
            <h3 className={style.title}>
                Отзывы &nbsp;<span>2</span>
                <button type='button' onClick={() => setIsOpen(!isOpen)} data-test-id='button-hide-reviews'>
                    {isOpen ? <HideIcon /> : <ShowIcon />}
                </button>
            </h3>
            <div className={cn({[style.hidden]: !isOpen})}>   
                {reviews.map(review => (
                    <div key={review.name} className={style.review}>
                        <div className={style.user}>
                            <img src={review.img} alt="user" />
                            <div className={style.userInfo}>
                                <span>{review.name}</span>
                                <span>{review.data}</span>
                            </div>
                        </div>
                        <div>
                            <Rating rating={review.rating}/>
                        </div>
                        <p className={style.text}>{review.text}</p>
                    </div>
                ))}
            </div>
            <div className={style.btn}>
                <Button size='large' data-test-id='button-rating'>оценить книгу</Button>
            </div>
        </div>
    </section>
    )
};
