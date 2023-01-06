var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getId, isValidId, getBody, isValidBody } from './middlewares.js';
export class ControllerUsers {
    constructor(service) {
        this.service = service;
    }
    get(req, res) {
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
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield getBody(req);
            if (!isValidBody(body)) {
                res.statusCode = 400;
                res.end('Invalid payload');
                return;
            }
            const newUser = this.service.create(body);
            res.statusCode = 201;
            res.end(JSON.stringify(newUser));
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const body = yield getBody(req);
            if (!isValidBody(body)) {
                res.statusCode = 400;
                res.end('Invalid payload');
                return;
            }
            const user = this.service.update(Object.assign({ id }, body));
            res.statusCode = 200;
            res.end(JSON.stringify(user));
        });
    }
    delete(req, res) {
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
