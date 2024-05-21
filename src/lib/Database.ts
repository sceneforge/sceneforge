export type ObjectStores = Record<string, IDBObjectStoreParameters>;

export class Database<
  Name extends string = string,
  Store extends ObjectStores = ObjectStores,
> {
  private _dbName: Name;
  private _factory: IDBOpenDBRequest;
  private _db: IDBDatabase | undefined = undefined;
  private _ready: boolean;
  private _ongoingSet: Promise<IDBValidKey | void> | undefined = undefined;

  public static SupportIndexedDB() {
    return (
      "indexedDB" in self
      && "IDBFactory" in self
      && self.indexedDB instanceof self.IDBFactory
    );
  }

  constructor(databaseName: Name, stores: Store) {
    this._ready = false;
    if (!Database.SupportIndexedDB())
      throw new Error("IndexedDB not supported");

    this._dbName = databaseName;

    this._factory = self.indexedDB.open(this._dbName);

    this._factory.addEventListener("upgradeneeded", (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        const database = event.target.result;
        for (const name in stores) {
          database.createObjectStore(name, stores[name]);
        }
      }
    });

    this._factory.addEventListener("success", (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        this._db = event.target.result;
        this._ready = true;
      }
    });

    this._factory.addEventListener("error", (event) => {
      if (event.target instanceof IDBOpenDBRequest) {
        this._ready = false;
        const error
          = event.target.error instanceof DOMException
            ? event.target.error
            : new TypeError("IndexedDB error", {
              cause: event.target.error,
            });
        throw error;
      }
    });
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
      request.addEventListener("success", () => {
        resolve((request.result as Record<string, unknown> | undefined)?.value);
      });

      request.addEventListener("error", () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        }
        else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      });
    });
  }

  private _getAll(store: string): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        reject(new Error("Database not open"));
        return;
      }
      const transaction = this._db.transaction(store, "readonly");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.getAll();
      request.onsuccess = () => {
        resolve(
          (request.result as Record<"value" | "key", unknown>[]).map(
            r => r.value
          )
        );
      };

      request.addEventListener("error", () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        }
        else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      });
    });
  }

  public get ready() {
    return this._ready;
  }

  public get(store: string, key: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (this._ready) {
        this._get(store, key).then(resolve)
          .catch(reject);
      }
      else {
        setTimeout(() => {
          this._get(store, key).then(resolve)
            .catch(reject);
        }, 500);
      }
    });
  }

  public getAll(store: string): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      if (this._ready) {
        this._getAll(store).then(resolve)
          .catch(reject);
      }
      else {
        setTimeout(() => {
          this._getAll(store).then(resolve)
            .catch(reject);
        }, 500);
      }
    });
  }

  public setLast<T = unknown>(
    store: string,
    key: string,
    value: T
  ): Promise<IDBValidKey> {
    if (this._ongoingSet && this._ready && this._db) {
      const transaction = this._db.transaction(store, "readwrite");
      transaction.abort();
      this._ongoingSet = undefined;
    }
    this._ongoingSet = this.set(store, key, value);
    return this._ongoingSet as Promise<IDBValidKey>;
  }

  public set<T = unknown>(
    store: string,
    key: string,
    value: T
  ): Promise<IDBValidKey> {
    this._ongoingSet = new Promise((resolve, reject) => {
      if (!this._db) {
        reject(new Error("Database not open"));
        return;
      }

      const transaction = this._db.transaction(store, "readwrite");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put({ key, value });

      request.addEventListener("success", () => {
        resolve(request.result);
      });

      request.addEventListener("error", () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        }
        else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      });
    });

    return this._ongoingSet as Promise<IDBValidKey>;
  }

  public remove(store: string, key: string): Promise<void> {
    if (this._ongoingSet && this._ready && this._db) {
      const transaction = this._db.transaction(store, "readwrite");
      transaction.abort();
      this._ongoingSet = undefined;
    }

    this._ongoingSet = new Promise((resolve, reject) => {
      if (!this._db) {
        reject(new Error("Database not open"));
        return;
      }

      const transaction = this._db.transaction(store, "readwrite");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.delete(key);

      request.addEventListener("success", () => {
        resolve();
      });

      request.addEventListener("error", () => {
        if (request.error instanceof DOMException) {
          reject(request.error);
        }
        else {
          reject(
            new Error("Request error", {
              cause: request.error,
            })
          );
        }
      });
    });

    return this._ongoingSet as Promise<void>;
  }
}
