import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Avatar from '../../assets/avatar.png';
import Logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setMenu } from '../../redux/slices/menu-slice';
import { AsideNav } from '../aside/aside-nav';
import { Burger } from '../burger/burger';

import style from './header.module.css';

export const Header: FC = () => {
    const {isMenuOpen} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch();

    const toogleMenu = () => {
        dispatch(setMenu(false));
    }
    
    return (
        <header className={style.header}>
            <div className={style.wrap}>
                <Burger />
                <Link to='/'><img className={style.logo} src={Logo} alt="logo" width={165} height={40}/></Link>
                <h1 className={style.title}>Библиотека</h1>
            </div>
            <div className={style.user}>
                    <span className={style.name}>Привет, Иван!</span>
                    <img src={Avatar} alt="avatar" width={58} height={58}/>
            </div>
            <div 
                className={cn(style.asideWrap, {[style.pointerEvents]: isMenuOpen})} 
                onClick={toogleMenu}
                aria-hidden='true'
            >
                <AsideNav mobile={true}/>
            </div>
        </header>
    )
}