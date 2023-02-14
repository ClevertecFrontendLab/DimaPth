import {FC, useState} from 'react'
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Thumbs, type Swiper as SwiperType } from 'swiper';

import NoImageBig from '../../assets/no-image-big.jpg';

import './style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import style from './slider.module.css';

interface SliderProps {
    img: any,
}

export const Slider: FC<SliderProps> = ({img}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const pagination = {
        clickable: true,
    }

    return (
    <div className={style.wrap}>
        <Swiper
            spaceBetween={30}
            pagination={{clickable: true}}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
            modules={[FreeMode, Thumbs, Pagination]}
            className={style.mySwiper}
            data-test-id='slide-big'
        >
            {img 
                ? (img.map((image: string) => <SwiperSlide><img src={image} alt="book"/></SwiperSlide>)) 
                : <SwiperSlide><img src={NoImageBig} alt="book"/></SwiperSlide>}
        </Swiper>
        {img.length > 1 && (
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={30}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className={style.mySwiper2}
        >
            {img.map((image: string) => <SwiperSlide data-test-id='slide-mini'><img src={image} alt="book"/></SwiperSlide>)}
        </Swiper>
        )}
    </div>
    )
}
