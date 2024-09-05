import { useDatabase } from "@sceneforge/data";
import { cloneHotspot, type EngineController } from "@sceneforge/scene";
import {
  type FormPaneRef,
  type PopoverFormPaneRef,
  type PopoverRef,
  useCurrentId,
} from "@sceneforge/ui";
import {
  type MouseEvent as ReactMouseEvent,
  type Ref,
  type RefObject,
  useActionState,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export interface HotspotPopoverRef extends PopoverFormPaneRef {
  get hotspotMesh(): string | undefined;
  get mesh(): string | undefined;
  set hotspotMesh(mesh: string | undefined);
  set mesh(mesh: string | undefined);
}

export type UseHotspotPopoverProps = {
  defaultDescription?: string;
  defaultDistance?: number;
  defaultLabel?: string;
  defaultUrl?: string;
  engineControllerRef?: RefObject<EngineController | null>;
  id?: string;
  ref?: Ref<HotspotPopoverRef>;
  sceneId: number;
};

export type HotspotFormState = {
  currentFormId: string;
  hotspotId?: number;
  hotspotMesh?: string;
  isNew: boolean;
  mesh?: string;
  sceneId?: number;
};

export const useHotspotPopover = ({
  defaultLabel,
  engineControllerRef,
  id,
  ref,
  sceneId,
}: UseHotspotPopoverProps) => {
  const db = useDatabase();
  const currentId = useCurrentId(id);

  const popoverFormPaneRef = useRef<PopoverFormPaneRef>(null);

  const [hotspotMesh, setHotspotMesh] = useState<string | undefined>();
  const [mesh, setMesh] = useState<string | undefined>();

  const currentFormId = useMemo(() => `${currentId}-form`, [currentId]);
  const isNew = useMemo(() => Boolean(defaultLabel), [defaultLabel]);

  const formAction = useCallback(async (
    state: HotspotFormState,
    payload?: FormData
  ) => {
    const description = payload?.get("hotspot-description")?.toString() ?? "";
    const distance = Number.parseFloat(payload?.get("hotspot-distance")?.toString() ?? "1");
    const label = payload?.get("hotspot-label")?.toString() ?? "";
    const url = payload?.get("hotspot-url")?.toString() ?? "";

    const now = new Date();
    const result = await db?.hotspot.put({
      createdAt: now,
      description,
      distance,
      label,
      sceneId,
      updatedAt: now,
      url,
    });

    if (
      engineControllerRef?.current
      && mesh
      && hotspotMesh
    ) {
      const engineController = engineControllerRef.current;
      /**
       * @todo handle the cloned hotspot mesh
       */
      cloneHotspot(engineController.scene, hotspotMesh, {
        id: `hotspot-${sceneId}-${result}`,
        name: `hotspot-${sceneId}-${result}`,
        parent: mesh,
        visible: true,
      });
    }

    popoverFormPaneRef.current?.hide();

    setMesh(undefined);
    setHotspotMesh(undefined);

    return {
      ...state,
      hotspotId: result,
      sceneId,
    };
  }, [db?.hotspot, sceneId, engineControllerRef, mesh, hotspotMesh]);

  const [formState, handleFormAction] = useActionState<HotspotFormState>(
    formAction,
    {
      currentFormId,
      isNew,
    }
  );

  const clearHotspotPopover = useCallback(() => {
    setHotspotMesh(undefined);
    setMesh(undefined);
    if (popoverFormPaneRef.current) {
      popoverFormPaneRef.current?.reset();
    }
  }, [popoverFormPaneRef]);

  const currentTitle = useMemo(() => {
    return isNew ? "Edit Hotspot" : "New Hotspot";
  }, [isNew]);

  const currentSubmitLabel = useMemo(() => {
    return isNew ? "Update" : "Create";
  }, [isNew]);

  useImperativeHandle(ref, () => new (class implements HotspotPopoverRef {
    focus(): void {
      popoverFormPaneRef.current?.focus();
    }

    hide(): void {
      popoverFormPaneRef.current?.hide();
    }

    position(x: number, y: number): void {
      popoverFormPaneRef.current?.position(x, y);
    }

    reset(): void {
      clearHotspotPopover();
    }

    show(): void {
      popoverFormPaneRef.current?.show();
    }

    showPosition(
      event: PointerEvent | ReactMouseEvent<HTMLElement, MouseEvent>
    ): void {
      popoverFormPaneRef.current?.showPosition(event);
    }

    submit(): void {
      popoverFormPaneRef.current?.submit();
    }

    get element(): HTMLDivElement | undefined {
      return popoverFormPaneRef.current?.element;
    };

    get form(): HTMLFormElement | null {
      return popoverFormPaneRef.current?.form ?? null;
    }

    get formPane(): FormPaneRef | null {
      return popoverFormPaneRef.current?.formPane ?? null;
    };

    get hotspotMesh() {
      return hotspotMesh;
    };

    set hotspotMesh(mesh: string | undefined) {
      setHotspotMesh(mesh);
    }

    get mesh() {
      return mesh;
    }

    set mesh(mesh: string | undefined) {
      setMesh(mesh);
    }

    get pane(): HTMLDivElement | null {
      return popoverFormPaneRef.current?.pane ?? null;
    }

    get popover(): null | PopoverRef {
      return popoverFormPaneRef.current?.popover ?? null;
    }
  })(), [clearHotspotPopover, hotspotMesh, mesh, popoverFormPaneRef]);

  return {
    currentFormId,
    currentId,
    currentSubmitLabel,
    currentTitle,
    formState,
    handleFormAction,
    isNew,
    popoverFormPaneRef,
  };
};
