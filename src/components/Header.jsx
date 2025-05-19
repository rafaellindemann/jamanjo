import { useContext, useState } from "react";
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
    handleTagFilter, selectedTag, clearFilters, searchValue
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
      if(searchValue){ 
      clearFilters(searchValue)} //Limpa filtros e busca no resources caso searchbar esteja com algum conteúdo
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
  sx={{
    position: 'relative',
    backgroundImage: "url('/jungle-pattern.svg')",
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat',
    color: 'white',
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(76, 175, 79, 0.5)', 
      zIndex: -1,
    },
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
            onClick={() => clearFilters(searchValue)} // Limpa todos os filtros ao clicar no logo, passa o valor da searchbar para busca caso não esteja vazia
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./img/JAMANJO-2-23-2025.png"
              // src="./img/Jamanjo-placa-logo.png"
              alt="logo progHub"
              style={{ height: "40px", filter: "drop-shadow(0 0 0.75rem black)" }}
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
                  onClick={() => clearFilters(searchValue)} // Limpa todos os filtros, passa o valor da searchbar para busca caso não esteja vazia
                  sx={{ color: 'white' }}
                >
                  <FilterAltOffIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Contador de registros */}
            <Typography variant="body1" sx={{ 
              color: 'white',
              fontWeight: "bold",
              padding: "4px 8px",
              borderRadius: 2,
              textShadow: "0px 0px 24px black",
              backgroundColor:  'rgba(35, 185, 35, 0.3)'
              }} >
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
                color="primary"
                sx={{ color: 'white' }}
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
                        fontWeight: "bold"
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
                    // textShadow: "0px 0px 14px black",
                    textShadow: isCategorySelected(category) ? "0px 0px 14px white" : "0px 0px 14px black",
                    color: isCategorySelected(category) ? "secondary.main" : "white",
                    fontWeight: isCategorySelected(category) ? "bold" : "normal",
                    backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.56)' : 'rgba(76, 150, 80, 0.48)',
                    // backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.2)' : 'inherit',
                    '&:hover': {
                      backgroundColor: isCategorySelected(category) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(155, 255, 155, 0.37)',
                      textShadow: "0px 0px 14px green",
                      borderRadius: 2,
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

