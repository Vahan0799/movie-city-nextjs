import React from 'react';

const Button = props => {
    const {
        children,
        design,
        className,
        regular,
        ...rest
    } = props;

    const classList = () => {
        return regular ? className : `btn${design ? ` btn-${design}` : ''}${className ? ` ${className}` : ''}`
    }

    return (
        <button className={classList()} {...rest}>
            {children}
        </button>
    )
};

export default Button;
