import { Box, styled } from "@mui/material";


export const ModalBox = styled(Box)(({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 45rem;
  padding: 1rem;
  border-radius:8px;
`); typeof Box