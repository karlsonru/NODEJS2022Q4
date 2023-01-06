import url from 'url';
import { IncomingMessage, ServerResponse } from 'http';

export function router(req: IncomingMessage, res: ServerResponse) { 
  const headers = {'Content-Type': 'application/json'};

  res.on('error', (err) => {
    console.log('Catch error');
    console.log(err);
    res.statusCode = 500;
    res.end('Error');
    return;
  })

  try {
    if (!req.url) {
      console.log('URL: ', req.url);
      console.log(!req.url);
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }
  
    if (req.url.startsWith('/api/users')) {
      console.log('METHOD: ', req.method);
      switch(req.method) {
        case 'GET':
          res.statusCode = 200;
          res.end('GET');
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
          break;
      }
    } else {
      res.statusCode = 404;
      res.end('No such route');
      return;
    }
  } catch (err) {
    res.statusCode = 500;
    res.end('Internal server error');
  } finally {
    return;
  }
}
