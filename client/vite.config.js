import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'), // Specify the path to your tailwind.config.js
  ],
};
