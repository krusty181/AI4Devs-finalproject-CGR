#!/bin/bash

echo "BOOTBOOKINGCAMP Backend - Servidor Portable"
echo "==========================================="
echo ""
echo "Iniciando servidor en http://localhost:8000"
echo "Presiona Ctrl+C para detener"
echo ""

# Verificar que estamos en la carpeta backend
if [ ! -f "public/index.php" ]; then
    echo "Error: Ejecutar desde la carpeta backend del proyecto"
    echo "   Ubicación correcta: [tu-proyecto]/backend/"
    exit 1
fi

# Verificar PHP
if ! command -v php &> /dev/null; then
    echo "Error: PHP no encontrado"
    echo "   Instalar PHP 8.1+ en el sistema"
    exit 1
fi

echo "PHP encontrado - Iniciando servidor..."
echo ""
php -S localhost:8000 -t public