import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `"Hubot Sans", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        body: `"Hubot Sans", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    },
    styles: {
        global: {
            'html, body': {},
        },
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: '3px',
            },
            variants: {
                black: {
                    bg: 'rgba(0,0,0,0.9)',
                    color: 'white',
                    height: '40px',
                    borderRadius: '3px',
                    _hover: {
                        bg: 'rgba(0,0,0,95)',
                        _disabled: {
                            bg: 'rgba(0,0,0,85)',
                        },
                    },
                    _active: {
                        bg: 'rgba(0,0,0,1.0)',
                    },
                    _disabled: {
                        bg: 'rgba(0,0,0,1.0)',
                    },
                },
                styledOutline: {
                    border: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: '6px',
                    bg: 'rgba(0,0,0,0.0)',
                    textTransform: 'none',
                    color: 'black',
                    _hover: {
                        bg: 'rgba(0,0,0,0.05)',
                        _disabled: {
                            opacity: 0.8,
                            bg: 'rgba(0,0,0,0)',
                        },
                    },
                    _active: {
                        bg: 'rgba(0,0,0,0.08)',
                    },
                    _disabled: {
                        opacity: 0.5,
                        bg: 'rgba(0,0,0,0)',
                    },
                },
                fullGhost: {
                    bg: 'rgba(0,0,0,0.0)',
                    color: 'black',
                    borderRadius: '0px',
                    _hover: {
                        bg: 'rgba(0,0,0,0)',
                        _disabled: {
                            bg: 'rgba(0,0,0,0)',
                        },
                    },
                    _active: {
                        bg: 'rgba(0,0,0,0)',
                        _disabled: {
                            bg: 'rgba(0,0,0,0)',
                        },
                    },
                    _disabled: {
                        bg: 'rgba(0,0,0,0)',
                    },
                },
            },
        },
        Modal: {
            baseStyle: {
                modal: {
                    borderRadius: '0px',
                },
            },
        },
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
});

const ChakraContextProvider = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraContextProvider;

