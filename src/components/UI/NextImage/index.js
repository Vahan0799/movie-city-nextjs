import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import fallbackImage from '@/assets/images/icons/test-img.svg';
import styles from './index.module.scss';

const Index = props => {
    const {src, fallBackSrc = fallbackImage, wrapperClass, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);


    return (
        <div className={
            classNames([
                wrapperClass,
                styles.NextImageContainer,
                isError && `${styles.NextImageFallback} fallback-img`
            ])
        }>
            <Image
                src={(src ? imgSrc : fallBackSrc) || '/placeholder.jpg' }
                width={props.width || 300}
                height={props.height || 450}
                quality={80}
                onError={() => {
                    setImgSrc(fallBackSrc);
                    setError(true);
                }}
                {...rest}
            />
        </div>
    )
}

export default Index;
