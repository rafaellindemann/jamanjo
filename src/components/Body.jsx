import React, { useContext, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
import { GlobalContext } from '../contexts/GlobalContext';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';

// Componente Card envolvido com motion
const MotionCard = motion(({ resource, ...rest }) => (
  <div {...rest}>
    <Card r={resource} />
  </div>
));

function Body() {
  const { categories, resources, handleFilter, filteredResources, setFilteredResources } = useContext(GlobalContext);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Calculando colunas responsivas
  const getColumnCount = () => {
    if (window.innerWidth < 600) return 1; // xs
    if (window.innerWidth < 960) return 2; // sm
    if (window.innerWidth < 1280) return 3; // md
    return 4; // lg e acima
  };

  const [columns, setColumns] = useState(getColumnCount());

  // Gerenciar redimensionamento
  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gerenciar filteredResources e carregamento inicial
  useEffect(() => {
    if (isInitialLoad) {
      // Carregamento inicial - mostrar todos os itens sem animação de scroll
      setVisibleItems(filteredResources);
      setIsInitialLoad(false);
    } else {
      // Mudança de filtro - reset e animação
      setVisibleItems([]);
      
      // Pequena pausa antes de mostrar os novos itens
      const timer = setTimeout(() => {
        setVisibleItems(filteredResources);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [filteredResources, isInitialLoad]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05, // Reduzido para acelerar a animação
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <Box 
      sx={{ 
        bgcolor: 'snow', 
        color: 'text.primary',
        minHeight: '100vh',
        py: 3,
        // boxShadow: 'inset 0px 0px 10px 10px #8B4513',
        // boxShadow: 'inset 0px 0px 10px 10px #6B8E23',
        // borderRadius: 20,
      }}
    >
      <Container maxWidth="xl">
        <AnimatePresence>
          <Masonry 
            columns={columns} 
            spacing={2}
            sx={{ margin: 0 }}
          >
            {visibleItems.map((resource, index) => (
              <MotionCard
                key={resource.id}
                resource={resource}
                custom={Math.min(index, 10)} // Limita o atraso máximo
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                layout
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              />
            ))}
          </Masonry>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default Body;
