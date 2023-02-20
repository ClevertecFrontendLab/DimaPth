import { FC } from 'react'
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setMenu } from '../../redux/slices/menu-slice';

import style from './burger.module.css';

export const Burger: FC = () => {
    const {isMenuOpen} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch();

    const toogleMenu = () => {
        dispatch(setMenu(!isMenuOpen));
    }

    return (
        <button 
            type='button' 
            className={style.burger} 
            onClick={toogleMenu} 
            data-test-id='button-burger'
            >
            <div className={cn(style.burger_line, {[style.clicked]: isMenuOpen})}/>
            <div className={cn(style.burger_line, {[style.clicked]: isMenuOpen})}/>
            <div className={cn(style.burger_line, {[style.clicked]: isMenuOpen})}/>
        </button>
  )
}