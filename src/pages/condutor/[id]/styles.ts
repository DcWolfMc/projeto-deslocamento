import { Box, Container, Paper, Typography, styled } from "@mui/material";


export const CondutorContainer = styled(Container)(({ theme }) => `
display: flex;
flex-direction:column;
gap: 2.5rem;
padding: 0;
`); typeof Container

export const ContentPaper = styled(Paper)(({ theme }) => `
display: flex;
flex-direction:column;
gap:1rem;
padding: 1rem 2rem;
border: 1px solid ${theme.palette.grey[700]};
border-radius:16px;
background-color: ${theme.palette.background.default};
`); typeof Paper

export const CondutorItemHeader = styled(Typography)(({ theme }) => `
display:flex;
justify-content:center;
border: 1px solid ${theme.palette.grey[700]};
color: ${theme.palette.text.secondary};
background-color: ${theme.palette.primary.dark};
`); typeof Typography

export const CondutorItemContent = styled(Typography)(({ theme }) => `
display:flex;
justify-content:center;
border: 1px solid ${theme.palette.grey[700]};
color: ${theme.palette.text.secondary};
background-color: ${theme.palette.primary.light};
`); typeof Typography