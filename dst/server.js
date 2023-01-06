var _a;
import http from 'http';
import dotenv from 'dotenv';
import { router } from './router.js';
dotenv.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
const server = http.createServer(router);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
