# Usar una imagen de Node.js como base para construir la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación de React con Vite
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa anterior al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx cuando el contenedor arranque
CMD ["nginx", "-g", "daemon off;"]

