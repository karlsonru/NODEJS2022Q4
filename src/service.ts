import { randomUUID } from "crypto";

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies?: string[];
}

export class Service {
  db: IUser[];

  constructor(db: IUser[]) {
    this.db = db;
  }

  getOne(id: string) {
    return this.db.find((user) => user.id === id);
  }
  
  getAll() {
    return this.db;
  }

  create(user: Omit<IUser, 'id'>) {
    const newUser = { id: randomUUID(), ...user }
    this.db.push(newUser);
    return newUser;
  }

  update(user: IUser) {
    const idx = this.db.findIndex((oldUser) => oldUser.id === user.id);
    this.db[idx] = { ...this.db[idx], ...user }
    // this.db.splice(idx, 1, user);
    return this.db[idx];
  }

  delete(id: string) {
    const idx = this.db.findIndex((user) => user.id === id);
    this.db.splice(idx, 1);
  }
}