export interface CacheDatasource<Data> {
  clear(): void;

  set(cache: Data): void;

  get(): Data | null;
}
