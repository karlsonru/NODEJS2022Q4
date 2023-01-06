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
}