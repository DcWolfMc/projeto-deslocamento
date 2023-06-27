import { Container, Paper, TableBody, TableContainer, styled } from "@mui/material";


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


export const StyledTableContainer = styled(TableContainer)(({ theme }) => `
    flex: 1;
    overflow: auto;
    box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2);
    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 300px;

        th{
            background-color: ${theme.palette.primary.main};
            padding: 1rem;
            
            color: ${theme.palette.text.secondary};
            font-size: 0.875rem;
            line-height: 1.6;
            
            &:first-of-type{
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }
            &:last-child{
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }
        td{
            border-top: 2px solid ${theme.palette.secondary.dark};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;
            color: ${theme.palette.grey[300]};
            &:first-of-type{
               padding-left: 1.5rem;
            }
            &:last-child{
                padding-right: 1.5rem;
            }
        }

    }
`); typeof TableContainer

export const StyledTableBody = styled(TableBody)(({ theme }) => `
    tr{
        background-color: ${theme.palette.secondary.light};
        padding: 1rem;
        text-align: left;
        color: ${theme.palette.text.primary};
        font-size: 0.875rem;
        line-height: 1.6;
        &:nth-of-type(odd){
        }
    }
`); typeof TableBody

