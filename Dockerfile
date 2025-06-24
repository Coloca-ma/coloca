FROM php:8.2-fpm

# Installer extensions PHP
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    npm nodejs \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer dossier de travail
WORKDIR /var/www

COPY . .

# Installer les dépendances
RUN composer install
RUN npm install && npm run build

CMD ["php-fpm"]
