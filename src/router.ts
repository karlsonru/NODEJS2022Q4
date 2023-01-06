import { IncomingMessage, ServerResponse } from 'http';
import { ControllerUsers } from './controllerUsers.js';
import { Service } from './service.js';

const service = new Service([]);
const controller = new ControllerUsers(service);

export function router(req: IncomingMessage, res: ServerResponse) { 
  try {
    if (!req.url) {
      console.log('URL: ', req.url);
      console.log(!req.url);

      res.statusCode = 400;
      res.end('Bad request');
      return;
    }  
  
    if (req.url.startsWith('/api/users')) {
      switch(req.method) {
        case 'GET':
          controller.get(req, res);
          break;
        case 'POST':
          res.statusCode = 201;
          res.end('POST');
          break;
        case 'PUT':
          res.statusCode = 200;
          res.end('PUT');
          break;
        case 'DELETE':
          res.statusCode = 204;
          res.end('DELETE');
          break;
        default:
          res.statusCode = 400;
          res.end('Unsupported method');
      }
    } else {
      console.log('else execute');
      res.statusCode = 404;
      res.end('No such route');
    }
  } catch (err) {
    res.statusCode = 500;
    res.end('Internal Error');
  } finally {
    return;
  }
}
