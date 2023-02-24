import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames'

import {ReactComponent as CloseIcon} from '../../assets/close-icon.svg';
import {ReactComponent as FilterIcon} from '../../assets/filter-icon.svg';
import {ReactComponent as ListView} from '../../assets/list-view.svg';
import {ReactComponent as SearchIcon} from '../../assets/search-icon.svg';
import {ReactComponent as TileView} from '../../assets/tile-view.svg';
import { Card } from '../../components/card/card';
import { Loader } from '../../components/loader/loader';
import { Error } from '../../components/error/error';
import { useFetchAllBooksQuery } from '../../redux/books-api';

import style from './main-page.module.css';
import { useAppSelector } from '../../hooks/hooks';


export const MainPage: FC = () => {
    const [view, setView] = useState<'tile' | 'list'>('tile')
    const [open, setOpen] = useState(false)
    const {category} = useAppSelector(state => state.menu)

    const {data: books, isFetching, isError, isSuccess, refetch} = useFetchAllBooksQuery()

    const filteredBooks = 
        (category.path === 'all') 
            ? books 
            : books?.filter(book => book.categories.includes(category.name));

    useEffect (() => {
        refetch()
    }, [refetch])

    return (
    <section className={style.mainPage}>
        {isFetching && <Loader />}
        {isError && <Error />}
        {isSuccess && (
            <React.Fragment>
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
                    {(filteredBooks && filteredBooks.length > 0) 
                        ? filteredBooks?.map(book => (
                        <Card
                            key={book.id}
                            book={book}
                            view={view}
                        />
                        )) 
                        : 'no books'}
                </div>
            </React.Fragment>
        )}
    </section>
)};
