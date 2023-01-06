import { IncomingMessage, ServerResponse } from 'http';
import { Service } from './service.js';
import { getId, isValidId } from './middlewares.js';

export class ControllerUsers {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  get(req: IncomingMessage, res: ServerResponse) {
    const id = getId(req);

    if (id && isValidId(id)) {
      const user = this.service.getOne(id);

      if (user === undefined) {
        res.statusCode = 404;
        res.end('Doesn\'t exists');
        return;
      }

      res.statusCode = 200;
      res.end(user);

      return;
    } else if (id) {
      res.statusCode = 400;
      res.end('Invalid id format');
      return;
    }

    const users = this.service.getAll();
    res.statusCode = 200;
    res.end(users);
    return;
  }

}
