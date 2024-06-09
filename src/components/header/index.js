import React, { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import classNames from 'classnames';
import {useCurrentLocale, usePreviousLocale} from '@/hooks/useLocale';
import useScrollDirection from '@/hooks/useScrollDirection';
import useClickOutSide from '@/hooks/useClickOutSide';
import NextLink from '@/components/UI/NextLink';
import Button from '@/components/UI/Button';
import LanguageSwitch from '@/components/header/language-switch';
import ThemeSwitch from '@/components/header/theme-switch';
import Search from '@/components/header/search';
import HeaderLogo from '@/components/svg/header-logo';
import PopcornIcon from '@/components/svg/popcorn-icon';
import CloseIcon from '@/components/svg/close-icon';
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

    const classList = () => {
        return classNames([styles.header, (isDown && ((!showMovieGenres && !showTvGenres) &&
            (!search.isQuery && !search.searched))) ? [styles.headerDown, 'header-is-hidden'] : ''])
    };

    const openMobileMenu = () => setNavOpen(true);

    const closeMobileMenu = () => {
        setNavOpen(false);
        setShowTvGenres(false);
        setShowMovieGenres(false);
    };

    const toggleMovieGenreDropdown = () => {
        setShowTvGenres(false);
        setShowMovieGenres(!showMovieGenres);
    };

    const toggleTvGenreDropdown = () => {
        setShowMovieGenres(false);
        setShowTvGenres(!showTvGenres);
    };

    const genreDropdown = [
        {
            type: 'movie',
            state: showMovieGenres,
            handler: toggleMovieGenreDropdown,
            title: 'global.genres_movies',
            list: movieGenreList
        },
        {
            type: 'tv',
            state: showTvGenres,
            handler: toggleTvGenreDropdown,
            title: 'global.genres_tv',
            list: tvGenreList
        }
    ];

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
        <header className={classList()}>
            <div className={classNames(styles.headerInner, 'main-container')}>
                <nav className={styles.nav}>
                    <NextLink href="/" className="max-w-[55px] lg:max-w-[120px]">
                        <HeaderLogo/>
                    </NextLink>
                    <div className={classNames([styles.navInner, navOpen && styles.navOpen])}>
                        <div className={styles.navContainer} ref={mobileMenuContainer}>
                            <div className={styles.navItems}>
                                <LanguageSwitch/>
                                <Search/>
                                <ul className={styles.navList}>
                                    {genreDropdown.map((item, key) => {
                                        return (
                                            <li className={classNames([
                                                styles.navListItem,
                                                item.state && styles.navListItemOpen
                                            ])} key={key} onClick={item.handler}
                                            >
                                                <p className="gradient-text !absolute blur-[4px] cursor-pointer">
                                                    {t(item.title)}
                                                </p>
                                                <p className="gradient-text cursor-pointer">
                                                    {t(item.title)}
                                                </p>

                                                <div className={classNames([
                                                    styles.navDropdown, item.state && styles.navDropdownActive
                                                ])}>
                                                    <ul className={styles.navDropdownBody}>
                                                        {item.list.map(genre => <li key={genre.id}>
                                                            <NextLink href={`/genre/${item.type}-list/${genre.id}?name=${encodeURIComponent(genre.name)}`}>
                                                                {genre.name}
                                                            </NextLink>
                                                        </li>)}
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Button
                                    regular
                                    className={styles.navClose}
                                    onClick={closeMobileMenu}
                                >
                                   <CloseIcon/>
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
                    <PopcornIcon/>
                </button>
            </div>
        </header>
    )
}

export default Index;
