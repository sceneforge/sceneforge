import { render, withRoot } from "./root";
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/sanitize/assets.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";

render();

withRoot((root) => {
  root.classList.add(
    "h-100vh",
    "w-100vw",
    "flex",
    "select-none",
    "text-center",
    "overflow-hidden",
    "font-sans",
    "bg-primary:50",
    "dark:text-light",
    "light:text-dark"
  );
});
