

import './App.css'
import Header from './components/Header'
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
