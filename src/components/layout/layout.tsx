import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AsideNav } from '../aside/aside-nav';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import style from './layout.module.css';

export const Layout: FC = () => (
    <div className={style.container}>
        <Header />
        <div className={style.main}>
            <AsideNav />
            <Outlet />
        </div>
        <Footer />
    </div>
)