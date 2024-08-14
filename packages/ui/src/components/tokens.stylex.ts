import * as stylex from "@stylexjs/stylex";

import { IconEnum } from "../types";

export const MEDIA_DARK = "@media (prefers-color-scheme: dark)";
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

export const icons = stylex.defineVars({
  add: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDEzSDV2LTJoNlY1aDJ2Nmg2djJoLTZ2NmgtMnoiLz48L3N2Zz4=)",
  addCircle: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDE3aDJ2LTRoNHYtMmgtNFY3aC0ydjRIN3YyaDR6bTEgNXEtMi4wNzUgMC0zLjktLjc4OHQtMy4xNzUtMi4xMzdxLTEuMzUtMS4zNS0yLjEzNy0zLjE3NVQyIDEycTAtMi4wNzUuNzg4LTMuOXQyLjEzNy0zLjE3NXExLjM1LTEuMzUgMy4xNzUtMi4xMzdUMTIgMnEyLjA3NSAwIDMuOS43ODh0My4xNzUgMi4xMzdxMS4zNSAxLjM1IDIuMTM4IDMuMTc1VDIyIDEycTAgMi4wNzUtLjc4OCAzLjl0LTIuMTM3IDMuMTc1cS0xLjM1IDEuMzUtMy4xNzUgMi4xMzhUMTIgMjIiLz48L3N2Zz4=)",
  arrowSelectorTool: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEzLjc3NSAyMmwtMy42MjUtNy44TDYgMjBWMmwxNCAxMWgtNy4xbDMuNiA3LjcyNXoiLz48L3N2Zz4=)",
  bottomPanelClose: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDExLjVsNC00SDh6TTE5IDNxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxSDVxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM3ptMCAxMVY1SDV2OXoiLz48L3N2Zz4=)",
  bottomPanelOpen: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTggMTEuNWg4bC00LTR6TTUgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM2gxNHEuODI1IDAgMS40MTMuNTg4VDIxIDV2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjF6bTAtN2gxNFY1SDV6Ii8+PC9zdmc+)",
  camera: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTExLjIgOC4zNzVsMy41LTZxMi4yNzUuNiA0LjAzOCAyLjJ0Mi41NjIgMy44em0tMi43NzUgMi41TDUgNC44NzVxMS4zNS0xLjMyNSAzLjEzOC0yLjFUMTIgMnEuMzI1IDAgLjc1LjAzOHQuNzc1LjA4N3ptLTYuMSAzLjYyNXEtLjE1LS42LS4yMzgtMS4yMjVUMiAxMnEwLTEuNzc1LjU3NS0zLjM1VDQuMiA1Ljc3NUw5LjI1IDE0LjV6bTcgNy4xMjVxLTIuMjc1LS42LTQuMDUtMi4ydC0yLjU3NS0zLjhoMTAuMDc1ek0xMiAyMnEtLjM3NSAwLS43NjMtLjA1dC0uNzM3LS4xbDUuMDc1LTguNzI1bDMuNDI1IDZxLTEuMzUgMS4zMjUtMy4xMzcgMi4xVDEyIDIybTcuOC0zLjc3NUwxNC43NSA5LjVoNi45MjVxLjE1LjYuMjM4IDEuMjI1VDIyIDEycTAgMS43NS0uNjEyIDMuMzVUMTkuOCAxOC4yMjUiLz48L3N2Zz4=)",
  cameraSwitch: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTggMTdxLS44MjUgMC0xLjQxMi0uNTg3VDYgMTVWOXEwLS44MjUuNTg4LTEuNDEyVDggN2gxbDEtMWg0bDEgMWgxcS44MjUgMCAxLjQxMy41ODhUMTggOXY2cTAgLjgyNS0uNTg3IDEuNDEzVDE2IDE3em00LTNxLjgyNSAwIDEuNDEzLS41ODdUMTQgMTJxMC0uODI1LS41ODctMS40MTJUMTIgMTBxLS44MjUgMC0xLjQxMi41ODhUMTAgMTJxMCAuODI1LjU4OCAxLjQxM1QxMiAxNE04LjU1LjVROS40LjIyNSAxMC4yNjMuMTEzVDEyIDBxMi4zNSAwIDQuNDM4LjgzOHQzLjcgMi4zMjVxMS42MTIgMS40ODcgMi42MzcgMy41VDI0IDExaC0ycS0uMTc1LTEuOC0uOTUtMy4zNjN0LTEuOTg4LTIuNzYycS0xLjIxMi0xLjItMi43ODctMS45MzdUMTIuOSAyLjA1bDEuNTUgMS41NWwtMS40IDEuNHptNi45IDIzcS0uODUuMjc1LTEuNzEyLjM4OFQxMiAyNHEtMi4zNSAwLTQuNDM3LS44Mzd0LTMuNy0yLjMyNXEtMS42MTMtMS40ODgtMi42MzgtMy41VDAgMTNoMnEuMiAxLjguOTYzIDMuMzYzdDEuOTc1IDIuNzYycTEuMjEyIDEuMiAyLjc4NyAxLjkzOHQzLjM3NS44ODdMOS41NSAyMC40bDEuNC0xLjR6Ii8+PC9zdmc+)",
  close: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYuNCAxOUw1IDE3LjZsNS42LTUuNkw1IDYuNEw2LjQgNWw1LjYgNS42TDE3LjYgNUwxOSA2LjRMMTMuNCAxMmw1LjYgNS42bC0xLjQgMS40bC01LjYtNS42eiIvPjwvc3ZnPg==)",
  delete: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTcgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDUgMTlWNkg0VjRoNVYzaDZ2MWg1djJoLTF2MTNxMCAuODI1LS41ODcgMS40MTNUMTcgMjF6bTItNGgyVjhIOXptNCAwaDJWOGgtMnoiLz48L3N2Zz4=)",
  deployedCode: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDIxLjcyNUw0IDE3LjdxLS40NzUtLjI3NS0uNzM3LS43MjV0LS4yNjMtMXYtNy45NXEwLS41NS4yNjMtMVQ0IDYuM2w3LTQuMDI1UTExLjQ3NSAyIDEyIDJ0MSAuMjc1TDIwIDYuM3EuNDc1LjI3NS43MzguNzI1dC4yNjIgMXY3Ljk1cTAgLjU1LS4yNjIgMVQyMCAxNy43bC03IDQuMDI1UTEyLjUyNSAyMiAxMiAyMnQtMS0uMjc1bTAtOS4xNXY2Ljg1TDEyIDIwbDEtLjU3NXYtNi44NUwxOSA5LjFWOC4wNWwtMS4wNzUtLjYyNUwxMiAxMC44NUw2LjA3NSA3LjQyNUw1IDguMDVWOS4xeiIvPjwvc3ZnPg==)",
  deployedCodeOutline: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDE5LjQyNXYtNi44NUw1IDkuMXY2Ljg1em0yIDBsNi0zLjQ3NVY5LjFsLTYgMy40NzV6bS0xLTguNTc1bDUuOTI1LTMuNDI1TDEyIDRMNi4wNzUgNy40MjV6TTQgMTcuN3EtLjQ3NS0uMjc1LS43MzctLjcyNXQtLjI2My0xdi03Ljk1cTAtLjU1LjI2My0xVDQgNi4zbDctNC4wMjVRMTEuNDc1IDIgMTIgMnQxIC4yNzVMMjAgNi4zcS40NzUuMjc1LjczOC43MjV0LjI2MiAxdjcuOTVxMCAuNTUtLjI2MiAxVDIwIDE3LjdsLTcgNC4wMjVRMTIuNTI1IDIyIDEyIDIydC0xLS4yNzV6bTgtNS43Ii8+PC9zdmc+)",
  deployedCodeSharp: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDIyLjNsLTktNS4xNzVWNi44NzVMMTIgMS43bDkgNS4xNzV2MTAuMjV6bS0xLTkuNzI1djYuODVMMTIgMjBsMS0uNTc1di02Ljg1TDE5IDkuMVY4LjA1bC0xLjA3NS0uNjI1TDEyIDEwLjg1TDYuMDc1IDcuNDI1TDUgOC4wNVY5LjF6Ii8+PC9zdmc+)",
  doneAll: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTYuNyAxOGwtNS42NS01LjY1bDEuNDI1LTEuNGw0LjI1IDQuMjVsMS40IDEuNHptNS42NSAwTDYuNyAxMi4zNWwxLjQtMS40MjVsNC4yNSA0LjI1bDkuMi05LjJsMS40IDEuNDI1em0wLTUuNjVsLTEuNDI1LTEuNEwxNS44NzUgNkwxNy4zIDcuNHoiLz48L3N2Zz4=)",
  dragIndicator: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTkgMjBxLS44MjUgMC0xLjQxMi0uNTg3VDcgMThxMC0uODI1LjU4OC0xLjQxMlQ5IDE2cS44MjUgMCAxLjQxMy41ODhUMTEgMThxMCAuODI1LS41ODcgMS40MTNUOSAyMG02IDBxLS44MjUgMC0xLjQxMi0uNTg3VDEzIDE4cTAtLjgyNS41ODgtMS40MTJUMTUgMTZxLjgyNSAwIDEuNDEzLjU4OFQxNyAxOHEwIC44MjUtLjU4NyAxLjQxM1QxNSAyMG0tNi02cS0uODI1IDAtMS40MTItLjU4N1Q3IDEycTAtLjgyNS41ODgtMS40MTJUOSAxMHEuODI1IDAgMS40MTMuNTg4VDExIDEycTAgLjgyNS0uNTg3IDEuNDEzVDkgMTRtNiAwcS0uODI1IDAtMS40MTItLjU4N1QxMyAxMnEwLS44MjUuNTg4LTEuNDEyVDE1IDEwcS44MjUgMCAxLjQxMy41ODhUMTcgMTJxMCAuODI1LS41ODcgMS40MTNUMTUgMTRNOSA4cS0uODI1IDAtMS40MTItLjU4N1Q3IDZxMC0uODI1LjU4OC0xLjQxMlQ5IDRxLjgyNSAwIDEuNDEzLjU4OFQxMSA2cTAgLjgyNS0uNTg3IDEuNDEzVDkgOG02IDBxLS44MjUgMC0xLjQxMi0uNTg3VDEzIDZxMC0uODI1LjU4OC0xLjQxMlQxNSA0cS44MjUgMCAxLjQxMy41ODhUMTcgNnEwIC44MjUtLjU4NyAxLjQxM1QxNSA4Ii8+PC9zdmc+)",
  edit: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTMgMjF2LTQuMjVMMTYuMiAzLjU3NXEuMy0uMjc1LjY2My0uNDI1dC43NjItLjE1cS40IDAgLjc3NS4xNXQuNjUuNDVMMjAuNDI1IDVxLjMuMjc1LjQzOC42NVQyMSA2LjRxMCAuNC0uMTM3Ljc2M3QtLjQzOC42NjJMNy4yNSAyMXpNMTcuNiA3LjhMMTkgNi40TDE3LjYgNWwtMS40IDEuNHoiLz48L3N2Zz4=)",
  expandLess: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTcuNCAxNS4zNzVsLTEuNC0xLjRsNi02bDYgNmwtMS40IDEuNGwtNC42LTQuNnoiLz48L3N2Zz4=)",
  expandMore: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDE1LjM3NWwtNi02bDEuNC0xLjRsNC42IDQuNmw0LjYtNC42bDEuNCAxLjR6Ii8+PC9zdmc+)",
  fileMap: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM2gxNHEuODI1IDAgMS40MTMuNTg4VDIxIDV2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjF6bTctM3EyLjQyNS0yLjA1IDMuNjEzLTMuODEydDEuMTg3LTMuMjYzcTAtMi4yNzUtMS40NS0zLjZUMTIgNnEtMS45IDAtMy4zNSAxLjMyNXQtMS40NSAzLjZxMCAxLjUgMS4xODggMy4yNjNUMTIgMThtMC01Ljc1cS0uNTI1IDAtLjg4OC0uMzYzVDEwLjc1IDExcTAtLjUyNS4zNjMtLjg4OFQxMiA5Ljc1cS41MjUgMCAuODg4LjM2M3QuMzYyLjg4N3EwIC41MjUtLjM2My44ODhUMTIgMTIuMjUiLz48L3N2Zz4=)",
  globe: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDIycS0yLjA3NSAwLTMuOS0uNzg4dC0zLjE3NS0yLjEzN3EtMS4zNS0xLjM1LTIuMTM3LTMuMTc1VDIgMTJxMC0yLjA3NS43ODgtMy45dDIuMTM3LTMuMTc1cTEuMzUtMS4zNSAzLjE3NS0yLjEzN1QxMiAycTIuMDc1IDAgMy45Ljc4OHQzLjE3NSAyLjEzN3ExLjM1IDEuMzUgMi4xMzggMy4xNzVUMjIgMTJxMCAyLjA3NS0uNzg4IDMuOXQtMi4xMzcgMy4xNzVxLTEuMzUgMS4zNS0zLjE3NSAyLjEzOFQxMiAyMm0wLTJxMy4zNSAwIDUuNjc1LTIuMzI1VDIwIDEycTAtLjE3NS0uMDEyLS4zNjN0LS4wMTMtLjMxMnEtLjEyNS43MjUtLjY3NSAxLjJUMTggMTNoLTJxLS44MjUgMC0xLjQxMi0uNTg3VDE0IDExdi0xaC00VjhxMC0uODI1LjU4OC0xLjQxMlQxMiA2aDFxMC0uNTc1LjMxMy0xLjAxMnQuNzYyLS43MTNxLS41LS4xMjUtMS4wMTItLjJUMTIgNFE4LjY1IDQgNi4zMjUgNi4zMjVUNCAxMmg1cTEuNjUgMCAyLjgyNSAxLjE3NVQxMyAxNnYxaC0zdjIuNzVxLjUuMTI1Ljk4OC4xODhUMTIgMjAiLz48L3N2Zz4=)",
  home: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgMjFWOWw4LTZsOCA2djEyaC02di03aC00djd6Ii8+PC9zdmc+)",
  info: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDE3aDJ2LTZoLTJ6bTEtOHEuNDI1IDAgLjcxMy0uMjg4VDEzIDhxMC0uNDI1LS4yODgtLjcxMlQxMiA3cS0uNDI1IDAtLjcxMi4yODhUMTEgOHEwIC40MjUuMjg4LjcxM1QxMiA5bTAgMTNxLTIuMDc1IDAtMy45LS43ODh0LTMuMTc1LTIuMTM3cS0xLjM1LTEuMzUtMi4xMzctMy4xNzVUMiAxMnEwLTIuMDc1Ljc4OC0zLjl0Mi4xMzctMy4xNzVxMS4zNS0xLjM1IDMuMTc1LTIuMTM3VDEyIDJxMi4wNzUgMCAzLjkuNzg4dDMuMTc1IDIuMTM3cTEuMzUgMS4zNSAyLjEzOCAzLjE3NVQyMiAxMnEwIDIuMDc1LS43ODggMy45dC0yLjEzNyAzLjE3NXEtMS4zNSAxLjM1LTMuMTc1IDIuMTM4VDEyIDIyIi8+PC9zdmc+)",
  landscape: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEgMThsNi04bDQuNSA2aDIuNTI1bC0zLjc3NS01TDE0IDZsOSAxMnoiLz48L3N2Zz4=)",
  landscape2: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgMjBxLS44MjUgMC0xLjQxMi0uNTg3VDIgMThWNnEwLS44MjUuNTg4LTEuNDEyVDQgNGgxNnEuODI1IDAgMS40MTMuNTg4VDIyIDZ2MTJxMCAuODI1LS41ODcgMS40MTNUMjAgMjB6bTEyLjk3NS0ybDIuMy04LjY1TDcuMDc1IDZsLTIuMyA4LjY1eiIvPjwvc3ZnPg==)",
  leftPanelClose: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE2LjUgMTZWOGwtNCA0ek01IDIxcS0uODI1IDAtMS40MTItLjU4N1QzIDE5VjVxMC0uODI1LjU4OC0xLjQxMlQ1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem01LTJoOVY1aC05eiIvPjwvc3ZnPg==)",
  leftPanelOpen: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyLjUgOHY4bDQtNHpNNSAyMXEtLjgyNSAwLTEuNDEyLS41ODdUMyAxOVY1cTAtLjgyNS41ODgtMS40MTJUNSAzaDE0cS44MjUgMCAxLjQxMy41ODhUMjEgNXYxNHEwIC44MjUtLjU4NyAxLjQxM1QxOSAyMXptNS0yaDlWNWgtOXoiLz48L3N2Zz4=)",
  lightbulb: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDIycS0uODI1IDAtMS40MTItLjU4N1QxMCAyMGg0cTAgLjgyNS0uNTg3IDEuNDEzVDEyIDIybS00LTN2LTJoOHYyem0uMjUtM3EtMS43MjUtMS4wMjUtMi43MzgtMi43NVQ0LjUgOS41cTAtMy4xMjUgMi4xODgtNS4zMTJUMTIgMnEzLjEyNSAwIDUuMzEzIDIuMTg4VDE5LjUgOS41cTAgMi4wMjUtMS4wMTIgMy43NVQxNS43NSAxNnoiLz48L3N2Zz4=)",
  lightbulbOutline: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDIycS0uODI1IDAtMS40MTItLjU4N1QxMCAyMGg0cTAgLjgyNS0uNTg3IDEuNDEzVDEyIDIybS00LTN2LTJoOHYyem0uMjUtM3EtMS43MjUtMS4wMjUtMi43MzgtMi43NVQ0LjUgOS41cTAtMy4xMjUgMi4xODgtNS4zMTJUMTIgMnEzLjEyNSAwIDUuMzEzIDIuMTg4VDE5LjUgOS41cTAgMi4wMjUtMS4wMTIgMy43NVQxNS43NSAxNnptLjYtMmg2LjNxMS4xMjUtLjggMS43MzgtMS45NzVUMTcuNSA5LjVxMC0yLjMtMS42LTMuOVQxMiA0UTkuNyA0IDguMSA1LjZUNi41IDkuNXEwIDEuMzUuNjEzIDIuNTI1VDguODUgMTRNMTIgMTQiLz48L3N2Zz4=)",
  menu: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTMgMTh2LTJoMTh2MnptMC01di0yaDE4djJ6bTAtNVY2aDE4djJ6Ii8+PC9zdmc+)",
  moreHoriz: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTRxLS44MjUgMC0xLjQxMi0uNTg3VDQgMTJxMC0uODI1LjU4OC0xLjQxMlQ2IDEwcS44MjUgMCAxLjQxMy41ODhUOCAxMnEwIC44MjUtLjU4NyAxLjQxM1Q2IDE0bTYgMHEtLjgyNSAwLTEuNDEyLS41ODdUMTAgMTJxMC0uODI1LjU4OC0xLjQxMlQxMiAxMHEuODI1IDAgMS40MTMuNTg4VDE0IDEycTAgLjgyNS0uNTg3IDEuNDEzVDEyIDE0bTYgMHEtLjgyNSAwLTEuNDEyLS41ODdUMTYgMTJxMC0uODI1LjU4OC0xLjQxMlQxOCAxMHEuODI1IDAgMS40MTMuNTg4VDIwIDEycTAgLjgyNS0uNTg3IDEuNDEzVDE4IDE0Ii8+PC9zdmc+)",
  moreVert: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDIwcS0uODI1IDAtMS40MTItLjU4N1QxMCAxOHEwLS44MjUuNTg4LTEuNDEyVDEyIDE2cS44MjUgMCAxLjQxMy41ODhUMTQgMThxMCAuODI1LS41ODcgMS40MTNUMTIgMjBtMC02cS0uODI1IDAtMS40MTItLjU4N1QxMCAxMnEwLS44MjUuNTg4LTEuNDEyVDEyIDEwcS44MjUgMCAxLjQxMy41ODhUMTQgMTJxMCAuODI1LS41ODcgMS40MTNUMTIgMTRtMC02cS0uODI1IDAtMS40MTItLjU4N1QxMCA2cTAtLjgyNS41ODgtMS40MTJUMTIgNHEuODI1IDAgMS40MTMuNTg4VDE0IDZxMCAuODI1LS41ODcgMS40MTNUMTIgOCIvPjwvc3ZnPg==)",
  moveSelectionUp: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgMTRWMmgxMnYxMnptMTAgNHYtMmgydjJ6TTYgMTh2LTJoMnYyem0xMCA0di0yaDJ2MnptLTUgMHYtMmgydjJ6bS01IDB2LTJoMnYyeiIvPjwvc3ZnPg==)",
  questionMark: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwLjYgMTZxMC0yLjAyNS4zNjMtMi45MTJUMTIuNSAxMS4xNXExLjAyNS0uOSAxLjU2My0xLjU2MnQuNTM3LTEuNTEzcTAtMS4wMjUtLjY4Ny0xLjdUMTIgNS43cS0xLjI3NSAwLTEuOTM3Ljc3NVQ5LjEyNSA4LjA1TDYuNTUgNi45NXEuNTI1LTEuNiAxLjkyNS0yLjc3NVQxMiAzcTIuNjI1IDAgNC4wMzggMS40NjN0MS40MTIgMy41MTJxMCAxLjI1LS41MzcgMi4xMzh0LTEuNjg4IDIuMDEyUTE0IDEzLjMgMTMuNzM4IDEzLjkxM1QxMy40NzUgMTZ6bTEuNCA2cS0uODI1IDAtMS40MTItLjU4N1QxMCAyMHEwLS44MjUuNTg4LTEuNDEyVDEyIDE4cS44MjUgMCAxLjQxMy41ODhUMTQgMjBxMCAuODI1LS41ODcgMS40MTNUMTIgMjIiLz48L3N2Zz4=)",
  rightPanelClose: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTcuNSA4djhsNC00ek01IDIxcS0uODI1IDAtMS40MTItLjU4N1QzIDE5VjVxMC0uODI1LjU4OC0xLjQxMlQ1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem05LTJWNUg1djE0eiIvPjwvc3ZnPg==)",
  rightPanelOpen: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExLjUgMTZWOGwtNCA0ek01IDIxcS0uODI1IDAtMS40MTItLjU4N1QzIDE5VjVxMC0uODI1LjU4OC0xLjQxMlQ1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem05LTJWNUg1djE0eiIvPjwvc3ZnPg==)",
  scene: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDIyVjdxMC0uODI1LS41ODctMS40MTJUMTggNWgtMXYxLjNxMCAuMy0uMi41dC0uNS4yaC01LjZxLS4zNSAwLS41NjItLjM3NVQxMC4xIDUuOUwxMiAxLjhxLjE3NS0uMzc1LjUxMy0uNTg4VDEzLjMgMWgyLjNxLjYgMCAxIC40NVQxNyAyLjVWM2gxcTEuNjUgMCAyLjgyNSAxLjE3NVQyMiA3djE1ek01IDIycS0xLjI3NSAwLTIuMTM3LS44NjJUMiAxOXYtMi41cTAtLjYyNS40MzgtMS4wNjJUMy41IDE1cS42MjUgMCAxLjA2My40MzhUNSAxNi41VjE5aDEwdi0yLjVxMC0uNjI1LjQzOC0xLjA2MlQxNi41IDE1cS42MjUgMCAxLjA2My40MzhUMTggMTYuNVYxOXEwIDEuMjc1LS44NjIgMi4xMzhUMTUgMjJ6bTEtNHYtMS41cTAtLjgtLjUyNS0xLjUyNVQ0IDE0LjA1VjEycTAtLjgyNS41ODctMS40MTNUNiAxMGg4cS44MjUgMCAxLjQxMy41ODhUMTYgMTJ2Mi4wNXEtLjk1LjItMS40NzUuOTI1VDE0IDE2LjVWMTh6Ii8+PC9zdmc+)",
  select: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMTl2MnEtLjgyNSAwLTEuNDEyLS41ODdUMyAxOXptLTItMnYtMmgydjJ6bTAtNHYtMmgydjJ6bTAtNFY3aDJ2MnptMi00SDNxMC0uODI1LjU4OC0xLjQxMlQ1IDN6bTIgMTZ2LTJoMnYyek03IDVWM2gydjJ6bTQgMTZ2LTJoMnYyem0wLTE2VjNoMnYyem00IDE2di0yaDJ2MnptMC0xNlYzaDJ2MnptNCAxNGgycTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem0wLTJ2LTJoMnYyem0wLTR2LTJoMnYyem0wLTRWN2gydjJ6bTAtNFYzcS44MjUgMCAxLjQxMy41ODhUMjEgNXoiLz48L3N2Zz4=)",
  settings: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTkuMjUgMjJsLS40LTMuMnEtLjMyNS0uMTI1LS42MTItLjN0LS41NjMtLjM3NUw0LjcgMTkuMzc1bC0yLjc1LTQuNzVsMi41NzUtMS45NVE0LjUgMTIuNSA0LjUgMTIuMzM4di0uNjc1cTAtLjE2My4wMjUtLjMzOEwxLjk1IDkuMzc1bDIuNzUtNC43NWwyLjk3NSAxLjI1cS4yNzUtLjIuNTc1LS4zNzV0LjYtLjNsLjQtMy4yaDUuNWwuNCAzLjJxLjMyNS4xMjUuNjEzLjN0LjU2Mi4zNzVsMi45NzUtMS4yNWwyLjc1IDQuNzVsLTIuNTc1IDEuOTVxLjAyNS4xNzUuMDI1LjMzOHYuNjc0cTAgLjE2My0uMDUuMzM4bDIuNTc1IDEuOTVsLTIuNzUgNC43NWwtMi45NS0xLjI1cS0uMjc1LjItLjU3NS4zNzV0LS42LjNsLS40IDMuMnptMi44LTYuNXExLjQ1IDAgMi40NzUtMS4wMjVUMTUuNTUgMTJxMC0xLjQ1LTEuMDI1LTIuNDc1VDEyLjA1IDguNXEtMS40NzUgMC0yLjQ4OCAxLjAyNVQ4LjU1IDEycTAgMS40NSAxLjAxMyAyLjQ3NVQxMi4wNSAxNS41Ii8+PC9zdmc+)",
  square: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTMgMjFWM2gxOHYxOHoiLz48L3N2Zz4=)",
  squareOutline: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTMgMjFWM2gxOHYxOHptMi0yaDE0VjVINXptMCAwVjV6Ii8+PC9zdmc+)",
  squareOutlineRounded: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM2gxNHEuODI1IDAgMS40MTMuNTg4VDIxIDV2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjF6bTAtMmgxNFY1SDV6bTAgMFY1eiIvPjwvc3ZnPg==)",
  squareRounded: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM2gxNHEuODI1IDAgMS40MTMuNTg4VDIxIDV2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjF6Ii8+PC9zdmc+)",
  sunny: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDVWMWgydjR6bTYuNjUgMi43NWwtMS4zNzUtMS4zNzVsMi44LTIuODc1bDEuNCAxLjQyNXpNMTkgMTN2LTJoNHYyem0tOCAxMHYtNGgydjR6TTYuMzUgNy43TDMuNSA0LjkyNWwxLjQyNS0xLjRMNy43NSA2LjM1em0xMi43IDEyLjhsLTIuNzc1LTIuODc1bDEuMzUtMS4zNWwyLjg1IDIuNzV6TTEgMTN2LTJoNHYyem0zLjkyNSA3LjVsLTEuNC0xLjQyNWwyLjgtMi44bC43MjUuNjc1bC43MjUuN3pNMTIgMThxLTIuNSAwLTQuMjUtMS43NVQ2IDEycTAtMi41IDEuNzUtNC4yNVQxMiA2cTIuNSAwIDQuMjUgMS43NVQxOCAxMnEwIDIuNS0xLjc1IDQuMjVUMTIgMTgiLz48L3N2Zz4=)",
  topPanelClose: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDEyLjVsLTQgNGg4ek01IDIxcS0uODI1IDAtMS40MTItLjU4N1QzIDE5VjVxMC0uODI1LjU4OC0xLjQxMlQ1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg3IDEuNDEzVDE5IDIxem0wLTExdjloMTR2LTl6Ii8+PC9zdmc+)",
  topPanelOpen: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTEyIDE2LjVsNC00SDh6TTUgMjFxLS44MjUgMC0xLjQxMi0uNTg3VDMgMTlWNXEwLS44MjUuNTg4LTEuNDEyVDUgM2gxNHEuODI1IDAgMS40MTMuNTg4VDIxIDV2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjF6bTAtMTF2OWgxNHYtOXoiLz48L3N2Zz4=)",
  transform: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE2IDIzbC00LTRsMS40LTEuNDVsMS42IDEuNlYxN0g5cS0uODI1IDAtMS40MTItLjU4N1Q3IDE1VjlIMlY3aDVWNC44NWwtMS42IDEuNkw0IDVsNC00bDQgNGwtMS40IDEuNDVMOSA0Ljg1VjE1aDEzdjJoLTV2Mi4xNWwxLjYtMS42TDIwIDE5em0tMS0xMFY5aC00VjdoNHEuODI1IDAgMS40MTMuNTg4VDE3IDl2NHoiLz48L3N2Zz4=)",
  uploadFile: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTExIDE5aDJ2LTQuMTc1bDEuNiAxLjZMMTYgMTVsLTQtNGwtNCA0bDEuNDI1IDEuNEwxMSAxNC44MjV6bS01IDNxLS44MjUgMC0xLjQxMi0uNTg3VDQgMjBWNHEwLS44MjUuNTg4LTEuNDEyVDYgMmg4bDYgNnYxMnEwIC44MjUtLjU4NyAxLjQxM1QxOCAyMnptNy0xM2g1bC01LTV6Ii8+PC9zdmc+)",
  videoStable: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQgMjBxLS44MjUgMC0xLjQxMi0uNTg3VDIgMThWNnEwLS44MjUuNTg4LTEuNDEyVDQgNGgxNnEuODI1IDAgMS40MTMuNTg4VDIyIDZ2MTJxMCAuODI1LS41ODcgMS40MTNUMjAgMjB6bTEyLjk3NS0ybDIuMy04LjY1TDcuMDc1IDZsLTIuMyA4LjY1eiIvPjwvc3ZnPg==)",
  visibility: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDE2cTEuODc1IDAgMy4xODgtMS4zMTJUMTYuNSAxMS41cTAtMS44NzUtMS4zMTItMy4xODdUMTIgN3EtMS44NzUgMC0zLjE4NyAxLjMxM1Q3LjUgMTEuNXEwIDEuODc1IDEuMzEzIDMuMTg4VDEyIDE2bTAtMS44cS0xLjEyNSAwLTEuOTEyLS43ODhUOS4zIDExLjVxMC0xLjEyNS43ODgtMS45MTJUMTIgOC44cTEuMTI1IDAgMS45MTMuNzg4VDE0LjcgMTEuNXEwIDEuMTI1LS43ODcgMS45MTNUMTIgMTQuMm0wIDQuOHEtMy42NSAwLTYuNjUtMi4wMzdUMSAxMS41cTEuMzUtMy40MjUgNC4zNS01LjQ2MlQxMiA0cTMuNjUgMCA2LjY1IDIuMDM4VDIzIDExLjVxLTEuMzUgMy40MjUtNC4zNSA1LjQ2M1QxMiAxOSIvPjwvc3ZnPg==)",
  visibilityOff: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE5LjggMjIuNmwtNC4yLTQuMTVxLS44NzUuMjc1LTEuNzYyLjQxM1QxMiAxOXEtMy43NzUgMC02LjcyNS0yLjA4N1QxIDExLjVxLjUyNS0xLjMyNSAxLjMyNS0yLjQ2M1Q0LjE1IDdMMS40IDQuMmwxLjQtMS40bDE4LjQgMTguNHpNMTIgMTZxLjI3NSAwIC41MTMtLjAyNXQuNTEyLS4xbC01LjQtNS40cS0uMDc1LjI3NS0uMS41MTNUNy41IDExLjVxMCAxLjg3NSAxLjMxMyAzLjE4OFQxMiAxNm03LjMuNDVsLTMuMTc1LTMuMTVxLjE3NS0uNDI1LjI3NS0uODYydC4xLS45MzhxMC0xLjg3NS0xLjMxMi0zLjE4N1QxMiA3cS0uNSAwLS45MzcuMXQtLjg2My4zTDcuNjUgNC44NXExLjAyNS0uNDI1IDIuMS0uNjM3VDEyIDRxMy43NzUgMCA2LjcyNSAyLjA4OFQyMyAxMS41cS0uNTc1IDEuNDc1LTEuNTEzIDIuNzM4VDE5LjMgMTYuNDVtLTQuNjI1LTQuNmwtMy0zcS43LS4xMjUgMS4yODguMTEzdDEuMDEyLjY4N3EuNDI1LjQ1LjYxMyAxLjAzOHQuMDg3IDEuMTYyIi8+PC9zdmc+)",
});

