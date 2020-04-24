import { Deserializable } from '../interfaces/deserializable.interface';

export class User implements Deserializable {
  name: string;

  constructor(userData: any = {}) {
    this.name = userData.name || 'Stranger';
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
