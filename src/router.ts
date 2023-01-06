import { IncomingMessage, ServerResponse } from 'http';
import { ControllerUsers } from './controllerUsers.js';
import { Service } from './service.js';

const service = new Service([]);
const controller = new ControllerUsers(service);

export async function router(req: IncomingMessage, res: ServerResponse) { 
  res.setHeader('Content-Type', 'application/json');

  try {    
    if (!req.url?.startsWith('/api/users')) {      
      res.statusCode = 404;
      res.end('No such route');
      return;
    }

    switch(req.method) {
      case 'GET':
        controller.get(req, res);
        break;
      case 'POST':
        await controller.post(req, res);
        break;
      case 'PUT':
        await controller.put(req, res);
        break;
      case 'DELETE':
        controller.delete(req, res);
        break;
      default:
        res.statusCode = 400;
        res.end('Unsupported or unknown method');
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Error');
  }
}