export const common = stylex.create({
  icon: (iconKey?: keyof typeof icons) => ({
    maskImage: iconKey ? icons[iconKey] : null,
  }),
  marginBlockEnd: (value: number) => ({
    marginBlockEnd: value > 0 ? `${value}rem` : 0,
  }),
  marginBlockStart: (value: number) => ({
    marginBlockStart: value > 0 ? `${value}rem` : 0,
  }),
  marginInlineEnd: (value: number) => ({
    marginInlineEnd: value > 0 ? `${value}rem` : 0,
  }),
  marginInlineStart: (value: number) => ({
    marginInlineStart: value > 0 ? `${value}rem` : 0,
  }),
  paddingBlockEnd: (value: number) => ({
    paddingBlockEnd: value > 0 ? `${value}rem` : 0,
  }),
  paddingBlockStart: (value: number) => ({
    paddingBlockStart: value > 0 ? `${value}rem` : 0,
  }),
  paddingInlineEnd: (value: number) => ({
    paddingInlineEnd: value > 0 ? `${value}rem` : 0,
  }),
  paddingInlineStart: (value: number) => ({
    paddingInlineStart: value > 0 ? `${value}rem` : 0,
  }),
});

export type SpacerStyleProps = {
  block?: number;
  blockEnd?: number;
  blockStart?: number;
  default?: number;
  inline?: number;
  inlineEnd?: number;
  inlineStart?: number;
} | number;

