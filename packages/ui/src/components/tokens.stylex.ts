import * as stylex from '@stylexjs/stylex';

export const MEDIA_DARK = "@media (prefers-color-scheme: dark)";
export const MEDIA_CONTROL_OVERLAY = "@media (display-mode: window-controls-overlay)";
export const FROM_SM = "@media only screen and (min-width: 576px)";
export const FROM_MD = "@media only screen and (min-width: 768px)";
export const FROM_LG = "@media only screen and (min-width: 992px)";
export const FROM_XL = "@media only screen and (min-width: 1200px)";
export const FROM_XXL = "@media only screen and (min-width: 1400px)";
export const TO_SM = "@media only screen and (max-width: 575.98px)";
export const TO_MD = "@media only screen and (max-width: 767.98px)";
export const TO_LG = "@media only screen and (max-width: 991.98px)";
export const TO_XL = "@media only screen and (max-width: 1199.98px)";
export const TO_XXL = "@media only screen and (max-width: 1399.98px)";
export const ONLY_SM = "@media only screen and (min-width: 576px) and (max-width: 767.98px)";
export const ONLY_MD = "@media only screen and (min-width: 768px) and (max-width: 991.98px)";
export const ONLY_LG = "@media only screen and (min-width: 992px) and (max-width: 1199.98px)";
export const ONLY_XL = "@media only screen and (min-width: 1200px) and (max-width: 1399.98px)";
export const ONLY_XXL = "@media only screen and (min-width: 1400px)";
export const FROM_SM_TO_LG = "@media only screen and (min-width: 576px) and (max-width: 991.98px)";
export const FROM_SM_TO_XL = "@media only screen and (min-width: 576px) and (max-width: 1199.98px)";
export const FROM_SM_TO_XXL = "@media only screen and (min-width: 576px) and (max-width: 1399.98px)";
export const FROM_MD_TO_XL = "@media only screen and (min-width: 768px) and (max-width: 1199.98px)";
export const FROM_MD_TO_XXL = "@media only screen and (min-width: 768px) and (max-width: 1399.98px)";
export const FROM_LG_TO_XXL = "@media only screen and (min-width: 992px) and (max-width: 1399.98px)";

export const typography = stylex.defineVars({
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSizeDefault: "1rem",
});

export const color = stylex.defineVars({
  background: {
    default: "#fff",
    [MEDIA_DARK]: "#000",
  },
  foreground: {
    default: "#000",
    [MEDIA_DARK]: "#fff",
  },
  accent: "rgb(0 110 80 / 1)",
  danger: "rgb(179 15 15 / 1)",
  info: "rgb(28 69 173 / 1)",
  primary: "#86159d",
  success: "rgb(19 172 19 / 1)",
  warning: "rgb(209 165 18 / 1)",
  primaryText: "#fff",
  accentText: "#fff",
  dangerText: "#fff",
  infoText: "#fff",
  successText: "#fff",
  warningText: "#000",
});

export const backgroundColor = stylex.defineVars({
  default: color.background,
  alpha05: `color-mix(in srgb, ${color.background} 5%, transparent)`,
  alpha10: `color-mix(in srgb, ${color.background} 10%, transparent)`,
  alpha15: `color-mix(in srgb, ${color.background} 15%, transparent)`,
  alpha20: `color-mix(in srgb, ${color.background} 20%, transparent)`,
  alpha25: `color-mix(in srgb, ${color.background} 25%, transparent)`,
  alpha30: `color-mix(in srgb, ${color.background} 30%, transparent)`,
  alpha35: `color-mix(in srgb, ${color.background} 35%, transparent)`,
  alpha40: `color-mix(in srgb, ${color.background} 40%, transparent)`,
  alpha45: `color-mix(in srgb, ${color.background} 45%, transparent)`,
  alpha50: `color-mix(in srgb, ${color.background} 50%, transparent)`,
  alpha55: `color-mix(in srgb, ${color.background} 55%, transparent)`,
  alpha60: `color-mix(in srgb, ${color.background} 60%, transparent)`,
  alpha65: `color-mix(in srgb, ${color.background} 65%, transparent)`,
  alpha70: `color-mix(in srgb, ${color.background} 70%, transparent)`,
  alpha75: `color-mix(in srgb, ${color.background} 75%, transparent)`,
  alpha80: `color-mix(in srgb, ${color.background} 80%, transparent)`,
  alpha85: `color-mix(in srgb, ${color.background} 85%, transparent)`,
  alpha90: `color-mix(in srgb, ${color.background} 90%, transparent)`,
  alpha95: `color-mix(in srgb, ${color.background} 95%, transparent)`,
});

