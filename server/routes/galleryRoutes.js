import {
  getActiveGallery, getFeaturedGallery, getAllGallery,
  addGalleryImage, updateGalleryImage, deleteGalleryImage
} from '../controllers/galleryController.js';

async function galleryRoutes(app) {
  app.get('/active', getActiveGallery);
  app.get('/featured', getFeaturedGallery);
  app.get('/', { onRequest: [app.requireAdmin] }, getAllGallery);
  app.post('/', { onRequest: [app.requireAdmin] }, addGalleryImage);
  app.put('/:id', { onRequest: [app.requireAdmin] }, updateGalleryImage);
  app.delete('/:id', { onRequest: [app.requireAdmin] }, deleteGalleryImage);
}

export default galleryRoutes;
