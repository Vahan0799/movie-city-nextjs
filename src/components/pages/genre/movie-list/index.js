import React from 'react';
import MediaCard from '@/components/media-card';
import Skeleton from '@/components/media-card/skeleton';
import styles from './index.module.scss';

const Index = props => {
    const {
        results,
        mediaType = 'movie',
        isLoading
    } = props;

    return (
        <section className={styles.listResults}>
            {isLoading ? Array.from({length: 10}).map((_, index) => <Skeleton key={`movie-genre-${index}`}/>)
                : <>
                    {results && results.map((item, index) =>
                        <MediaCard
                            detailed
                            key={index}
                            media={item}
                            delay={index}
                            mediaType={mediaType}
                        />
                    )}
                </>
            }
        </section>
    )
}

export default Index;
