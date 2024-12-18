import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    server:{
        hmr: false,
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                runtimeCaching: [
                    {
                        // Cache images from the CDN
                        urlPattern: /https:\/\/cdn\.webhallen\.com\/.*\.(jpg|jpeg|png|gif|webp|svg)/,
                        handler: 'CacheFirst',  // Try to get from cache first, then network
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 80, // Cache up to 80 images
                                maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
                            },
                        },
                    },
                    {
                        // Cache local images and assets from the app
                        urlPattern: ({request}) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'local-image-cache',
                            expiration: {
                                maxEntries: 50, // Cache up to 50 images
                                maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
                            },
                        },
                    },
                ],
            },
        }),
    ],
});
