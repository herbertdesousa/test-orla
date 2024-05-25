import { CacheDatasource } from './CacheDatasource';

export class InMemoryCacheDatasource<Data> implements CacheDatasource<Data> {
  private cache: Record<string, Data> = {};

  clear() {
    this.cache = {};
  }

  checkEmpty(): boolean {
    return Object.entries(this.cache).length === 0;
  }

  set(key: string, cache: Data) {
    this.cache[key] = cache;
  }

  get(key: string) {
    return this.cache[key] || null;
  }

  remove(key: string): void {
    delete this.cache[key];
  }
}
