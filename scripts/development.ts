import concurrely from "concurrently";

concurrely([
  {
    command: "yarn workspace @sceneforge/app dev",
    name: "app",
  },
  {
    command: "yarn watch:packages",
    name: "packages",
  },
], {
  killOthers: ["failure", "success"],
  prefix: "name",
  restartTries: 3,
});
