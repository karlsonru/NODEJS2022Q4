import { IncomingMessage } from 'http';
import { validate } from 'uuid';

export function getId(req: IncomingMessage) {
  if (!req.url) return;
  if (req.url.split('/').length !== 3) return;

  return req.url.split('/').slice(-1)[0];
}

export function isValidId(id: string) {
  return validate(id);
} 