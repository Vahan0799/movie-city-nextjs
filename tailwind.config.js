/** @type {import('tailwindcss').Config} */

function withOpacity(variableName, opacityValue = undefined) {
    return () => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                '2xl': '1440px'
            },
            backgroundColor: {
                'header': 'var(--header-bg)',
                'mobileBackground': 'rgb(var(--navigation-background))',
                'slight': 'var(--transparencyBackground)'
            },
            backgroundImage: {
                'main-radial': 'radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8015581232492998) 100%)',
                'color-linear': 'var(--linear-gradient-main)'
            },
            backgroundPosition: {
                'center-top': 'center top'
            },
            backgroundSize: {
                '20': '20px'
            },
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif']
            },
            colors: {
                'white-black': withOpacity('--color-white'),
                'black-white': withOpacity('--color-black'),
                'primary-blue': withOpacity('--color-primary-blue'),
                'primary-pink': withOpacity('--color-primary-pink'),
                'secondary-blue': withOpacity('--color-secondary-blue'),
                'primary-gray': withOpacity('--color-primary-gray'),
                'secondary-gray': withOpacity('--color-secondary-gray'),
            },
            zIndex: {1: 1},
            keyframes: {
                wiggle: {
                    '0%, 50%, 100%': {
                        transform: 'translateY(-50%) rotate(0deg)'
                    },

                    '25%': {
                        transform: 'translateY(-50%) rotate(6deg)'
                    },

                    '75%': {
                        transform: 'translateY(-50%) rotate(-6deg)'
                    }
                },
                roll: {
                    '0%': {
                        top: '0px'
                    },

                    '100%': {
                        top: '-15px'
                    }
                }
            },

            animation: {
                wiggly: 'wiggle 550ms linear infinite both',
                rolling: 'roll 100ms infinite'
            }
        },
    },
    plugins: []
}
