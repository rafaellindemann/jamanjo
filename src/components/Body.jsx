import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
import { GlobalContext } from '../contexts/GlobalContext';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import Searchbar from './Searchbar';
import NotFound from './NotFound';
import { logHomeView } from '../services/stats';

const MotionCard = motion.create(({ resource, ...rest }) => (
  <div {...rest}>
    <Card r={resource} />
  </div>
));

function Body() {
  const { filteredResources } = useContext(GlobalContext);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchNotFound, setNotFound] = useState(false);
  const hasLoggedPageview = useRef(false);

  const getColumnCount = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 960) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [columns, setColumns] = useState(getColumnCount());

  useEffect(() => {
    console.log("***********************************");
    console.log("Que bom te ver por aqui!!!");
    console.log("Agora aproveita e visita o repositório: https://github.com/rafaellindemann/jamanjo");
    console.log("Deixa uma estrelinha bonitinha lá pro tio :D");
    console.log("***********************************");

    const handleResize = () => {
      setColumns(getColumnCount());
    };

    const logInitialAccess = async () => {
      if (hasLoggedPageview.current) return;
      hasLoggedPageview.current = true;
      await logHomeView();
    };

    window.addEventListener('resize', handleResize);
    logInitialAccess();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setVisibleItems(filteredResources);
      setIsInitialLoad(false);
    } else {
      setVisibleItems([]);

      const timer = setTimeout(() => {
        setVisibleItems(filteredResources);
        setNotFound(filteredResources.length === 0);
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
        delay: i * 0.05,
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
        px: { xs: 2, sm: 4 },
        boxShadow: 'inset 0px 0px 20px 10px #6B8E23'
      }}
    >
      <Searchbar />

      <Container maxWidth="xl">
        <AnimatePresence>
          {searchNotFound ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
            >
              <NotFound />
            </Box>
          ) : (
            <Masonry columns={columns} spacing={2}>
              {visibleItems.map((resource, index) => (
                <MotionCard
                  key={resource.id}
                  resource={resource}
                  custom={Math.min(index, 10)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  layout
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                />
              ))}
            </Masonry>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default Body;
