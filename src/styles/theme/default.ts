import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, pink,blueGrey } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      100: blue[100],
      200: blue[200],
      300: blue[300],
      400: blue[400],
      500: blue[500],
      600: blue[600],
      700: blue[700],
      800: blue[800],
      900: blue[900],
      A100: blue["A100"],
      A200: blue["A200"],
      A400: blue["A400"],
      A700: blue["A700"],
    },
    secondary: {
      100: pink[100],
      200: pink[200],
      300: pink[300],
      400: pink[400],
      500: pink[500],
      600: pink[600],
      700: pink[700],
      800: pink[800],
      900: pink[900],
      A100: pink["A100"],
      A200: pink["A200"],
      A400: pink["A400"],
      A700: pink["A700"],
    },
    text: {
      primary: blueGrey[900],
      secondary:blueGrey[50],
    },
  },
  typography: {
    
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
