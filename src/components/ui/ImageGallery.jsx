import React from 'react';
import { motion } from 'framer-motion';

const ImageGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src={image.url}
            alt={image.description}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-medium">{image.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery; 