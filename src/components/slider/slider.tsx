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
    images: Array<{url: string | null}>
}

export const Slider: FC<SliderProps> = ({images}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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
            {images !== null
                ? (images.map((img) => 
                    <SwiperSlide key={img.url}>
                        <img src={`https://strapi.cleverland.by${img.url}`} alt="book"/>
                    </SwiperSlide>
                )) 
                : <SwiperSlide><img src={NoImageBig} alt="book"/></SwiperSlide>}
        </Swiper>
        {images.length > 1 && (
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={30}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className={style.mySwiper2}
        >
            {images.map((img) => 
                <SwiperSlide data-test-id='slide-mini' key={img.url}>
                    <img src={`https://strapi.cleverland.by${img.url}`} alt="book"/>
                </SwiperSlide>
            )}
        </Swiper>
        )}
    </div>
    )
}
