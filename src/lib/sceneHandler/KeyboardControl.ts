import {
  KeyboardEventTypes,
  type KeyboardInfo,
} from "@babylonjs/core/Events/keyboardEvents";
import { type Observer } from "@babylonjs/core/Misc/observable";
import { type Scene } from "@babylonjs/core/scene";
import { type Nullable } from "@babylonjs/core/types";

export class KeyboardControl {
  private _scene: Scene;
  private _observable: Nullable<Observer<KeyboardInfo>> = null;
  private _escapePressed: boolean = false;
  private _altPressed: boolean = false;
  private _shiftPressed: boolean = false;
  private _controlPressed: boolean = false;
  private _onScapePressed: () => void = () => {};

  constructor(scene: Scene) {
    this._scene = scene;
    this._observable = this._scene.onKeyboardObservable.add(
      this._onKeyboardObservable
    );
  }

  public dispose(): void {
    if (this._observable) {
      this._scene.onKeyboardObservable.remove(this._observable);
      this._observable = null;
    }
  }

  public onEscapePressed(callback: () => void): void {
    this._onScapePressed = callback;
  }

  public get escapePressed(): boolean {
    return this._escapePressed;
  }

  public get altPressed(): boolean {
    return this._altPressed;
  }

  public get shiftPressed(): boolean {
    return this._shiftPressed;
  }

  public get controlPressed(): boolean {
    return this._controlPressed;
  }

  private _onKeyboardObservable = ({ event, type }: KeyboardInfo) => {
    switch (event.key) {
      case "Escape":
        this._escapePressed = type === KeyboardEventTypes.KEYDOWN;
        if (this._escapePressed) this._onScapePressed();
        break;
      case "Alt":
        this._altPressed = type === KeyboardEventTypes.KEYDOWN;
        break;
      case "Shift":
        this._shiftPressed = type === KeyboardEventTypes.KEYDOWN;
        break;
      case "Control":
        this._controlPressed = type === KeyboardEventTypes.KEYDOWN;
        break;
      default:
        return;
    }
  };
}
