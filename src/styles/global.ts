import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: roboto, sans-serif;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    
    body{
        background-color: #1E1E1E;
        -webkit-font-smoothing: antialiased;
    }
`