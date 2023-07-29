import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import PopularMovies from '@/components/popular-movies';
import TopMovies from '@/components/top-movies';
import styles from './index.module.scss';
import classNames from 'classnames';
import {IMAGE_PATH, BACKDROP_PATH} from '@/constants';

const Index = props => {
    const {
        title,
        description,
        children,
        image,
        backgroundPoster,
        secondary
    } = props;

    const router = useRouter();

    const dynamicBackground = {
        backgroundImage: `url(${BACKDROP_PATH(backgroundPoster)})`
    };

    return (
        <>
            <Head>
                <meta name="title" content={title}/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={router.asPath}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={IMAGE_PATH(image)}/>
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:site" content="@"/>
                <meta property="twitter:url" content={router.asPath}/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description" content={description}/>
                <meta property="twitter:image" content={IMAGE_PATH(image)}/>
                <link rel="canonical" href={router.asPath}/>
                <title>{title || 'Movie City'}</title>
            </Head>
            <main>
                <Header/>
                <div className="page">
                    {!secondary && <PopularMovies/>}
                    <div className={classNames([
                        styles.defaultLayout,
                        backgroundPoster && styles.defaultLayoutPoster
                    ])}
                         style={backgroundPoster && dynamicBackground}
                    >
                        <div className={classNames([
                            styles.defaultContainer,
                            secondary && styles.defaultContainerFull
                        ])}>
                            {!secondary ? (
                                <>
                                    <div className={classNames([
                                        styles.defaultLeft,
                                        backgroundPoster && styles.defaultPoster
                                    ])}>
                                        {children}
                                    </div>
                                    <div className={classNames([
                                        styles.defaultRight,
                                        backgroundPoster && styles.defaultPoster
                                    ])}>
                                        <TopMovies/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {children}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </>
    );
}

export default Index;
