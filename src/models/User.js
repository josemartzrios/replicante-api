import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Por favor ingresa un correo electrónico válido',
    ],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [5, 'La contraseña debe tener al menos 5 caracteres'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Manejo de errores en caso de usuario ya registrado
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('El correo o nombre de usuario ya está registrado'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
