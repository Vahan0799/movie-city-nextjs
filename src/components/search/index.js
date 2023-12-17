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
import {setSearchStates} from '@/redux/slices/globalSlice';
import {IMAGE_PATH} from '@/constants';
import {filterFetchResults, dispatch} from '@/helpers';
import {fadeInVariants} from '@/helpers/moduleHelpers';
import {lowercaseString, extractYear} from '@/helpers/stringHelpers';
import styles from './index.module.scss';

const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isEmpty, setEmpty] = useState(false);
    const {search} = useSelector(({global}) => global);

    const locale = useCurrentLocale();
    const router = useRouter();
    const {t} = useTranslation();

    useEffect(() => {
        if (searchQuery) {
            getSearchResults(searchQuery, locale, 1)
                .then(response => {
                    const filtered = response.results.filter(item => filterFetchResults(item));

                    const sortedResults = filtered.sort((a, b) => {
                        return b.vote_average - a.vote_average;
                    });

                    setSearchResults(sortedResults.slice(0, 4))
                    dispatch(setSearchStates({
                        isQuery: true,
                        searched: true
                    }))
                    setEmpty(sortedResults.length === 0);
                })
        }
    }, [searchQuery, locale]);

    const handleSearchQuery = e => setSearchQuery(e.target.value);

    const isSearchQueryEmpty = searchQuery.trim().length === 0;

    const removeSearchQuery = () => {
        setSearchQuery('');
        setSearchResults([]);
        dispatch(setSearchStates({
            isQuery: false,
            searched: false
        }));
    };

    useEffect(() => {
        removeSearchQuery()
    },[router.pathname, router.asPath]);

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
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />

                    {(search.searched && searchQuery) &&
                        <Button type="button" className={styles.searchClean} onClick={removeSearchQuery}/>
                    }
                    <AnimatePresence>
                        {(search.searched && searchQuery) &&
                            <motion.div
                                className={styles.searchSmartResults}
                                variants={fadeInVariants}
                                initial="hide"
                                animate="show"
                            >
                                {searchResults.length > 0 && <ul>
                                    {searchResults?.map((result, i) => {
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
                                                        wrapperClass="!w-[16%]"
                                                        src={IMAGE_PATH(result.poster_path)} width={45} height={68}
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
                                </ul>}
                                <p className={styles.searchResponse}>
                                    {!isEmpty && <NextLink
                                        href={{
                                            pathname: '/search',
                                            query: {query: searchQuery},
                                        }}
                                    >
                                        {t('global.search_results')}
                                    </NextLink>}
                                    {isEmpty && <p>{t('noResults')}</p>}
                                </p>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <NextLink
                    href={{
                        pathname: '/search',
                        query: {query: searchQuery},
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
