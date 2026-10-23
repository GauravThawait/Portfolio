import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

import { warnAboutContentTodos } from "./lib/todos";

// Next loads this config more than once per build (including in workers that inherit env), so warn only once.
const WARNED_FLAG = "CONTENT_TODOS_WARNED";

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD && !process.env[WARNED_FLAG]) {
    process.env[WARNED_FLAG] = "1";
    warnAboutContentTodos();
  }
  return {};
}
