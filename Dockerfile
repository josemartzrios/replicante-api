FROM node:20

#Configurar directorio de trabajo
WORKDIR /usr/src/app

#Copiar archivos necesarios
COPY package*.json ./
RUN npm install
COPY . .

#Expone el puerto de la API
EXPOSE 5000

#Comando para iniciar la API
CMD ["npm", "start"]