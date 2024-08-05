import type { ActionEvent } from "@babylonjs/core/Actions/actionEvent";
import type { KeyboardInfo } from "@babylonjs/core/Events/keyboardEvents";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Nullable } from "@babylonjs/core/types";

export type SceneHandlerEventName = "hotspotSelect" | "meshSelect" | "parentSelect" | "selectDismiss";

export type SceneHandlerEvent<
  E extends SceneHandlerEventName = SceneHandlerEventName,
> = {
  actionEvent?: ActionEvent;
  extra?: Record<string, unknown>;
  keyboardInfo?: KeyboardInfo;
  sourceEvent?: PointerEvent;
  target: Nullable<AbstractMesh> | Nullable<AbstractMesh>[];
  type: E;
};

export type SceneHandlerEventHandler<
  E extends SceneHandlerEventName = SceneHandlerEventName,
> = (event: SceneHandlerEvent<E>) => void;

export class SceneHandlerEventsHandler {
  private _eventListeners: Map<
    SceneHandlerEventName,
    Set<SceneHandlerEventHandler>
  >;

  constructor() {
    this._eventListeners = new Map();
  }

  protected dispatchEvent<
    E extends SceneHandlerEventName = SceneHandlerEventName,
  >(event: SceneHandlerEvent<E>): void {
    const listeners = this._eventListeners.get(event.type);

    if (listeners) {
      for (const listener of listeners) listener({
        ...event,
        sourceEvent: event.actionEvent?.sourceEvent as PointerEvent,
      });
    }
  }

  public addEventListeners<
    E extends SceneHandlerEventName = SceneHandlerEventName,
  >(eventName: E, callback: SceneHandlerEventHandler<E>): void {
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, new Set());
    }

    this._eventListeners.get(eventName)?.add(
      callback as SceneHandlerEventHandler
    );
  }

  public removeEventListeners<
    E extends SceneHandlerEventName = SceneHandlerEventName,
  >(eventName: E, callback: SceneHandlerEventHandler<E>): void {
    this._eventListeners.get(eventName)?.delete(
      callback as SceneHandlerEventHandler
    );
  }
}
