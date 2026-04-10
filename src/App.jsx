

import './App.css'
import Header from './components/Header'
import Searchbar from './components/Searchbar';
import Body from './components/Body'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#6B8E23', 
    },
    secondary: {
      main: '#8B4513', 
    },
    // aqui pode colocar mais cores personalizadas
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

  const path = window.location.pathname;

  if (path === '/painel-stats') {
    return <Dashboard />;
  }

  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default App