const extractSpacerStyleProps = (value?: SpacerStyleProps) => {
  return typeof value === "number" ? { default: value } : value ?? {};
};

export const marginStyle = (value?: SpacerStyleProps) => {
  const {
    block,
    blockEnd,
    blockStart,
    default: defaultValue,
    inline,
    inlineEnd,
    inlineStart,
  } = extractSpacerStyleProps(value);
  return [
    typeof defaultValue === "number" && [
      common.marginBlockEnd(defaultValue),
      common.marginBlockStart(defaultValue),
      common.marginInlineEnd(defaultValue),
      common.marginInlineStart(defaultValue),
    ],
    typeof block === "number" && [
      common.marginBlockEnd(block),
      common.marginBlockStart(block),
    ],
    typeof blockEnd === "number" && common.marginBlockEnd(blockEnd),
    typeof blockStart === "number" && common.marginBlockStart(blockStart),
    typeof inline === "number" && [
      common.marginInlineEnd(inline),
      common.marginInlineStart(inline),
    ],
    typeof inlineEnd === "number" && common.marginInlineEnd(inlineEnd),
    typeof inlineStart === "number" && common.marginInlineStart(inlineStart),
  ];
};

export const paddingStyle = (value?: SpacerStyleProps) => {
  const {
    block,
    blockEnd,
    blockStart,
    default: defaultValue,
    inline,
    inlineEnd,
    inlineStart,
  } = extractSpacerStyleProps(value);
  return [
    typeof defaultValue === "number" && [
      common.paddingBlockEnd(defaultValue),
      common.paddingBlockStart(defaultValue),
      common.paddingInlineEnd(defaultValue),
      common.paddingInlineStart(defaultValue),
    ],
    typeof block === "number" && [
      common.paddingBlockEnd(block),
      common.paddingBlockStart(block),
    ],
    typeof blockEnd === "number" && common.paddingBlockEnd(blockEnd),
    typeof blockStart === "number" && common.paddingBlockStart(blockStart),
    typeof inline === "number" && [
      common.paddingInlineEnd(inline),
      common.paddingInlineStart(inline),
    ],
    typeof inlineEnd === "number" && common.paddingInlineEnd(inlineEnd),
    typeof inlineStart === "number" && common.paddingInlineStart(inlineStart),
  ];
};

