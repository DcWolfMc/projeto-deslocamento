import '@mui/material/styles'
import theme from '@/styles/theme/default';

type ThemeType = typeof theme;

declare module '@mui/material/styles'{
    export interface Theme extends ThemeType {}
}