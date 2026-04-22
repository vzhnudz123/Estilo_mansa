import { getActiveStory, getAllStories, createStory, updateStory, deleteStory } from '../controllers/storyController.js';

async function storyRoutes(app) {
  app.get('/active', getActiveStory);
  app.get('/', { onRequest: [app.authenticate] }, getAllStories);
  app.post('/', { onRequest: [app.authenticate] }, createStory);
  app.put('/:id', { onRequest: [app.authenticate] }, updateStory);
  app.delete('/:id', { onRequest: [app.authenticate] }, deleteStory);
}

export default storyRoutes;
