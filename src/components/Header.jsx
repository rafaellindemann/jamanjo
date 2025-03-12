import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  ButtonGroup,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { GlobalContext } from "../contexts/GlobalContext";

function Header() {
  const { 
    categories, resources, handleFilter, filters, filteredResources, 
    handleTagFilter, selectedTag, clearFilters 
  } = useContext(GlobalContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Para o menu mobile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Verifica se uma categoria está selecionada
  const isCategorySelected = (category) => {
    return filters && filters.includes(category);
  };

  // Função para alternar entre filtrar e limpar filtro
  const toggleFilter = (category) => {
    if (isCategorySelected(category)) {
      handleFilter(null);
    } else {
      handleFilter(category);
    }
  };

  // Versão para o menu mobile que também fecha o menu
  const handleCategoryClick = (category) => {
    toggleFilter(category);
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "snow",
        bgcolor: '#6B8E23', 
        backgroundImage: `url('/forest-2.svg')`,
        color: "text.primary",
        boxShadow: 1,
        padding: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          padding: "0 16px",
        }}
      >
        {/* Primeira linha: Logo e botões de ação */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo à esquerda */}
          <Box
            onClick={clearFilters} // Limpa todos os filtros ao clicar no logo
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./img/JAMANJO-2-23-2025.png"
              alt="logo progHub"
              style={{ height: "40px" }}
            />
          </Box>

          {/* Botões de ação e contador à direita */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center",
              gap: 2,
              color: 'white',
            }}
          >
            {/* Botão para limpar filtros com Tooltip (apenas quando há filtros aplicados) */}
            {(filters.length > 0 || selectedTag) && (
              <Tooltip title="Limpar Filtros" arrow>
                <IconButton 
                  color="secondary" 
                  onClick={clearFilters} // Limpa todos os filtros
                  sx={{ color: 'white' }}
                >
                  <FilterAltOffIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Contador de registros */}
            <Typography variant="body1" sx={{ color: 'white' }} >
              {filteredResources.length}/{resources.length}
            </Typography>
          </Box>
        </Box>

        {/* Segunda linha: Botões de filtro ou menu mobile */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                color="secondary"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    selected={isCategorySelected(category)}
                    sx={{
                      backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.2)' : 'inherit',
                      "&.Mui-selected": {
                        color: "secondary.main",
                        fontWeight: "bold",
                      }
                    }}
                  >
                    <Typography variant="body1">{category}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <ButtonGroup
              disableElevation
              variant="text"
              color="primary"
              sx={{
                flexWrap: "wrap",
                "& .MuiButtonGroup-grouped": {
                  margin: "4px 2px",
                },
              }}
            >
              {categories.map((category) => (
                <Button 
                  key={category} 
                  onClick={() => toggleFilter(category)}
                  sx={{
                    color: isCategorySelected(category) ? "secondary.main" : "white",
                    fontWeight: isCategorySelected(category) ? "bold" : "normal",
                    backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.2)' : 'inherit',
                    '&:hover': {
                      backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

