FROM php:8.3-fpm
LABEL MAINTAINER="Mamun"

# Arguments for custom user
ARG user
ARG uid

# Install dependencies for PHP extensions and Imagick
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl libpng-dev libonig-dev libxml2-dev zip unzip wget dpkg fontconfig \
    libfreetype6-dev libjpeg62-turbo-dev libxrender1 xfonts-75dpi xfonts-base mariadb-client \
    libzip-dev zlib1g-dev libwebp-dev libjpeg-dev libfreetype-dev \
    libmagickwand-dev libmagickcore-dev cron vim git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install zip gd pdo_mysql intl mbstring exif pcntl bcmath && \
    # Clone and compile Imagick from source as a backup method
    git clone https://github.com/Imagick/imagick.git && \
    cd imagick && \
    phpize && \
    ./configure && \
    make && \
    make install && \
    docker-php-ext-enable imagick && \
    cd .. && rm -rf imagick && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Download and install wkhtmltopdf with libssl1.1 dependency
RUN wget -q http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    wget -q https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb && \
    dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    dpkg -i wkhtmltox_0.12.6-1.buster_amd64.deb && \
    apt-get install -f -y && \
    rm -f libssl1.1_1.1.1f-1ubuntu2_amd64.deb wkhtmltox_0.12.6-1.buster_amd64.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Node.js 14
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl xz-utils && \
    curl -fsSL https://nodejs.org/dist/v14.21.3/node-v14.21.3-linux-x64.tar.xz -o nodejs.tar.xz && \
    mkdir -p /usr/local/lib/nodejs && \
    tar -xJf nodejs.tar.xz -C /usr/local/lib/nodejs --strip-components=1 && \
    rm nodejs.tar.xz && \
    ln -s /usr/local/lib/nodejs/bin/node /usr/local/bin/node && \
    ln -s /usr/local/lib/nodejs/bin/npm /usr/local/bin/npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy Composer binary from the official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy PHP configuration
COPY .docker/app/php-fpm.ini /usr/local/etc/php/conf.d/php-fpm.ini

# Create a system user for running Composer and Artisan commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user && \
    mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory and permissions
WORKDIR /var/www
RUN chown -R www-data:www-data /var/www

# Switch to custom user
USER $user

