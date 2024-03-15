import React from 'react';
import {useMediaQuery} from 'react-responsive';

const useResponsive = () => {
    const isMobileOrTablet = useMediaQuery({maxWidth: 1023});
    const isMobile = useMediaQuery({maxWidth: 767});
    const isTablet = useMediaQuery({minWidth: 768, maxWidth: 1023});
    const isDesktop = useMediaQuery({minWidth: 1024});

    return {isMobileOrTablet, isMobile, isTablet, isDesktop};
};

export default useResponsive;