import concurrently from "concurrently";

const colors = [
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgGrey",
] as const;

const namespaces = {
  app: "@sceneforge/app",
  root: "sceneforge",
  site: "@sceneforge/site",
} as const;

type Namespace = keyof typeof namespaces;
type NamespaceValue = typeof namespaces[keyof typeof namespaces];

export const yarnCommand = async (
  ns: Namespace | Namespace[],
  command: string | string[],
  {
    color,
    name,
  }: {
    color?: string;
    name?: string;
  } = {}
) => {
  const runList: string[] = (Array.isArray(command) ? command : [command]);
  const namespaceList: Namespace[] = (Array.isArray(ns) ? ns : [ns]);

  if (runList.length === 0) {
    throw new Error("No command provided");
  }

  if (namespaceList.length === 0) {
    throw new Error("No namespace provided");
  }

  const commandList: [string, NamespaceValue][] = [];

  for (const c of runList) {
    for (const n of namespaceList) {
      commandList.push([c, namespaces[n]]);
    }
  }

  const { result } = concurrently(commandList.map(([c, n], index) => ({
    command: `yarn workspace ${n} ${c}`,
    name: name ?? n,
    prefixColor: color || colors[index % colors.length],
  })));

  const [response] = await result;

  if (response.exitCode === 0) {
    return response;
  }
  else {
    throw new Error(`Command failed: "${commandList.map(([c, n]) => `${n}:${c}`).join(", ")}"`);
  }
};
