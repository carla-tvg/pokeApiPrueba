require('dotenv').config(); 

console.log('MONGO_URI:', process.env.MONGO_URI); 
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            throw new Error('MONGO_URI no está definida en las variables de entorno');
        }
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
