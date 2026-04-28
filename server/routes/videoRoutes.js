import { getActiveVideos, getAllVideos, addVideo, updateVideo, deleteVideo } from '../controllers/videoController.js';

async function videoRoutes(app) {
  app.get('/active', getActiveVideos);
  app.get('/', { onRequest: [app.authenticate] }, getAllVideos);
  app.post('/', { onRequest: [app.requireAdmin] }, addVideo);
  app.put('/:id', { onRequest: [app.requireAdmin] }, updateVideo);
  app.delete('/:id', { onRequest: [app.requireAdmin] }, deleteVideo);
}

export default videoRoutes;
