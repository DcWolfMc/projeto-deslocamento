import { Container, Paper, styled } from "@mui/material";


export const DeslocamentoContainer = styled(Container)(({ theme }) => `
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
gap: 2.5rem;
padding: 0;
`); typeof Container

export const ContentPaper = styled(Paper)(({ theme }) => `
max-width:32rem;
display: flex;
flex-direction:column;
gap:2rem;
padding: 2rem 2.5rem;
border:1px solid ${theme.palette.secondary.dark};
border-radius:16px;
background-color: ${theme.palette.background.default};
`); typeof Paper