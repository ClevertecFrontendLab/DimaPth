import { FC } from 'react';
import cn from 'classnames';

import style from './button.module.css';

interface ButtonProps {
    children: React.ReactNode | string;
    size?: 'large' | 'small';
}

export const Button: FC<ButtonProps> = ({children, size = 'small'}) =>(
    <button className={cn(style.primary, {[style.large]: size === 'large'})} type='button'>{children}</button>
)