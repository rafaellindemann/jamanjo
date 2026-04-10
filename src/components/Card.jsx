import React, { useContext } from 'react';
import { 
  Card as MuiCard, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  keyframes
} from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';
import { logResourceClick } from '../services/stats';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

function Card({ r }) {
  const { handleTagFilter } = useContext(GlobalContext);

  const handleResourceButtonClick = async () => {
    await logResourceClick(r);
  };

  return (
    <MuiCard 
      sx={{
        maxWidth: 345, 
        margin: 2,
        backgroundColor: 
          r.tipo === 'ad' ? '#c8e6c9' : 
          r.tipo === 'destaque' ? '#ffcc80' : 
          'inherit',
        animation: r.tipo === 'destaque' ? `${bounce} 1.5s infinite` : 'none',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: r.tipo === 'destaque' ? 'scale(1.02)' : 'none',
        },
      }}
      elevation={10}
    >
      {r.imagem && (
        <Box
          sx={{
            width: '100%',
            height: '200px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={r.imagem}
            alt={r.nome}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }}
          />
        </Box>
      )}

      <CardHeader 
        title={r.nome}
        variant="h5"
        sx={{ color: 'secondary.main' }}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary" gutterBottom>
          {r.descricao}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {r.categoria}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {r.tags && r.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag.trim()} 
              size="small" 
              color="secondary"
              variant="outlined" 
              onClick={() => handleTagFilter(tag)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="medium" 
          color="primary" 
          href={r.link} 
          target="_blank" 
          rel="noreferrer"
          variant="contained"
          onClick={handleResourceButtonClick}
        >
          {r.tipo === 'ad' ? 'Vai lá, vai...' : 'Acessar recurso'}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
