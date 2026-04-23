import { getActiveStory, getAllStories, createStory, updateStory, deleteStory } from '../controllers/storyController.js';

async function storyRoutes(app) {
  app.get('/active', getActiveStory);
  app.get('/', { onRequest: [app.authenticate] }, getAllStories);
  app.post('/', { onRequest: [app.authenticate] }, createStory);
  
  // Explicit update route to avoid collisions with "update" string
  app.put('/update/:id', { onRequest: [app.authenticate] }, updateStory);
  
  // Explicit delete route
  app.delete('/delete/:id', { onRequest: [app.authenticate] }, deleteStory);
}

export default storyRoutes;
