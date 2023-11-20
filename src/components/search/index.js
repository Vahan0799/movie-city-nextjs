import React, {useState, useEffect} from 'react';
import {useTranslation} from 'next-i18next';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {AnimatePresence, motion} from 'framer-motion';
import Input from '@/components/UI/Input';
import NextLink from '@/components/UI/NextLink';
import NextImage from '@/components/UI/next-image';
import Button from '@/components/UI/Button';
import {useCurrentLocale} from '@/hooks/useLocale';
import {getSearchResults} from '@/services/global';
import {setSearchResults} from '@/redux/slices/globalSlice';
import {IMAGE_PATH} from '@/constants';
import {filterFetchResults, dispatch} from '@/helpers';
import {fadeInVariants} from '@/helpers/moduleHelpers';
import {lowercaseString, extractYear} from '@/helpers/stringHelpers';
import styles from './index.module.scss';

const Index = () => {
    const [searched, setSearched] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const {search} = useSelector(({global}) => global);
    const router = useRouter();

    const locale = useCurrentLocale();
    const {t} = useTranslation();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getSearchResults(search.query, locale, 1);
                const filtered = response.results.filter(item => filterFetchResults(item));

                const sortedResults = filtered.sort((a, b) => {
                    if (a.title && !b.title) {
                        return -1;
                    } else if (!a.title && b.title) {
                        return 1;
                    } else {
                        return b.vote_average - a.vote_average;
                    }
                });

                dispatch(setSearchResults({
                    ...search,
                    results: sortedResults.slice(0, 3)
                }));
                setSearched(true);
                setEmpty(sortedResults.length === 0);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        const shouldFetchResults = (search.query && search.query !== router.query.query) || search.results === null;

        if (shouldFetchResults) {
            fetchResults();
        } else {
            setEmpty(false);
            setSearched(false);
            dispatch(setSearchResults({
                results: null,
                query: ''
            }))
        }
    }, [search.query, locale, router.pathname]);

    useEffect(() => {
        setEmpty(false);
        setSearched(false);
        dispatch(setSearchResults({
            results: null,
            query: ''
        }))
    },[router.asPath, router.pathname])


    const handleSearchQuery = e => dispatch(setSearchResults({
        ...search,
        query: e.target.value
    }))

    const isSearchQueryEmpty = search.query.trim().length === 0;

    const removeSearchQuery = () => dispatch(setSearchResults({
        ...search,
        query: ''
    }));

    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
        },

        closed: {
            y: 50,
            opacity: 0
        }
    };

    return (
        <div className={styles.search}>
            <form
                autoComplete="off"
                className={styles.searchForm}
                onSubmit={e => {
                    e.preventDefault();
                    return false;
                }}
            >
                <div className={styles.searchContainer}>
                    <Input
                        debounce
                        debounceTimeout={500}
                        minLength={2}
                        id="search"
                        placeholder={`${t('global.search')}...`}
                        value={search.query}
                        onChange={handleSearchQuery}
                    />

                    {(searched && search.query) &&
                        <Button type="button" className={styles.searchClean} onClick={removeSearchQuery}/>
                    }
                    <AnimatePresence>
                        {(searched && search.query) &&
                            <motion.ul
                                className={styles.searchSmartResults}
                                variants={fadeInVariants}
                                initial="hide"
                                animate="show"
                            >
                                {search.results?.map((result, i) => {
                                    return (
                                        <motion.li
                                            key={result.id}
                                            variants={itemVariants}
                                            initial="closed"
                                            animate="open"
                                            transition={{delay: i * 0.2, y: {stiffness: 1000}}}
                                        >
                                            <NextLink
                                                className={styles.searchResult}
                                                href={`/media/${result.media_type}/${result.id}-${lowercaseString(result.original_title)}`}>
                                                <NextImage
                                                    wrapperClass="!w-[26%]"
                                                    src={IMAGE_PATH(result.poster_path)} width={75}
                                                    alt={result.title || result.name}
                                                />
                                                <div className="p-2 flex flex-col w-[74%]">
                                                    <span>{result.title || result.name}</span>
                                                    <span>{extractYear(result.release_date || result.first_air_date)}</span>
                                                </div>
                                            </NextLink>
                                        </motion.li>
                                    )
                                })}
                                <li className={styles.searchResponse}>
                                    {!isEmpty && <NextLink
                                        href={{
                                            pathname: '/search',
                                            query: {query: search.query},
                                        }}
                                    >
                                        All Results
                                    </NextLink>}
                                    {isEmpty && <p>{t('noResults')}</p>}
                                </li>
                            </motion.ul>
                        }
                    </AnimatePresence>
                </div>
                <NextLink
                    href={{
                        pathname: '/search',
                        query: {query: search.query},
                    }}
                    className={isSearchQueryEmpty ? 'disabled' : ''}
                >
                    <Button
                        design="primary"
                        type={isSearchQueryEmpty ? 'button' : 'submit'}
                    >
                        {t('global.search')}
                    </Button>
                </NextLink>
            </form>
        </div>
    )
};

export default Index;