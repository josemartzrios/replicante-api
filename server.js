import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Obtener ruta
app.get('/', (req, res) => {
    res.send('Bienvenido a tu API');
});

//Conexión a la base de datos
const connectToDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('🚀 Conexión a MongoDB exitosa');
        // console.log("MONGO_URI:", process.env.MONGO_URI)
    
    } catch(error){
        console.error('Error al conectar con la base de datos:', error.message);
        // Termina el proceso si no se puede conectar
        process.exit(1)
    }
}

const startServer = async() => {
    await connectToDatabase();

    const PORT = process.env.API_PORT;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}

startServer();