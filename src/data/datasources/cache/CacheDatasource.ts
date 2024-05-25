export interface CacheDatasource<Data> {
  clear(): void;

  remove(key: string): void;

  set(key: string, cache: Data): void;

  get(key: string): Data | null;

  checkEmpty(): boolean;
}
