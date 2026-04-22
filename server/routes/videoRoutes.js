import { getActiveVideos, getAllVideos, addVideo, updateVideo, deleteVideo } from '../controllers/videoController.js';

async function videoRoutes(app) {
  app.get('/active', getActiveVideos);
  app.get('/', { onRequest: [app.authenticate] }, getAllVideos);
  app.post('/', { onRequest: [app.authenticate] }, addVideo);
  app.put('/:id', { onRequest: [app.authenticate] }, updateVideo);
  app.delete('/:id', { onRequest: [app.authenticate] }, deleteVideo);
}

export default videoRoutes;
