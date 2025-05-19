import React, { useContext } from 'react';
import { Paper, InputBase, Box, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalContext } from '../contexts/GlobalContext';

function Searchbar() {
  const { search } = useContext(GlobalContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSearch(value) {
    search(value);
  }

  return (
    <Box
  sx={{
    height: 'auto',
    bgcolor: 'snow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '20px',
    mb: '20px',
  }}
>
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
    }}
  >
    
    {!isMobile && <>{/* Vine esquerdo atrás */}
    <img
      src="VineLeft2.svg"
      alt=""
      style={{
        position: 'absolute',
        left: -50,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 80,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
    {/* Vine direito atrás */}
    <img
      src="VineRight2.svg"
      alt=""
      style={{
        position: 'absolute',
        right: -50,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 80,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />

</>}
    
    
    
    {/* Barra de pesquisa acima dos SVGs */}
    <Paper
      sx={{
        bgcolor: 'snow',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        zIndex: 1,
        position: 'relative',
        height: isMobile ? '50px' : '60px',
      }}
      elevation={10}
    >
      <InputBase
        placeholder="Pesquise aqui..."
        fullWidth
        sx={{
          fontSize: isMobile ? '16px' : '18px',
        }}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon
        color="secondary"
        sx={{
          fontSize: isMobile ? '24px' : '30px',
          ml: 1,
        }}
      />
    </Paper>
  </Box>
</Box>


  );
}

export default Searchbar;
