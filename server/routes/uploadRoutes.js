import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function uploadRoutes(fastify, options) {
  fastify.post('/', { preValidation: [fastify.requireAdmin] }, async (request, reply) => {
    try {
      const data = await request.file();
      if (!data) return reply.code(400).send({ error: 'No file uploaded' });

      // Generate secure filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(data.filename).toLowerCase();
      
      // Basic validation (images only)
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        return reply.code(400).send({ error: 'Only image files are allowed' });
      }

      const filename = `image-${uniqueSuffix}${ext}`;
      const uploadPath = path.join(__dirname, '../uploads', filename);

      // Save file
      await pipeline(data.file, fs.createWriteStream(uploadPath));

      // Return local URL ensuring port is properly captured
      const host = request.headers.host || 'localhost:3000';
      const fileUrl = `${request.protocol}://${host}/uploads/${filename}`;
      reply.code(200).send({ url: fileUrl });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'File upload failed' });
    }
  });

  fastify.delete('/:filename', { preValidation: [fastify.requireAdmin] }, async (request, reply) => {
    try {
      const { filename } = request.params;
      const filePath = path.join(__dirname, '../uploads', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        reply.code(200).send({ success: true, message: 'File deleted' });
      } else {
        reply.code(404).send({ error: 'File not found' });
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete file' });
    }
  });
}
