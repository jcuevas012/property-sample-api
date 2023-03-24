export default abstract class BaseRepository<T, I> {
  abstract identifier: string;

  constructor() {
    Object.setPrototypeOf(this, BaseRepository.prototype);
  }

  abstract insert(data: I): Promise<T>;
  abstract update(id: number, data: I): Promise<T>;
  abstract findOne(id: number): Promise<T | null>;
  abstract delete(id: number): void;
  abstract findAll(options: unknown): Promise<T[]>;
  abstract getName(): string;
}
