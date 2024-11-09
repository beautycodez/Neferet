import cloudinary from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;
