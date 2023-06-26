import { Roboto } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';
import { blue, pink, blueGrey, lightBlue,grey } from '@mui/material/colors';

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
      main: blue.A700,
    },
    secondary: {
      main: blue[800]

    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[200],
    },
    background:{
      default:grey[800],
      paper:grey[400],
    }
  },
  typography: {

    fontFamily: roboto.style.fontFamily,
  },
});
export default theme;
