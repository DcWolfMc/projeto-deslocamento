import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
    :focus {
        outline: transparent;
        box-shadow: 0 0 0 2px
    }
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: roboto, sans-serif;
    }
    
    body{
        -webkit-font-smoothing: antialiased;
    }
`