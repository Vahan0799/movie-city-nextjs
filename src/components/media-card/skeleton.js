import React from 'react';
import classNames from 'classnames';
import NextImage from '@/components/UI/NextImage';
import styles from './index.module.scss';

const Skeleton = () => {
    return (
        <div className="h-full p-3">
            <div className={styles.media}>
                <figure className="full-figure">
                    <div className={classNames([styles.mediaImage, styles.mediaImageSkeleton])}>
                        <NextImage
                            className="transition-transform duration-500"
                            src="/placeholder.jpg"
                            width={300} height={450} alt="Placeholder"
                        />
                    </div>
                    <figcaption className="mt-3">
                        <p className={classNames([styles.mediaTitle, 'invisible'])}>Skeleton</p>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
};

export default Skeleton;
