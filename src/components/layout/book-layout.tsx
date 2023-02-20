import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import style from './layout.module.css';

export const BookLayout: FC = () => (
    <div className={style.container}>
        <Header />
        <div className={style.main}>
            <Outlet />
        </div>
        <Footer />
    </div>
)