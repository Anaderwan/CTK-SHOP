/**
 * Konfiguracijska datoteka za Vite – alat za brzi frontend razvoj i buildanje aplikacija.
 * 
 * - Koristi Vite plugin za React kako bi omogućio JSX, HMR i ostale pogodnosti.
 * - Definira alias za uvoz stilova kako bi uvozi bili kraći i pregledniji.
 * - ovo omogućuje umjesto relativnih putanja (npr. "../../../styles/") koristiti jednostavnije "styles/...".
 */
import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react'; 
import path from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/styles'),
      components: path.resolve(__dirname, 'src/Components'),
      api: path.resolve(__dirname, 'src/api'),
    },
  },
});
