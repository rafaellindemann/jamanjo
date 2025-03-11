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

// Definindo a animação de bounce
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
              onClick={() => handleTagFilter(tag)} // Adiciona o onClick aqui
              sx={{ cursor: 'pointer' }} // Muda o cursor para indicar que é clicável
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
        >
          {r.tipo === 'ad' ? 'Vai lá, vai...' : 'Acessar recurso'}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;


// import React from 'react';
// import { 
//   Card as MuiCard, 
//   CardHeader, 
//   CardContent, 
//   CardActions, 
//   Typography, 
//   Button, 
//   Chip, 
//   Box, 
//   keyframes // Importando keyframes do Material-UI
// } from '@mui/material';

// // Definindo a animação de bounce
// const bounce = keyframes`
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-10px);
//   }
// `;

// function Card({ r }) {
//   return (
//     <MuiCard 
//       sx={{
//         maxWidth: 345, 
//         margin: 2,
//         backgroundColor: 
//           r.tipo === 'ad' ? '#c8e6c9' : // Verde claro para 'ad'
//           r.tipo === 'destaque' ? '#ffcc80' : // Laranja claro para 'destaque'
//           'inherit', // Cor padrão para outros tipos
//         // Aplicando a animação apenas para cards 'destaque'
//         animation: r.tipo === 'destaque' ? `${bounce} 1.5s infinite` : 'none',
//         transition: 'transform 0.3s ease', // Adiciona uma transição suave
//         '&:hover': {
//           transform: r.tipo === 'destaque' ? 'scale(1.02)' : 'none', // Efeito de escala ao passar o mouse
//         },
//       }}
//       elevation={10}
//     >
//       <CardHeader 
//         title={r.nome}
//         variant="h5"
//         sx={{ color: 'secondary.main' }}
//       />
//       <CardContent>
//         <Typography variant="body1" color="text.primary" gutterBottom>
//           {r.descricao}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//           {r.categoria}
//         </Typography>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
//           {r.tags && r.tags.map((tag, index) => (
//             <Chip 
//               key={index} 
//               label={tag.trim()} 
//               size="small" 
//               color="secondary"
//               variant="outlined" 
//             />
//           ))}
//         </Box>
//       </CardContent>
//       <CardActions>
//         <Button 
//           size="medium" 
//           color="primary" 
//           href={r.link} 
//           target="_blank" 
//           rel="noreferrer"
//           variant="outlined"
//         >
//           {r.tipo=='ad' ? 'Vai lá, vai...' : 'Acessar recurso'}
          
//         </Button>
//       </CardActions>
//     </MuiCard>
//   );
// }

// export default Card;

