import { getActiveStory, getAllStories, createStory, updateStory, deleteStory } from '../controllers/storyController.js';

async function storyRoutes(app) {
  app.get('/active', getActiveStory);
  app.get('/', { onRequest: [app.requireAdmin] }, getAllStories);
  app.post('/', { onRequest: [app.requireAdmin] }, createStory);
  app.put('/:id', { onRequest: [app.requireAdmin] }, updateStory);
  app.delete('/:id', { onRequest: [app.requireAdmin] }, deleteStory);
}

export default storyRoutes;
