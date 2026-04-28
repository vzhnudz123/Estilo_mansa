import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { UPLOAD_DIR, buildUploadUrl, ensureUploadDir } from '../config/uploads.js';

export default async function uploadRoutes(fastify, options) {
  // Use preHandler for authentication
  fastify.post('/', { preHandler: [fastify.requireAdmin] }, async (request, reply) => {
    try {
      ensureUploadDir();
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
          const uploadPath = path.join(UPLOAD_DIR, filename);

          // Save file
          await pipeline(part.file, fs.createWriteStream(uploadPath));

          // Generate URL
          const fileUrl = buildUploadUrl(request, filename);
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
      
      // Basic path traversal protection
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return reply.code(400).send({ error: 'Invalid filename' });
      }

      const filePath = path.join(UPLOAD_DIR, filename);

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
