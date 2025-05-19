import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <SearchOffIcon color='primary' sx={{ fontSize: 150 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Não encontrado
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Nenhum resultado corresponde ao que foi pesquisado.
      </Typography>
      <Box
        component="img"
        src="https://media3.giphy.com/media/SsYvscP7pgHTMldeAY/giphy.gif?cid=6c09b952iy1mt7ot3enk4fbmwz2ega3hukh75ofzxbddyz42&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
        alt="Nada encontrado"
        sx={{ maxWidth: 350, width: '100%' }}
      />
    </Box>
  );
}

export default NotFound;
