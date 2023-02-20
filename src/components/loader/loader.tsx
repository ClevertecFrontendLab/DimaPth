import { FC } from 'react';
import {ReactComponent as LoaderIcon} from '../../assets/loader.svg';

import style from './loader.module.css';

export const Loader: FC = () => (
    <div className={style.container} data-test-id='loader'>
        <div className={style.loader}>
            <LoaderIcon/>
        </div>
    </div>
)
