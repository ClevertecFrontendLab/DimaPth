import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import {ReactComponent as HideIcon} from '../../assets/hide-icon.svg';
import {ReactComponent as ShowIcon} from '../../assets/show-icon.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useFetchCategoriesQuery } from '../../redux/books-api';
import { setCategory, setMenu } from '../../redux/slices/menu-slice';

import style from './aside-nav.module.css';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';

interface AsideNavProps {
    mobile?: boolean;
}

const AsideNav: FC<AsideNavProps> = ({mobile}) => {
    const [tab, setTab] = useState('books');
    const [isOpen, setIsOpen] = useState(true);

    const {data, isError, isLoading, isSuccess} = useFetchCategoriesQuery();

    const {isMenuOpen, category} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch();

    return (
        <React.Fragment>
        {isLoading && <Loader />}
        <aside 
            className={cn(style.aside,
                {[style.hidden]: !isMenuOpen,
                [style.mobile]: mobile})
            }
            onClick={(e) => e.stopPropagation()}
            aria-hidden='true'
            data-test-id={mobile && 'burger-navigation'}
        >   
            {isError && <Error />}
                <ul className={style.tabs}>
                <li>
                    <button 
                        type='button'
                        className={cn(style.tab, {[style.activeTab]: tab === 'books'})} 
                        onClick={() => {
                            setTab('books')
                            dispatch(setCategory('all'))
                            setIsOpen(!isOpen)
                        }}
                        data-test-id={mobile ? 'burger-showcase': 'navigation-showcase'}
                    >
                        <span>Витрина книг</span>
                        {isOpen ? <HideIcon /> : <ShowIcon />}
                    </button>
                    {isSuccess && 
                    <ul className={cn(style.categories, {[style.hidden]: !isOpen})}>
                        <li 
                            className={cn({[style.active]: category === 'Все книги'})}
                            data-test-id={mobile? 'burger-books' : 'navigation-books'}
                        >
                            <Link 
                                to='/books/all'
                                onClick={() => {
                                    dispatch(setCategory('Все книги'))
                                    dispatch(setMenu(false))
                                }}
                                >
                                <span className={style.category}>Все книги</span>
                                &nbsp;
                                <span className={style.count}>140</span>
                            </Link>
                        </li>
                        {data.map(item => (
                            <li 
                                key={item.id}
                                className={cn({[style.active]: category === item.name})} 
                                >
                                <Link 
                                    to={`/books/${item.path}`} 
                                    onClick={() => {
                                        dispatch(setCategory(item.name))
                                        dispatch(setMenu(false))
                                    }}
                                >
                                    <span className={style.category}>{item.name}</span>
                                    &nbsp;
                                    <span className={style.count}>15</span>
                                </Link>
                            </li>
                        ))}
                    </ul>}   
                </li>
                <li data-test-id={mobile ? 'burger-terms' : 'navigation-terms'}>
                    <Link
                        to='/rules'
                        className={cn(style.tab, {[style.activeTab]: tab === 'rules'})}
                        onClick={() => {
                            setTab('rules')
                            dispatch(setCategory(''))
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
                            dispatch(setCategory(''))
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
        </React.Fragment>
    )
}

export {AsideNav}