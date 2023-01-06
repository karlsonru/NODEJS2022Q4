var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ControllerUsers } from './controllerUsers.js';
import { Service } from './service.js';
const service = new Service([]);
const controller = new ControllerUsers(service);
export function router(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        res.setHeader('Content-Type', 'application/json');
        try {
            if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/users'))) {
                res.statusCode = 404;
                res.end('Route doesn\'t exist');
                return;
            }
            switch (req.method) {
                case 'GET':
                    controller.get(req, res);
                    break;
                case 'POST':
                    yield controller.post(req, res);
                    break;
                case 'PUT':
                    yield controller.put(req, res);
                    break;
                case 'DELETE':
                    controller.delete(req, res);
                    break;
                default:
                    res.statusCode = 400;
                    res.end('Unsupported or unknown method');
            }
        }
        catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Internal Error');
        }
    });
}