export const iconStyle = (icon?: IconEnum) => {
  return [
    icon === IconEnum.Add && common.icon("add"),
    icon === IconEnum.AddCircle && common.icon("addCircle"),
    icon === IconEnum.ArrowSelectorTool && common.icon("arrowSelectorTool"),
    icon === IconEnum.BottomPanelClose && common.icon("bottomPanelClose"),
    icon === IconEnum.BottomPanelOpen && common.icon("bottomPanelOpen"),
    icon === IconEnum.Camera && common.icon("camera"),
    icon === IconEnum.CameraSwitch && common.icon("cameraSwitch"),
    icon === IconEnum.Close && common.icon("close"),
    icon === IconEnum.Delete && common.icon("delete"),
    icon === IconEnum.DeployedCode && common.icon("deployedCode"),
    icon === IconEnum.DeployedCodeOutline && common.icon("deployedCodeOutline"),
    icon === IconEnum.DeployedCodeSharp && common.icon("deployedCodeSharp"),
    icon === IconEnum.DoneAll && common.icon("doneAll"),
    icon === IconEnum.DragIndicator && common.icon("dragIndicator"),
    icon === IconEnum.Edit && common.icon("edit"),
    icon === IconEnum.ExpandLess && common.icon("expandLess"),
    icon === IconEnum.ExpandMore && common.icon("expandMore"),
    icon === IconEnum.FileMap && common.icon("fileMap"),
    icon === IconEnum.Globe && common.icon("globe"),
    icon === IconEnum.Home && common.icon("home"),
    icon === IconEnum.Info && common.icon("info"),
    icon === IconEnum.Landscape && common.icon("landscape"),
    icon === IconEnum.Landscape2 && common.icon("landscape2"),
    icon === IconEnum.LeftPanelClose && common.icon("leftPanelClose"),
    icon === IconEnum.LeftPanelOpen && common.icon("leftPanelOpen"),
    icon === IconEnum.Lightbulb && common.icon("lightbulb"),
    icon === IconEnum.LightbulbOutline && common.icon("lightbulbOutline"),
    icon === IconEnum.Menu && common.icon("menu"),
    icon === IconEnum.MoreHoriz && common.icon("moreHoriz"),
    icon === IconEnum.MoreVert && common.icon("moreVert"),
    icon === IconEnum.MoveSelectionUp && common.icon("moveSelectionUp"),
    icon === IconEnum.QuestionMark && common.icon("questionMark"),
    icon === IconEnum.RightPanelClose && common.icon("rightPanelClose"),
    icon === IconEnum.RightPanelOpen && common.icon("rightPanelOpen"),
    icon === IconEnum.Scene && common.icon("scene"),
    icon === IconEnum.Select && common.icon("select"),
    icon === IconEnum.Settings && common.icon("settings"),
    icon === IconEnum.Square && common.icon("square"),
    icon === IconEnum.SquareOutline && common.icon("squareOutline"),
    icon === IconEnum.SquareOutlineRounded && common.icon("squareOutlineRounded"),
    icon === IconEnum.SquareRounded && common.icon("squareRounded"),
    icon === IconEnum.Sunny && common.icon("sunny"),
    icon === IconEnum.TopPanelClose && common.icon("topPanelClose"),
    icon === IconEnum.TopPanelOpen && common.icon("topPanelOpen"),
    icon === IconEnum.Transform && common.icon("transform"),
    icon === IconEnum.UploadFile && common.icon("uploadFile"),
    icon === IconEnum.VideoStable && common.icon("videoStable"),
    icon === IconEnum.Visibility && common.icon("visibility"),
    icon === IconEnum.VisibilityOff && common.icon("visibilityOff"),
  ];
};
