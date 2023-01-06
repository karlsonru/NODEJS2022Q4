import http from 'http';
import dotenv from 'dotenv';
import { router } from './router.js';

dotenv.config();

const PORT = process.env.PORT ?? 8081;

const server = http.createServer(router);

server.listen(PORT);

