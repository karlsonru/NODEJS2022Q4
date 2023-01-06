import { IncomingMessage, ServerResponse } from 'http';
import { Service } from './service.js';
import { getId, isValidId, getBody, isValidBody } from './middlewares.js';

export class ControllerUsers {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  get(req: IncomingMessage, res: ServerResponse) {
    const id = getId(req);

    if (!id) {
      const users = this.service.getAll();

      res.statusCode = 200;
      res.end(JSON.stringify(users));
      return;
    }

    if (!isValidId(id)) {
      res.statusCode = 400;
      res.end('Invalid id format');
      return;
    }

    const user = this.service.getOne(id);

    if (user === undefined) {
      res.statusCode = 404;
      res.end('Doesn\'t exist');
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(user));
  }

  async post(req: IncomingMessage, res: ServerResponse) {
    const body =  await getBody(req);
   
    if (!isValidBody(body)) {
        res.statusCode = 400;
        res.end('Invalid payload');
        return;
    }
  
    const newUser = this.service.create(body);

    res.statusCode = 201;
    res.end(JSON.stringify(newUser));
  }

  async put(req: IncomingMessage, res: ServerResponse) {
    const id = getId(req);

    if (!id) {
      res.statusCode = 400;
      res.end('Id required');
      return; 
    }

    if (!isValidId(id)) {
      res.statusCode = 400;
      res.end('Invalid id format');
      return;
    }

    const isExists = this.service.getOne(id);

    if (!isExists) {
      res.statusCode = 404;
      res.end('Doesn\'t exist');
      return;
    }

    const body =  await getBody(req);

    if (!isValidBody(body)) {
      res.statusCode = 400;
      res.end('Invalid payload');
      return;
    }

    const user = this.service.update({ id, ...body });
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  }

  delete(req: IncomingMessage, res: ServerResponse) {
    const id = getId(req);

    if (!id) {
      res.statusCode = 400;
      res.end('Id required');
      return; 
    }

    if (!isValidId(id)) {
      res.statusCode = 400;
      res.end('Invalid id format');
      return;
    }

    const isExists = this.service.getOne(id);

    if (!isExists) {
      res.statusCode = 404;
      res.end('Doesn\'t exist');
      return;
    }

    this.service.delete(id);
    res.statusCode = 204;
    res.end();
  }
}
