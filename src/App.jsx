

import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { createTheme, ThemeProvider } from '@mui/material/styles';

    /* --cor-preto: #8B4513;
    --cor-branco: #3b3b3b;
    --cor-cinza-fundo: #6B8E23;
    --cor-laranja-logo: #A52A2A; */

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B8E23', 
    },
    secondary: {
      main: '#8B4513', 
    },
    // Você pode adicionar mais cores personalizadas
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    // etc.
  },
});


function App() {


  return (
    <ThemeProvider theme={theme}>
        <Header />
        <Body />
    </ThemeProvider>
  )
}

export default App
