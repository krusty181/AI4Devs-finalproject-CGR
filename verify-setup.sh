#!/bin/bash

echo "BOOTBOOKINGCAMP - Verificación de Entorno"
echo "========================================"
echo ""

error_count=0

# Verificar PHP
echo "1. Verificando PHP..."
if command -v php &> /dev/null; then
    php_version=$(php --version | head -n 1)
    echo "$php_version"
    if php --version | grep -q "PHP 8"; then
        echo "PHP 8.x detectado"
    else
        echo "Advertencia: Se recomienda PHP 8.1+"
    fi
else
    echo "PHP no encontrado"
    ((error_count++))
fi

# Verificar Node.js
echo ""
echo "2. Verificando Node.js..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "Node.js $node_version detectado"
else
    echo "Node.js no encontrado"
    ((error_count++))
fi

# Verificar npm
echo ""
echo "3. Verificando npm..."
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo "npm $npm_version detectado"
else
    echo "npm no encontrado"
    ((error_count++))
fi

# Verificar estructura del proyecto
echo ""
echo "4. Verificando estructura del proyecto..."
if [ -f "backend/public/index.php" ]; then
    echo "Backend encontrado"
else
    echo "backend/public/index.php no encontrado"
    ((error_count++))
fi

if [ -f "frontend/package.json" ]; then
    echo "Frontend encontrado"
else
    echo "frontend/package.json no encontrado"
    ((error_count++))
fi

if [ -f "frontend/.env" ]; then
    echo "Configuración frontend encontrada"
else
    echo "frontend/.env no encontrado - usar .env.example"
fi

echo ""
if [ $error_count -eq 0 ]; then
    echo "Entorno listo para desarrollo!"
    echo ""
    echo "Comandos para iniciar:"
    echo "  Backend:  cd backend && ./start-portable.sh"
    echo "  Frontend: cd frontend && npm run dev"
    echo ""
else
    echo "Configuración incompleta - revisar requisitos"
    exit 1
fi