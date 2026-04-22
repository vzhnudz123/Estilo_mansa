import {
  getActiveGallery, getFeaturedGallery, getAllGallery,
  addGalleryImage, updateGalleryImage, deleteGalleryImage
} from '../controllers/galleryController.js';

async function galleryRoutes(app) {
  app.get('/active', getActiveGallery);
  app.get('/featured', getFeaturedGallery);
  app.get('/', { onRequest: [app.authenticate] }, getAllGallery);
  app.post('/', { onRequest: [app.authenticate] }, addGalleryImage);
  app.put('/:id', { onRequest: [app.authenticate] }, updateGalleryImage);
  app.delete('/:id', { onRequest: [app.authenticate] }, deleteGalleryImage);
}

export default galleryRoutes;
