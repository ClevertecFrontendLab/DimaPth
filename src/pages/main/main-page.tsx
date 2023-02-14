import { FC, useState } from 'react';
import cn from 'classnames'

import {ReactComponent as SearchIcon} from '../../assets/search-icon.svg';
import {ReactComponent as CloseIcon} from '../../assets/close-icon.svg';
import {ReactComponent as FilterIcon} from '../../assets/filter-icon.svg';
import {ReactComponent as TileView} from '../../assets/tile-view.svg';
import {ReactComponent as ListView} from '../../assets/list-view.svg';
import BookImage from '../../assets/book-image.jpg';

import { Card } from '../../components/card/card';

import style from './main-page.module.css';

const books = [
    {
        id: 1,
        img: '', 
        rating: 1, 
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: false 
    },
    {
        id: 2,
        img: BookImage, 
        rating: 4, 
        name: 'Грокаем алгоритмы. Иллюстрированное ', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: false 
    },
    {
        id: 3,
        img: BookImage, 
        rating: 3, 
        name: 'Грокаем алгоритмы', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: true 
    },
    {
        id: 4,
        img: BookImage, 
        rating: 5, 
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: false 
    },
    {
        id: 5,
        img: BookImage, 
        rating: 4, 
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...', 
        author: 'Адитья Бхаргава, Патрик Нимейер, 2019', 
        isBooked: true 
    },
    {
        id: 6,
        img: '', 
        rating: 1, 
        name: 'Грокаем алгоритмы. Иллюстрированное', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: true 
    },
    {
        id: 7,
        img: BookImage, 
        rating: 2, 
        name: 'Грокаем алгоритмы.', 
        author: 'Адитья Бхаргава, Патрик Нимейер, 2019', 
        isBooked: false 
    },
    {
        id: 8,
        img: BookImage, 
        rating: 0, 
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...', 
        author: 'Адитья Бхаргава, Патрик Нимейер, 2019', 
        isBooked: false 
    },
    {
        id: 9,
        img: '', 
        rating: 0, 
        name: 'Грокаем алгоритмы. Иллюстрированное пособие для програ...', 
        author: 'Адитья Бхаргава, 2019', 
        isBooked: false 
    },
]

export const MainPage: FC = () => {
    const [view, setView] = useState('tile')
    const [open, setOpen] = useState(false)

    return (
    <section>
            <div className={style.navList}>
                <div className={style.searchWrap}>
                    <div 
                        className={cn(style.default, style.searchBar, {[style.opened]: open})} 
                        aria-hidden={true}
                    >   
                        <button type='button' onClick={() => setOpen(true)} data-test-id='button-search-open'>
                            <SearchIcon className={cn(style.searchIcon, {[style.opened]: open})} width={16} height={16}/>
                        </button>
                        <input 
                            className={style.input} type="text" 
                            placeholder='Поиск книги или автора…' 
                            data-test-id='input-search'
                        />
                        <button type='button' onClick={() => setOpen(false)} data-test-id='button-search-close'>
                            <CloseIcon className={style.closeIcon} width={16} height={16}/>
                        </button>
                    </div>
                    <button type='button' className={cn(style.default, style.filterBtn)}>
                        <FilterIcon className={style.filterIcon} width={16} height={16}/>
                        По рейтингу
                    </button>
                </div>
                <div className={style.btns}>
                    <button 
                        className={cn(style.default, style.viewBtn, {[style.activeBtn]: view === 'tile'})} 
                        type='button'
                        onClick={() => setView('tile')}
                        data-test-id='button-menu-view-window'
                    >
                        <TileView className={style.tileView} width={18} height={18}/>
                    </button>
                    
                    <button
                        className={cn(style.default, style.viewBtn, {[style.activeBtn]: view === 'list'})} 
                        type='button'
                        onClick={() => setView('list')}
                        data-test-id='button-menu-view-list'
                    >
                        <ListView className={style.tileView} width={18} height={18}/>
                    </button>
                </div>
            </div>
            <div className={cn(style.cardList, {[style.horizontal]: view === 'list'})}>
                {books.map(book => (
                    <Card
                        id={book.id} 
                        view={view}
                        key={book.id} 
                        rating={book.rating} 
                        img={book.img}
                        name={book.name}
                        author={book.author}
                    />
                ))}
            </div>
    </section>
)};
