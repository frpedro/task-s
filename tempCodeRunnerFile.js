import { fastify } from 'fastify';
import { db } from './db/index.js';
import { taskRoutes } from './routes/taskroutes.js';

const server = fastify()

server.register(import('@fastify/formbody'));

server.register(taskRoutes)

server.listen({
    port: 3000
})

.then( () => {console.log("o servidor iniciado com exito.")} )
