import { fastify } from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { db } from './db/index.js';
import { taskRoutes } from './routes/taskroutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({logger: true});

server.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/'
})

server.register(taskRoutes) 

server.listen({
    port: 3000
})

.then( () => {console.log("o servidor iniciado com exito.")} )
