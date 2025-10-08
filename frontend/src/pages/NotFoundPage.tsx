import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Home, Search } from '@mui/icons-material'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Paper sx={{ p: 4, textAlign: 'center', minHeight: '400px' }}>
      <Typography variant="h1" sx={{ fontSize: '6rem', mb: 2 }}>
        404
      </Typography>
      
      <Typography variant="h3" gutterBottom>
        Página no encontrada
      </Typography>
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        La página que buscas no existe o ha sido movida
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate('/')}
        >
          Volver al Inicio
        </Button>
        <Button
          variant="outlined"
          startIcon={<Search />}
          onClick={() => navigate('/availability')}
        >
          Buscar Disponibilidades
        </Button>
      </Box>
    </Paper>
  )
}

export default NotFoundPage