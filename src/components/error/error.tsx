import { FC, useState } from 'react';
import cn from 'classnames';

import {ReactComponent as ErrorIcon} from '../../assets/error-icon.svg';
import {ReactComponent as CloseIcon} from '../../assets/close-err-icon.svg';

import style from './error.module.css';

export const Error: FC = () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={cn(style.error, {[style.hidden]: !isOpen})} data-test-id='error'> 
            <div className={style.content}>
                <ErrorIcon/> Что-то пошло не так. Обновите страницу через некоторое время.
            </div>
            <button className={style.closeBtn} type='button' onClick={() => setIsOpen(false)} >
                <CloseIcon width='100%' height='100%'/>
            </button>
        </div>
    )
}