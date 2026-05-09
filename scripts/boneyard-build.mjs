import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const config = JSON.parse(readFileSync("boneyard.config.json", "utf8"));
const origin = process.env.BONEYARD_ORIGIN ?? "http://localhost:3000";
const routes = Array.isArray(config.routes) ? config.routes : ["/"];
const urls = routes.map((route) => new URL(route, origin).toString());
const cliPath = resolve("node_modules/boneyard-js/bin/cli.js");

const child = spawn(
  process.execPath,
  [cliPath, "build", ...urls, "--no-scan"],
  {
    stdio: "inherit",
    env: process.env,
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
