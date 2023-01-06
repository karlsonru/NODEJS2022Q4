import { IncomingMessage } from 'http';
import { validate } from 'uuid';

export function getId(req: IncomingMessage) {
  if (!req.url || req.url.split('/').length !== 4) return;

  return req.url.split('/').slice(-1)[0];
}

export function isValidId(id: string) {
  return validate(id);
} 

export async function getBody(req: IncomingMessage) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  return JSON.parse(data);
}

interface IBody {
  [index: string]: string | string[] | number;
}

export function isValidBody(data: IBody) {
  if (!data.username || typeof data.username !== 'string') return;
  if (!data.age || Number.isNaN(data.age)) return;
  if (!data.hobbies || !Array.isArray(data.hobbies)) return;

  const validFields = new Set(['username', 'age', 'hobbies']);
  for (let i in data) {
    if (validFields.has(i)) continue;
    return;
  }

  return true;
}
