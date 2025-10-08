import React, { Component, ReactNode } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { Error, Refresh } from '@mui/icons-material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            textAlign: 'center'
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Error color="error" sx={{ fontSize: 64 }} />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom color="error">
            ¡Ups! Algo salió mal
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Ha ocurrido un error inesperado. Por favor, recarga la página o inténtalo más tarde.
          </Typography>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                mb: 3,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                textAlign: 'left',
                maxWidth: '100%',
                overflow: 'auto'
              }}
            >
              <Typography variant="caption" display="block" gutterBottom>
                Error Details (Development Mode):
              </Typography>
              <Typography variant="body2" component="pre">
                {this.state.error.message}
              </Typography>
            </Box>
          )}
          
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={this.handleReload}
            size="large"
          >
            Recargar Página
          </Button>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary