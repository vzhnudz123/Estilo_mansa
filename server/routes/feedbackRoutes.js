import {
  getApprovedFeedback, getAllFeedback, submitFeedback,
  approveFeedback, rejectFeedback, deleteFeedback
} from '../controllers/feedbackController.js';

async function feedbackRoutes(app) {
  // Public
  app.get('/approved', getApprovedFeedback);
  app.post('/', submitFeedback);
  // Admin protected
  app.get('/', { onRequest: [app.requireAdmin] }, getAllFeedback);
  app.put('/:id/approve', { onRequest: [app.requireAdmin] }, approveFeedback);
  app.put('/:id/reject', { onRequest: [app.requireAdmin] }, rejectFeedback);
  app.delete('/:id', { onRequest: [app.requireAdmin] }, deleteFeedback);
}

export default feedbackRoutes;
