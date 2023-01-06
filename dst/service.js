import { randomUUID } from "crypto";
export class Service {
    constructor(db) {
        this.db = db;
    }
    getOne(id) {
        return this.db.find((user) => user.id === id);
    }
    getAll() {
        return this.db;
    }
    create(user) {
        const newUser = Object.assign({ id: randomUUID() }, user);
        this.db.push(newUser);
        return newUser;
    }
    update(user) {
        const idx = this.db.findIndex((oldUser) => oldUser.id === user.id);
        this.db[idx] = user;
        return this.db[idx];
    }
    delete(id) {
        const idx = this.db.findIndex((user) => user.id === id);
        this.db.splice(idx, 1);
    }
}