export const titleBar = stylex.defineVars({
  appTitleBarHeight: {
    default: "2.5rem",
    [MEDIA_CONTROL_OVERLAY]: "env(title-bar-height)"
  },
  appTitleBarWidth: {
    default: "100%",
    [MEDIA_CONTROL_OVERLAY]: "env(title-bar-width)"
  },
  appTitleBarInsetInlineStart: {
    default: 0,
    [MEDIA_CONTROL_OVERLAY]: "env(titlebar-area-x)"
  },
  appTitleBarInsetBlockStart: {
    default: 0,
    [MEDIA_CONTROL_OVERLAY]: "env(titlebar-area-y)"
  },
});

export const icons = stylex.defineVars({
  add: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z'/%3E%3C/svg%3E")`,
  addCircle: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22'/%3E%3C/svg%3E")`,
  arrowSelectorTool: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m13.775 22l-3.625-7.8L6 20V2l14 11h-7.1l3.6 7.725z'/%3E%3C/svg%3E")`,
  camera: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m11.2 8.375l3.5-6q2.275.6 4.038 2.2t2.562 3.8zm-2.775 2.5L5 4.875q1.35-1.325 3.138-2.1T12 2q.325 0 .75.038t.775.087zm-6.1 3.625q-.15-.6-.238-1.225T2 12q0-1.775.575-3.35T4.2 5.775L9.25 14.5zm7 7.125q-2.275-.6-4.05-2.2t-2.575-3.8h10.075zM12 22q-.375 0-.763-.05t-.737-.1l5.075-8.725l3.425 6q-1.35 1.325-3.137 2.1T12 22m7.8-3.775L14.75 9.5h6.925q.15.6.238 1.225T22 12q0 1.75-.612 3.35T19.8 18.225'/%3E%3C/svg%3E")`,
  cameraSwitch: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M8 17q-.825 0-1.412-.587T6 15V9q0-.825.588-1.412T8 7h1l1-1h4l1 1h1q.825 0 1.413.588T18 9v6q0 .825-.587 1.413T16 17zm4-3q.825 0 1.413-.587T14 12t-.587-1.412T12 10t-1.412.588T10 12t.588 1.413T12 14M8.55.5Q9.4.225 10.263.113T12 0q2.35 0 4.438.838t3.7 2.325t2.637 3.5T24 11h-2q-.175-1.8-.95-3.363t-1.988-2.762t-2.787-1.937T12.9 2.05l1.55 1.55l-1.4 1.4zm6.9 23q-.85.275-1.712.388T12 24q-2.35 0-4.437-.837t-3.7-2.325t-2.638-3.5T0 13h2q.2 1.8.963 3.363t1.975 2.762t2.787 1.938t3.375.887L9.55 20.4l1.4-1.4z'/%3E%3C/svg%3E")`,
  close: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z'/%3E%3C/svg%3E")`,
  delete: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z'/%3E%3C/svg%3E")`,
  deployedCode: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 21.725L4 17.7q-.475-.275-.737-.725t-.263-1v-7.95q0-.55.263-1T4 6.3l7-4.025Q11.475 2 12 2t1 .275L20 6.3q.475.275.738.725t.262 1v7.95q0 .55-.262 1T20 17.7l-7 4.025Q12.525 22 12 22t-1-.275m0-9.15v6.85L12 20l1-.575v-6.85L19 9.1V8.05l-1.075-.625L12 10.85L6.075 7.425L5 8.05V9.1z'/%3E%3C/svg%3E")`,
  deployedCodeSharp: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m12 22.3l-9-5.175V6.875L12 1.7l9 5.175v10.25zm-1-9.725v6.85L12 20l1-.575v-6.85L19 9.1V8.05l-1.075-.625L12 10.85L6.075 7.425L5 8.05V9.1z'/%3E%3C/svg%3E")`,
  dragIndicator: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9 20q-.825 0-1.412-.587T7 18t.588-1.412T9 16t1.413.588T11 18t-.587 1.413T9 20m6 0q-.825 0-1.412-.587T13 18t.588-1.412T15 16t1.413.588T17 18t-.587 1.413T15 20m-6-6q-.825 0-1.412-.587T7 12t.588-1.412T9 10t1.413.588T11 12t-.587 1.413T9 14m6 0q-.825 0-1.412-.587T13 12t.588-1.412T15 10t1.413.588T17 12t-.587 1.413T15 14M9 8q-.825 0-1.412-.587T7 6t.588-1.412T9 4t1.413.588T11 6t-.587 1.413T9 8m6 0q-.825 0-1.412-.587T13 6t.588-1.412T15 4t1.413.588T17 6t-.587 1.413T15 8'/%3E%3C/svg%3E")`,
  expandLess: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m12 10.775l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.15-.15.325-.213T12 8.4t.375.063t.325.212l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'/%3E%3C/svg%3E")`,
  expandMore: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 14.95q-.2 0-.375-.062t-.325-.213l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213T12 14.95'/%3E%3C/svg%3E")`,
  fileMap: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm7-3q2.425-2.05 3.613-3.812t1.187-3.263q0-2.275-1.45-3.6T12 6T8.65 7.325t-1.45 3.6q0 1.5 1.188 3.263T12 18m0-5.75q-.525 0-.888-.363T10.75 11t.363-.888T12 9.75t.888.363t.362.887t-.363.888t-.887.362'/%3E%3C/svg%3E")`,
  globe: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-.175-.012-.363t-.013-.312q-.125.725-.675 1.2T18 13h-2q-.825 0-1.412-.587T14 11v-1h-4V8q0-.825.588-1.412T12 6h1q0-.575.313-1.012t.762-.713q-.5-.125-1.012-.2T12 4Q8.65 4 6.325 6.325T4 12h5q1.65 0 2.825 1.175T13 16v1h-3v2.75q.5.125.988.188T12 20'/%3E%3C/svg%3E")`,
  lightbulb: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-3v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16z'/%3E%3C/svg%3E")`,
  lightbulbRounded: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 19q.625 0 1.063-.437T13.5 17.5h-3q0 .625.438 1.063T12 19m-2.25-2.5h4.5q.325 0 .538-.213T15 15.75t-.213-.537T14.25 15h-4.5q-.325 0-.537.213T9 15.75t.213.538t.537.212M9.025 14h5.95q.925-.675 1.475-1.713T17 10q0-2.075-1.462-3.537T12 5T8.463 6.463T7 10q0 1.25.55 2.288T9.025 14m.55-1.5q-.5-.5-.787-1.137T8.5 10q0-1.45 1.025-2.475T12 6.5t2.475 1.025T15.5 10q0 .725-.288 1.363t-.787 1.137zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22'/%3E%3C/svg%3E")`,
  menu: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z'/%3E%3C/svg%3E")`,
  moreVert: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8'/%3E%3C/svg%3E")`,
  moveSelectionUp: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M6 14V2h12v12zm10 4v-2h2v2zM6 18v-2h2v2zm10 4v-2h2v2zm-5 0v-2h2v2zm-5 0v-2h2v2z'/%3E%3C/svg%3E")`,
  questionMark: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M10.6 16q0-2.025.363-2.912T12.5 11.15q1.025-.9 1.563-1.562t.537-1.513q0-1.025-.687-1.7T12 5.7q-1.275 0-1.937.775T9.125 8.05L6.55 6.95q.525-1.6 1.925-2.775T12 3q2.625 0 4.038 1.463t1.412 3.512q0 1.25-.537 2.138t-1.688 2.012Q14 13.3 13.738 13.913T13.475 16zm1.4 6q-.825 0-1.412-.587T10 20t.588-1.412T12 18t1.413.588T14 20t-.587 1.413T12 22'/%3E%3C/svg%3E")`,
  select: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 19v2q-.825 0-1.412-.587T3 19zm-2-2v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2zm2-4H3q0-.825.588-1.412T5 3zm2 16v-2h2v2zM7 5V3h2v2zm4 16v-2h2v2zm0-16V3h2v2zm4 16v-2h2v2zm0-16V3h2v2zm4 14h2q0 .825-.587 1.413T19 21zm0-2v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2zm0-4V3q.825 0 1.413.588T21 5z'/%3E%3C/svg%3E")`,
  settings: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5'/%3E%3C/svg%3E")`,
  square: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M3 21V3h18v18z'/%3E%3C/svg%3E")`,
  squareRounded: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z'/%3E%3C/svg%3E")`,
  sunny: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 5V1h2v4zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425zM19 13v-2h4v2zm-8 10v-4h2v4zM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75zM1 13v-2h4v2zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7zM12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18'/%3E%3C/svg%3E")`,
  transform: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m16 23l-4-4l1.4-1.45l1.6 1.6V17H9q-.825 0-1.412-.587T7 15V9H2V7h5V4.85l-1.6 1.6L4 5l4-4l4 4l-1.4 1.45L9 4.85V15h13v2h-5v2.15l1.6-1.6L20 19zm-1-10V9h-4V7h4q.825 0 1.413.588T17 9v4z'/%3E%3C/svg%3E")`,
  uploadFile: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 19h2v-4.175l1.6 1.6L16 15l-4-4l-4 4l1.425 1.4L11 14.825zm-5 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z'/%3E%3C/svg%3E")`,
  visibility: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19'/%3E%3C/svg%3E")`,
  visibilityOff: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m19.8 22.6l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM12 16q.275 0 .513-.025t.512-.1l-5.4-5.4q-.075.275-.1.513T7.5 11.5q0 1.875 1.313 3.188T12 16m7.3.45l-3.175-3.15q.175-.425.275-.862t.1-.938q0-1.875-1.312-3.187T12 7q-.5 0-.937.1t-.863.3L7.65 4.85q1.025-.425 2.1-.637T12 4q3.775 0 6.725 2.088T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m-4.625-4.6l-3-3q.7-.125 1.288.113t1.012.687t.613 1.038t.087 1.162'/%3E%3C/svg%3E")`,
});
