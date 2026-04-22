import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { APP_ORIGIN } from '../config/runtime.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function uploadRoutes(fastify, options) {
  // Admin-only uploads for CMS media
  fastify.post('/', { preHandler: [fastify.requireAdmin] }, async (request, reply) => {
    try {
      const parts = request.files();
      const urls = [];

      for await (const part of parts) {
        if (part.file) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = path.extname(part.filename).toLowerCase();
          
          if (!['.png', '.jpg', '.jpeg', '.webp', '.mp4', '.mov', '.avi'].includes(ext)) {
            continue;
          }

          const prefix = ['.mp4', '.mov', '.avi'].includes(ext) ? 'video' : 'image';
          const filename = `${prefix}-${uniqueSuffix}${ext}`;
          const uploadPath = path.join(__dirname, '../uploads', filename);

          // Save file
          await pipeline(part.file, fs.createWriteStream(uploadPath));

          // Generate URL
          const baseUrl = APP_ORIGIN;
          const host = request.headers.host;
          const protocol = request.headers['x-forwarded-proto'] || request.protocol || 'https';
          const requestBaseUrl = host && host === new URL(baseUrl).host
            ? `${protocol}://${host}`
            : baseUrl;
          const fileUrl = `${requestBaseUrl}/uploads/${filename}`;
          urls.push(fileUrl);
        }
      }

      if (urls.length === 0) {
        return reply.code(400).send({ error: 'No valid files uploaded' });
      }

      return reply.code(200).send({ 
        urls, 
        url: urls[0], // backward compatibility
        success: true 
      });
    } catch (error) {
      console.error('Upload Error:', error);
      return reply.code(500).send({ error: 'File upload failed' });
    }
  });

  fastify.delete('/:filename', { preHandler: [fastify.requireAdmin] }, async (request, reply) => {
    try {
      const { filename } = request.params;
      const filePath = path.join(__dirname, '../uploads', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return reply.code(200).send({ success: true, message: 'File deleted' });
      } else {
        return reply.code(404).send({ error: 'File not found' });
      }
    } catch (error) {
      return reply.code(500).send({ error: 'Failed to delete file' });
    }
  });
}
