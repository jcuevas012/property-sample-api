export default abstract class BaseRepository<T, I> {
  abstract name: string;

  constructor() {
    Object.setPrototypeOf(this, BaseRepository.prototype);
  }

  abstract insert(data: I): T;
  abstract update(data: I): T;
  abstract findOne(id: string): T;
  abstract findAll(options: unknown): T[];
  abstract getName(): string;
}
