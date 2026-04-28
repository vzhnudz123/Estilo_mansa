import { getActiveStory, getAllStories, createStory, updateStory, deleteStory } from '../controllers/storyController.js';

async function storyRoutes(app) {
  app.get('/active', getActiveStory);
  app.get('/', { onRequest: [app.requireAdmin] }, getAllStories);
  app.post('/', { onRequest: [app.requireAdmin] }, createStory);
  
  // Explicit update route to avoid collisions with "update" string
  app.put('/update/:id', { onRequest: [app.requireAdmin] }, updateStory);
  
  // Explicit delete route
  app.delete('/delete/:id', { onRequest: [app.requireAdmin] }, deleteStory);
}

export default storyRoutes;
