# Dockerfile simple para el backend
FROM php:8.1-cli

WORKDIR /app

# Copiar archivos
COPY . .

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader

# Exponer puerto
EXPOSE 8000

# Comando por defecto
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]