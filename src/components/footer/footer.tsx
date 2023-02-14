import { FC } from 'react';

import FacebookIcon from '../../assets/icon-facebook.svg'
import InstagramIcon from '../../assets/icon-instagram.svg'
import VkIcon from '../../assets/icon-vk.svg'
import LinkedInIcon from '../../assets/icon-linkedin.svg'

import style from './footer.module.css';

const Footer: FC = () => (
    <footer className={style.footer}>
        <span>© 2020-{new Date().getFullYear()} Cleverland. Все права защищены.</span>
        <div className={style.social}>
            <a href="#"><img src={FacebookIcon} alt="f" /></a>
            <a href="#"><img src={InstagramIcon} alt="in" /></a>
            <a href="#"><img src={VkIcon} alt="vk" /></a>
            <a href="#"><img src={LinkedInIcon} alt="in" /></a>
        </div>
    </footer>
)

export {Footer}