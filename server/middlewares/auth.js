import fp from 'fastify-plugin'

export default fp(async function (fastify, opts) {
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or missing token' })
    }
  })

  fastify.decorate('requireAdmin', async function (request, reply) {
    try {
      await request.jwtVerify()
      if (request.user.role !== 'admin') {
        reply.code(403).send({ error: 'Forbidden', message: 'Admin access required' })
      }
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or missing token' })
    }
  })
})
