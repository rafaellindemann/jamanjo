import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Dashboard from './components/Dashboard'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B8E23',
    },
    secondary: {
      main: '#8B4513',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
  },
});

function App() {
  const path = window.location.pathname;

  return (
    <ThemeProvider theme={theme}>
      {path === '/painel-stats' ? (
        <Dashboard />
      ) : (
        <>
          <Header />
          <Body />
        </>
      )}
    </ThemeProvider>
  );
}

export default App
