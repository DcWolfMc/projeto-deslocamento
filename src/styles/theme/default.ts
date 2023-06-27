import { Roboto } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';
import { teal, green, blue, pink, blueGrey, lightBlue, grey, red } from '@mui/material/colors';

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
      main: green[500],
    },
    secondary: {
      main: teal[800],

    },
    text: {
      primary: blueGrey[700],
      secondary: blueGrey[100],
    },
    background: {
      default: blueGrey[500],
      paper: grey[200],
    },
    error:{
      main: red[400],
      light: blueGrey[100]
    }
  },
  typography: {

    fontFamily: roboto.style.fontFamily,
  },
});
export default theme;
