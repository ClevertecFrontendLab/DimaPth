import React, { FC } from 'react';
import style from './highlight.module.css';

interface IHighlight {
    text: string;
    search: string;
}

export const Highlight: FC<IHighlight> = ({text, search}) => {
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map(part => (regex.test(part)) && search 
                ? <span key={part} className={style.colored} data-test-id='highlight-matches'>{part}</span> 
                : part
            )}
        </span>
    )
}
