import {
  getApprovedFeedback, getAllFeedback, submitFeedback,
  approveFeedback, rejectFeedback, deleteFeedback
} from '../controllers/feedbackController.js';

async function feedbackRoutes(app) {
  // Public
  app.get('/approved', getApprovedFeedback);
  app.post('/', submitFeedback);
  // Admin protected
  app.get('/', { onRequest: [app.authenticate] }, getAllFeedback);
  app.put('/:id/approve', { onRequest: [app.authenticate] }, approveFeedback);
  app.put('/:id/reject', { onRequest: [app.authenticate] }, rejectFeedback);
  app.delete('/:id', { onRequest: [app.authenticate] }, deleteFeedback);
}

export default feedbackRoutes;
