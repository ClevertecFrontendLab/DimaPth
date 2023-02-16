import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {ReactComponent as ShowIcon} from '../../assets/show-icon.svg';
import {ReactComponent as HideIcon} from '../../assets/hide-icon.svg';

import style from './aside-nav.module.css';
import { setMenu } from '../../redux/slices/menu-slice';
import { useFetchCategoriesQuery } from '../../redux/books-api';

interface AsideNavProps {
    mobile?: boolean;
}

const AsideNav: FC<AsideNavProps> = ({mobile}) => {
    const [tab, setTab] = useState('books');
    const [isOpen, setIsOpen] = useState(true);
    const [category, setCategory] = useState('all')

    const {data, isError, isSuccess} = useFetchCategoriesQuery();

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
                        {isError && <h1>error</h1>}
                        {isSuccess && data.map(item => (
                            <li 
                                key={item.id}
                                className={cn({[style.active]: category === item.path})} 
                                >
                                <Link 
                                    to={`/books/${item.path}`} 
                                    onClick={() => {
                                        setCategory(item.path)
                                        dispatch(setMenu(false))
                                    }}
                                >
                                    <span className={style.category}>{item.name}</span>
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