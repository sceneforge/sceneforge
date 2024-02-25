export type ObjectStores = Record<string, IDBObjectStoreParameters>;

export class Database<
  Name extends string = string,
  Store extends ObjectStores = ObjectStores
> {
  private _dbName: Name;
  private _factory: IDBOpenDBRequest;
  private _db: IDBDatabase | null = null;
  private _ready: boolean;
  private _ongoingSet: Promise<IDBValidKey> | null = null;

  public static SupportIndexedDB() {
    return (
      "indexedDB" in window &&
      "IDBFactory" in window &&
      window.indexedDB instanceof window.IDBFactory
    );
  }

  constructor(dbName: Name, stores: Store) {
    this._ready = false;
    if (!Database.SupportIndexedDB())
      throw new Error("IndexedDB not supported");

    this._dbName = dbName;

    this._factory = window.indexedDB.open(this._dbName, undefined);
    this._factory.onupgradeneeded = (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        const db = event.target.result;
        for (const name in stores) {
          db.createObjectStore(name, stores[name]);
        }
      }
    };

    this._factory.onsuccess = (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        this._db = event.target.result;
        this._ready = true;
      }
    };

    this._factory.onerror = (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        this._ready = false;
        if (event.target.error instanceof DOMException) {
          throw event.target.error;
        } else {
          throw new Error("IndexedDB error", {
            cause: event.target.error,
          });
        }
      }
    };
  }

  private _get(store: string, key: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        reject(new Error("Database not open"));
        return;
      }
      const transaction = this._db.transaction(store, "readonly");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);
      request.onsuccess = () => {
        resolve((request.result as Record<string, unknown> | undefined)?.value);
      };

      request.onerror = () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        } else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      };
    });
  }

  public get ready() {
    return this._ready;
  }

  public get(store: string, key: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this._ready) {
        setTimeout(() => {
          this._get(store, key).then(resolve).catch(reject);
        }, 500);
      } else {
        this._get(store, key).then(resolve).catch(reject);
      }
    });
  }

  public setLast(
    store: string,
    key: string,
    value: string
  ): Promise<IDBValidKey> {
    if (this._ongoingSet && this._ready && this._db) {
      const transaction = this._db.transaction(store, "readwrite");
      transaction.abort();
      this._ongoingSet = null;
    }
    this._ongoingSet = this.set(store, key, value);
    return this._ongoingSet;
  }

  public set(store: string, key: string, value: string): Promise<IDBValidKey> {
    this._ongoingSet = new Promise((resolve, reject) => {
      if (!this._db) {
        reject(new Error("Database not open"));
        return;
      }

      const transaction = this._db.transaction(store, "readwrite");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put({ key, value });
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        } else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      };
    });
    return this._ongoingSet;
  }
}
