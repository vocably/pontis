export type StorageType = 'sync' | 'local';
export type Storage = typeof chrome.storage.sync | typeof chrome.storage.local;

const keyPrefix = '@Auth_';

const createStorageKey = (key: string): string => `${keyPrefix}${key}`;

const isStorageKey = (key: string): boolean => key.startsWith(keyPrefix);

const getKey = (storageKey: string): string =>
  storageKey.replace(keyPrefix, '');

export const setItems = (
  storage: Storage,
  items: Record<string, string>
): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      storage.set(
        Object.entries(items).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [createStorageKey(key)]: value,
          }),
          {}
        ),
        resolve
      );
    } catch (e) {
      reject(e);
    }
  });

export const removeItems = (storage: Storage, keys: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      storage.remove(keys.map(createStorageKey), resolve);
    } catch (e) {
      reject(e);
    }
  });

const get = (storage: Storage): Promise<{ [key: string]: any }> =>
  new Promise((resolve, reject) => {
    try {
      storage.get(resolve);
    } catch (e) {
      reject(e);
    }
  });

export const getAll = (storage: Storage) =>
  get(storage).then((data) =>
    Object.entries(data).reduce((acc, [storageKey, value]) => {
      if (!isStorageKey(storageKey)) {
        return acc;
      }

      return {
        ...acc,
        [getKey(storageKey)]: value,
      };
    }, {})
  );

export const clearAll = (storage: Storage): Promise<void> =>
  get(storage).then(
    (allData) =>
      new Promise((resolve, reject) => {
        try {
          storage.remove(Object.keys(allData).filter(isStorageKey), resolve);
        } catch (e) {
          reject(e);
        }
      })
  );
