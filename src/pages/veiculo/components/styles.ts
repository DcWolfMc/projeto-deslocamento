import { Box, styled } from "@mui/material";


export const ModalBox = styled(Box)(({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  padding: 1rem;
  border-radius:8px;
  color: ${theme.palette.text.secondary};
  background-color: ${theme.palette.background.default};
`); typeof Box