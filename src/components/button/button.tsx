import { FC } from 'react';
import cn from 'classnames';

import style from './button.module.css';

interface ButtonProps {
    children: React.ReactNode | string;
    size?: 'large' | 'small';
    type?: 'submit' | 'button';
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, size = 'small', type = 'button', onClick}) =>(
    <button 
        onClick={onClick}
        className={cn(style.primary, {[style.large]: size === 'large'})} 
        type={type === 'submit' ? 'submit' : 'button'}
        >
        {children}
    </button>
)