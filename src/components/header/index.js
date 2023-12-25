import React, { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {useCurrentLocale, usePreviousLocale} from '@/hooks/useLocale';
import useScrollDirection from '@/hooks/useScrollDirection';
import useClickOutSide from '@/hooks/useClickOutSide';
import NextLink from '@/components/UI/NextLink';
import Button from '@/components/UI/Button';
import LanguageSwitch from '@/components/language-switch';
import ThemeSwitch from '@/components/theme-switch';
import Search from '@/components/search';
import {getMovieGenres, getTvGenres} from '@/services/genre';
import {setMovieGenres, setTvGenres} from '@/redux/slices/genreSlice';
import {dispatch} from '@/helpers';
import styles from './index.module.scss';

const Index = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [showMovieGenres, setShowMovieGenres] = useState(false);
    const [showTvGenres, setShowTvGenres] = useState(false);
    const mobileMenuTrigger = useRef(null);
    const mobileMenuContainer = useRef(null);

    const {isDown} = useScrollDirection();
    const locale = useCurrentLocale();
    const prevLocale = usePreviousLocale(locale);
    const {t} = useTranslation();

    const {movieGenreList, tvGenreList} = useSelector(state => state.genre);
    const {search} = useSelector(({global}) => global);

    const slideRightVariants = {
        toIn: {
            opacity: 1,
            translateX: 0
        },

        toOut: {
            opacity: 0,
            translateX: '50px'
        }
    };

    const openMobileMenu = () => setNavOpen(true);

    const closeMobileMenu = () => {
        setNavOpen(false);
        setShowTvGenres(false);
        setShowMovieGenres(false);
    };

    const toggleMovieGenreDropdown = () => {
        setShowTvGenres(false);
        setShowMovieGenres(!showMovieGenres)
    };

    const toggleTvGenreDropdown = () => {
        setShowMovieGenres(false);
        setShowTvGenres(!showTvGenres)
    };



    useClickOutSide(mobileMenuContainer, closeMobileMenu, mobileMenuTrigger);

    useEffect(() => {
        if ((movieGenreList.length === 0 && tvGenreList.length === 0) || prevLocale !== locale) {
            Promise.all([getMovieGenres(locale), getTvGenres(locale)])
                .then(([movieGenres, tvGenres]) => {
                    dispatch(setMovieGenres(movieGenres));
                    dispatch(setTvGenres(tvGenres));
                });
        }

    }, [movieGenreList, tvGenreList, locale]);

    return (
        <header className={classNames([styles.header, (isDown && ((!showMovieGenres && !showTvGenres) && (!search.isQuery && !search.searched))) ? [styles.headerDown, 'header-is-hidden'] : ''])}>
            <div className={classNames(styles.headerInner, 'main-container')}>
                <nav className={styles.nav}>
                    <NextLink href="/" className="max-w-[55px] lg:max-w-[120px]">
                        <motion.svg
                            initial="toOut"
                            animate="toIn"
                            exit="toOut"
                            transition={{type: 'spring', stiffness: 50}}
                            variants={slideRightVariants}
                            width="80" height="80" viewBox="0 0 241 214" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M232.198 91.5262L221.896 85.5311L240.575 77.704L239.168 70.9993L226.802 60.4966L235.812 56.745L234.399 50.0445L226.965 42.6152L232.703 40.2089L230.929 31.3701L202.824 0L176.207 10.9019L179.675 26.7312L165.765 15.3289L151.547 21.3568L153.109 28.0041L146.567 23.2955L133.616 28.4785L134.177 37.3187L127.125 31.448L112.099 37.7029L116.719 50.1907L104.454 44.0671C100.948 42.5742 94.9096 43.3835 90.9748 45.4452C86.0831 48.0087 81.6233 50.4314 79.377 58.7862L68.9468 54.8556L42.0241 66.1376L42.7296 76.1399L27.8656 71.9385L0.294922 83.6635L17.8277 168.694L77.6133 167.97C79.9977 180.191 82.5024 191.838 84.4534 199.996C85.934 206.188 93.9977 216.095 105.899 213.199C116.179 210.698 143.021 204.345 152.387 202.125C154.575 201.859 156.847 201.218 159.119 200.265C171.192 195.214 176.067 186.703 173.464 174.316L171.75 166.113L177.597 165.968L187.136 161.972L186.132 157.161L197.793 157.508L207.335 153.512L205.463 144.625L223.37 146.807L232.909 142.819L229.488 126.551L232.198 91.5262ZM127.037 33.2828L126.855 33.1255L126.93 33.0968L127.037 33.2828Z" fill="rgb(var(--color-black))"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M127.74 166.258L109.958 173.701L112.813 187.818C113.507 191.205 113.201 194.75 109.317 196.369C105.65 197.897 104.034 195.167 103.326 191.793L93.5643 145.244C92.8547 141.86 93.1623 138.322 96.8182 136.773C100.705 135.16 102.324 137.883 103.04 141.273L105.429 152.679L123.313 145.188L121.411 136.11C117.655 118.19 107.08 118.051 94.0373 123.511C90.4075 125.029 87.0032 127.001 84.1376 129.534L68.7348 56.1434L42.9908 66.9237L47.8046 128.977L47.5818 129.062L27.6947 73.3276L1.39551 84.328L18.7847 167.201L33.1156 161.198L18.2775 90.4447L18.4853 90.349L43.6702 156.782L59.4052 150.195L54.9017 75.1131L55.1136 75.0215L69.953 145.791L76.268 143.151C75.4669 147.143 75.4737 151.753 76.603 157.152L84.4999 194.854C88.4879 213.828 100.259 214.606 112.105 209.637C127.197 203.321 133.28 192.679 130.03 177.195L127.74 166.258ZM123.6 111.508L135.198 166.754L147.125 161.761L135.537 106.527L123.6 111.508ZM170.868 100.848L169.105 92.4695L140.516 104.435L142.272 112.809L150.605 109.327L160.44 156.19L172.367 151.197L162.522 104.337L170.868 100.848ZM202.854 78.3506L191.228 83.2055L191.447 107.008L191.325 107.063L182.323 86.9393L170.694 91.8188L188.134 122.485L192.406 142.818L204.328 137.83L200.056 117.504L202.854 78.3506Z" fill="rgb(var(--color-primary-blue))"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M85.8957 93.6358C88.5562 106.281 96.475 106.77 104.383 103.466C112.28 100.157 118.729 93.6536 116.069 81.0044L110.793 55.8714C108.147 43.2263 100.228 42.7369 92.3365 46.0414C84.441 49.3527 77.977 55.8495 80.6334 68.4946L85.8957 93.6358ZM94.189 54.8911C96.6964 53.8425 97.7834 55.6622 98.255 57.9113L104.763 88.9491C105.241 91.194 105.034 93.5606 102.514 94.6161C100.006 95.662 98.925 93.845 98.4478 91.5932L91.9304 60.554C91.4738 58.3105 91.6789 55.9411 94.189 54.8911ZM148.939 83.6225L145.906 24.8049L134.775 29.4683L138.53 74.2204L138.389 74.2901L126.58 32.8836L113.796 38.247L133.291 90.1782L148.939 83.6225ZM176.416 72.1245L164.84 16.8793L152.904 21.8695L164.501 77.112L176.416 72.1245ZM213.909 56.4265L212.144 48.0566L199.367 53.4077L195.597 35.406L207.939 30.2299L206.187 21.8586L193.839 27.0279L191.295 14.9229L204.085 9.56759L202.318 1.18811L177.617 11.5309L189.202 66.7733L213.909 56.4265Z" fill="rgb(var(--color-primary-blue))"/>
                        </motion.svg>
                    </NextLink>
                    <div className={classNames([styles.navInner, navOpen && styles.navOpen])}>
                        <div className={styles.navContainer} ref={mobileMenuContainer}>
                            <div className={styles.navItems}>
                                <LanguageSwitch/>
                                <Search/>
                                <ul className={styles.navList}>
                                    <li className={classNames([
                                        styles.navListItem,
                                        showMovieGenres && styles.navListItemOpen
                                    ])}
                                        onClick={toggleMovieGenreDropdown}>
                                        <p className="gradient-text !absolute blur-[4px]">
                                            {t('global.genres_movies')}
                                        </p>
                                        <p className="gradient-text">
                                            {t('global.genres_movies')}
                                        </p>

                                        <div className={classNames([
                                            styles.navDropdown,
                                            showMovieGenres && styles.navDropdownActive
                                        ])}>
                                            <ul className={styles.navDropdownBody}>
                                                {movieGenreList.map(genre => <li key={genre.id}>
                                                    <NextLink href={`/genre/movie-list/${genre.id}?name=${encodeURIComponent(genre.name)}`}>
                                                        {genre.name}
                                                    </NextLink>
                                                </li>)}
                                            </ul>
                                        </div>
                                    </li>
                                    <li className={classNames([
                                        styles.navListItem,
                                        showTvGenres && styles.navListItemOpen
                                    ])}
                                        onClick={toggleTvGenreDropdown}>
                                        <p className="gradient-text !absolute blur-[4px]">
                                            {t('global.genres_tv')}
                                        </p>
                                        <p className="gradient-text">
                                            {t('global.genres_tv')}
                                        </p>

                                        <div className={classNames([
                                            styles.navDropdown,
                                            showTvGenres && styles.navDropdownActive
                                        ])}>
                                            <ul className={styles.navDropdownBody}>
                                                {tvGenreList.map(genre => <li key={genre.id}>
                                                    <NextLink href={`/genre/tv-list/${genre.id}?name=${encodeURIComponent(genre.name)}`}>
                                                        {genre.name}
                                                    </NextLink>
                                                </li>)}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <Button
                                    regular
                                    className={styles.navClose}
                                    onClick={closeMobileMenu}
                                >
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.5" d="M20.0002 36.6667C12.1434 36.6667 8.21505 36.6667 5.77428 34.2259C3.3335 31.7852 3.3335 27.8567 3.3335 20C3.3335 12.1433 3.3335 8.21492 5.77428 5.77416C8.21505 3.33337 12.1434 3.33337 20.0002 3.33337C27.8568 3.33337 31.7853 3.33337 34.226 5.77416C36.6668 8.21492 36.6668 12.1433 36.6668 20C36.6668 27.8567 36.6668 31.7852 34.226 34.2259C31.7853 36.6667 27.8568 36.6667 20.0002 36.6667Z" fill="rgb(var(--color-primary-blue))"/>
                                        <path d="M14.9496 14.9495C15.4378 14.4613 16.2292 14.4613 16.7173 14.9495L20.0002 18.2324L23.283 14.9495C23.7712 14.4614 24.5625 14.4614 25.0507 14.9495C25.5388 15.4377 25.5388 16.2291 25.0507 16.7172L21.768 20L25.0507 23.2829C25.5388 23.7709 25.5388 24.5624 25.0507 25.0505C24.5625 25.5387 23.771 25.5387 23.2828 25.0505L20.0002 21.7679L16.7175 25.0505C16.2293 25.5387 15.4378 25.5387 14.9496 25.0505C14.4615 24.5624 14.4615 23.771 14.9496 23.2829L18.2325 20L14.9496 16.7172C14.4615 16.2291 14.4615 15.4376 14.9496 14.9495Z" fill="rgb(var(--color-primary-blue))"/>
                                    </svg>
                                </Button>
                            </div>
                            <ThemeSwitch/>
                        </div>
                    </div>
                </nav>
                <button
                    className={styles.navToggler}
                    onClick={openMobileMenu}
                    ref={mobileMenuTrigger}
                >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="rgb(var(--color-primary-blue))" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.9123 4.2859C24.9228 4.1935 24.928 4.10021 24.928 4.00635C24.928 2.64404 23.8197 1.53574 22.4574 1.53574C22.0561 1.53574 21.6696 1.63061 21.3234 1.80984C20.7649 0.945176 19.7968 0.400312 18.7344 0.400312C18.0656 0.400312 17.431 0.612422 16.9084 0.998789C16.4504 0.386074 15.719 0 14.9263 0C14.1642 0 13.4558 0.355547 12.9942 0.931992C12.4887 0.588867 11.8868 0.400254 11.2648 0.400254C10.2027 0.400254 9.23477 0.945293 8.67637 1.81002C8.3299 1.63072 7.94348 1.53568 7.54252 1.53568C6.18021 1.53568 5.07186 2.64398 5.07186 4.00629C5.07186 4.10021 5.07701 4.1935 5.08744 4.28572C3.81842 4.6749 2.9248 5.84461 2.9248 7.22883C2.9248 7.92123 3.15637 8.58656 3.58012 9.12732L6.09988 29.5003C6.13522 29.7857 6.37762 30 6.6652 30H23.3342C23.6218 30 23.8643 29.7857 23.8996 29.5003L26.4193 9.12727C26.8434 8.58674 27.0752 7.92152 27.0752 7.22883C27.0752 5.84479 26.1815 4.67514 24.9123 4.2859ZM7.16869 28.8608L4.77332 9.49365H7.39621L8.95586 28.8608H7.16869ZM10.0988 28.8608L8.53914 9.49365H11.789L11.9743 15.6224C10.9683 16.4799 10.3286 17.7548 10.3286 19.1771C10.3286 20.701 11.0622 22.0566 12.1947 22.9097L12.3743 28.8607H10.0988V28.8608ZM16.4851 28.8608H13.5142L13.3538 23.548C13.8661 23.7415 14.4205 23.8483 14.9997 23.8483C15.5791 23.8483 16.1337 23.7415 16.646 23.5478L16.4851 28.8608ZM14.9997 22.7091C13.0523 22.7091 11.4679 21.1247 11.4679 19.1772C11.4679 17.2297 13.0523 15.6454 14.9997 15.6454C16.9472 15.6454 18.5316 17.2297 18.5316 19.1772C18.5316 21.1247 16.9472 22.7091 14.9997 22.7091ZM12.9289 9.49365H17.0712L16.9073 14.9149C16.3243 14.6531 15.6791 14.5061 14.9998 14.5061C14.3206 14.5061 13.6755 14.653 13.0927 14.9148L12.9289 9.49365ZM17.6248 28.8608L17.805 22.9095C18.9374 22.0563 19.6709 20.7009 19.6709 19.1772C19.6709 17.7551 19.0313 16.4803 18.0257 15.6229L18.2109 9.49365H21.4603L19.9006 28.8608H17.6248ZM22.8307 28.8608H21.0435L22.6032 9.49365H25.2262L22.8307 28.8608ZM25.574 8.35441H4.42562C4.19207 8.02699 4.06404 7.6357 4.06404 7.22883C4.06404 6.33645 4.65303 5.5858 5.48154 5.35834C5.78248 5.78883 6.32131 6.24246 7.11355 6.24246C7.19629 6.24246 7.28172 6.23754 7.36996 6.22711C7.66797 6.19189 7.90721 5.94404 7.89865 5.64404C7.88875 5.30021 7.586 5.04926 7.25383 5.0935C6.61469 5.17893 6.35951 4.63482 6.3141 4.52238C6.31334 4.52051 6.3124 4.51875 6.31164 4.51682C6.31094 4.51523 6.31064 4.51348 6.30994 4.51189C6.2643 4.40057 6.23436 4.28426 6.22029 4.16473C6.1327 3.41748 6.69789 2.72936 7.44848 2.67803C7.83637 2.65154 8.20609 2.78982 8.48008 3.06082C8.58666 3.16623 8.72904 3.23244 8.87887 3.23467C9.13211 3.23842 9.34967 3.07928 9.42842 2.85006C9.69783 2.06613 10.4358 1.53937 11.2646 1.53937C11.8173 1.53937 12.3447 1.7758 12.7122 2.1883C12.8136 2.30197 12.9567 2.37445 13.1089 2.38248C13.3651 2.39602 13.5907 2.24115 13.6758 2.01088C13.8682 1.48957 14.3708 1.13924 14.9262 1.13924C15.5091 1.13924 16.0306 1.5266 16.2002 2.08336C16.2497 2.24561 16.3577 2.38729 16.5121 2.45766C16.7603 2.57068 17.042 2.49527 17.2015 2.29055C17.5732 1.8133 18.1319 1.53955 18.7345 1.53955C19.468 1.53955 20.1296 1.95205 20.4593 2.58961C20.3544 2.75602 20.2385 2.98107 20.1641 3.25084C19.9495 4.03025 20.1842 4.81242 20.8251 5.45338C20.9363 5.56465 21.0821 5.62025 21.2279 5.62025C21.3711 5.62025 21.5143 5.56658 21.6248 5.45918C21.8538 5.23664 21.8345 4.85707 21.6115 4.62844C21.2821 4.2907 21.1652 3.94916 21.2543 3.58488C21.2639 3.54545 21.2755 3.50748 21.2884 3.47127C21.3973 3.16453 21.631 2.91252 21.9297 2.78332C22.1363 2.69402 22.3656 2.65787 22.6008 2.6823C23.271 2.75197 23.7897 3.33428 23.7889 4.00799C23.7886 4.18078 23.7555 4.34953 23.6903 4.50949C23.6392 4.63482 23.6326 4.7765 23.6751 4.90506C23.7481 5.12613 23.9435 5.27566 24.1669 5.29529C25.159 5.38225 25.9361 6.2315 25.9361 7.22889C25.936 7.63594 25.8078 8.02723 25.574 8.35441Z" fill="rgb(var(--color-primary-blue))"/>
                        <path d="M15.308 3.65281C14.8695 3.65281 14.4503 3.76977 14.0848 3.9892C13.7068 3.65258 13.2126 3.45758 12.6961 3.45758C11.5443 3.45758 10.6074 4.39449 10.6074 5.54621C10.6074 6.69793 11.5443 7.63485 12.6959 7.63485C13.0105 7.63485 13.2655 7.37979 13.2655 7.06526C13.2655 6.75067 13.0105 6.49567 12.6959 6.49567C12.1724 6.49567 11.7465 6.06981 11.7465 5.54627C11.7465 5.02274 12.1724 4.59688 12.6959 4.59688C13.0342 4.59688 13.3397 4.77207 13.513 5.06557C13.6034 5.21862 13.7601 5.32069 13.9366 5.34155C14.1133 5.36252 14.2893 5.29971 14.4129 5.17203C14.65 4.92699 14.9679 4.79211 15.308 4.79211C15.995 4.79211 16.5539 5.35104 16.5539 6.03817C16.5539 6.35276 16.8089 6.60782 17.1235 6.60782C17.4382 6.60782 17.6931 6.35276 17.6931 6.03817C17.6932 4.72285 16.6232 3.65281 15.308 3.65281Z" fill="rgb(var(--color-primary-blue))"/>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Index;
