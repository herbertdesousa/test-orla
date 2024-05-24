export class CacheDatasource<Data> {
  private cache: null | Data = null;

  clear() {
    this.cache = null;
  }

  set(cache: Data) {
    this.cache = cache;
  }

  get() {
    return this.cache;
  }
}
