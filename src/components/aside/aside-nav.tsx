import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {ReactComponent as ShowIcon} from '../../assets/show-icon.svg';
import {ReactComponent as HideIcon} from '../../assets/hide-icon.svg';

import style from './aside-nav.module.css';
import { setMenu } from '../../redux/slices/menu-slice';

const books = [
    // {book: 'Все книги', category: 'all'},
    {book: 'Бизнес-книги', count: 14, category: 'buisness'},
    {book: 'Детективы', count: 8, category: 'detective'},
    {book: 'Детские книги', count: 14, category: 'children'},
    {book: 'Зарубежная литература', count: 2, category: 'foreign'},
    {book: 'История', count: 5, category: 'history'},
    {book: 'Классическая литература', count: 12, category: 'classic'},
    {book: 'Книги по психологии', count: 11, category: 'psychology'},
    {book: 'Компьютерная литература', count: 54, category: 'computers'},
    {book: 'Культура и искусство', count: 5, category: 'culture'},
    {book: 'Наука и образование', count: 2, category: 'science'},
    {book: 'Публицистическая литература', count: 0, category: 'publicistic'},
    {book: 'Справочники', count: 10, category: 'references'},
    {book: 'Фантастика', count: 12, category: 'scifi'},
    {book: 'Юмористическая литература', count: 8, category: 'humor'}
]

interface AsideNavProps {
    mobile?: boolean;
}

const AsideNav: FC<AsideNavProps> = ({mobile}) => {
    const [tab, setTab] = useState('books');
    const [isOpen, setIsOpen] = useState(true);
    const [category, setCategory] = useState('all')
    const {isMenuOpen} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch();

    return (
        <aside 
            className={cn(style.aside,
                {[style.hidden]: !isMenuOpen,
                [style.mobile]: mobile})
            }
            onClick={(e) => e.stopPropagation()}
            aria-hidden='true'
            data-test-id={mobile && 'burger-navigation'}
        >
            <ul className={style.tabs}>
                <li>
                    <button 
                        type='button'
                        className={cn(style.tab, {[style.activeTab]: tab === 'books'})} 
                        onClick={() => {
                            setTab('books')
                            setCategory('all')
                            setIsOpen(!isOpen)
                        }}
                        data-test-id={mobile ? 'burger-showcase': 'navigation-showcase'}
                    >
                        <span>Витрина книг</span>
                        {isOpen ? <HideIcon /> : <ShowIcon />}
                    </button>
                    <ul className={cn(style.categories, {[style.hidden]: !isOpen})}>
                        <li 
                            className={cn({[style.active]: category === 'all'})}
                            data-test-id={mobile? 'burger-books' : 'navigation-books'}
                        >
                            <Link 
                                to='/books/all'
                                onClick={() => {
                                    setCategory('all')
                                    dispatch(setMenu(false))
                                }}
                                >
                                <span className={style.category}>Все книги</span>
                            </Link>
                        </li>
                        {books.map(item => (
                            <li 
                                key={item.book}
                                className={cn({[style.active]: category === item.category})} 
                                >
                                <Link 
                                    to={`/books/${item.category}`} 
                                    onClick={() => {
                                        setCategory(item.category)
                                        dispatch(setMenu(false))
                                    }}
                                >
                                    <span className={style.category}>{item.book}</span>&nbsp;
                                    <span className={style.count}>{item.count}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li data-test-id={mobile ? 'burger-terms' : 'navigation-terms'}>
                    <Link
                        to='/rules'
                        className={cn(style.tab, {[style.activeTab]: tab === 'rules'})}
                        onClick={() => {
                            setTab('rules')
                            setCategory('')
                            setIsOpen(false)
                            dispatch(setMenu(false))
                            window.scrollTo(0, 0)
                        }}
                    >
                        Правила пользования
                        </Link>
                </li>
                <li data-test-id={mobile ? 'burger-contract' : 'navigation-contract'}>
                    <Link
                        to='/contract'
                        className={cn(style.tab, {[style.activeTab]: tab === 'contract'})}
                        onClick={() => {
                            setTab('contract')
                            setCategory('')
                            setIsOpen(false)
                            dispatch(setMenu(false))
                            window.scrollTo(0, 0)
                        }}
                    >
                        Договор оферты
                        </Link>
                </li>
            </ul>
            {mobile && (
                <React.Fragment>
                    <div className={style.separator} />
                    <ul className={style.tabs}>
                        <li className={style.tab}>Профиль</li>
                        <li className={style.tab}>Выход</li>
                    </ul>
                </React.Fragment>
            )}
        </aside>
    )
}

export {AsideNav}