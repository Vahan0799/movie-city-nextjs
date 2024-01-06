import React, { useEffect, useState } from 'react';
import {useMediaQuery} from 'react-responsive';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import classNames from 'classnames';
import Button from '@/components/UI/Button';
import MediaCard from '@/components/media-card';
import Skeleton from '@/components/media-card/skeleton';
import {dispatch} from '@/helpers';
import {useCurrentLocale, usePreviousLocale} from '@/hooks/useLocale';
import {getPopularMovies} from '@/services/global';
import { setPopularMovies } from '@/redux/slices/globalSlice';
import styles from './index.module.scss';

const Index = () => {
    const [isLoading, setLoading] = useState(true);
    const {popularMovies} = useSelector(state => state.global);
    const locale =  useCurrentLocale();
    const prevLocale = usePreviousLocale(locale);

    const swiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        loop: true,
        modules: [Navigation],
        navigation: {
            prevEl: '.popular-prev',
            nextEl: '.popular-next'
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            1024: {
                slidesPerView: 7,
                slidesPerGroup: 7
            }
        }
    };

    useEffect(() => {
        if (popularMovies.length === 0 || prevLocale !== locale) {
            getPopularMovies(locale)
                .then(response => {
                    dispatch(setPopularMovies(response));
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

    },[locale]);

    const SkeletonView = () => {
        const isMobile = useMediaQuery({maxWidth: 767.8});
        const isDesktop = useMediaQuery({minWidth: 992});

        if (isMobile) return <>
            {Array.from({length: 2}).map((_, index) => <Skeleton key={`skeleton-view-${index}`}/>)}
        </>

        if (!isMobile && !isDesktop) return <>
            {Array.from({length: 3}).map((_, index) => <Skeleton key={`skeleton-view-${index}`}/>)}
        </>

        if (isDesktop) return <>
            {Array.from({length: 7}).map((_, index) => <Skeleton key={`skeleton-view-${index}`}/>)}
        </>
    };

    return (
        <section className={styles.popularMovies}>
            <div className={classNames([styles.popularMoviesSlider, isLoading && styles.popularMoviesLoad])}>
                {isLoading ? <div><SkeletonView/></div> : <>
                    {popularMovies.length !== 0 &&
                        <Swiper {...swiperOptions}>
                            {popularMovies.map((item, key) =>
                                <SwiperSlide key={`popular-movie-${item.id}`}>
                                    <MediaCard media={item} delay={key} bordered/>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    }
                    <Button regular className="swiper-nav-prev popular-prev">
                        <span/>
                    </Button>
                    <Button regular className="swiper-nav-next popular-next">
                        <span/>
                    </Button>
                </>}
            </div>
        </section>
    )
};

export default Index;
