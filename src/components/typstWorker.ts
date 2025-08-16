/// <reference lib="webworker" />
import { $typst } from "@myriaddreamin/typst.ts";

const ctx: DedicatedWorkerGlobalScope = self as any;

let initialized = false;
let initializing: Promise<void> | null = null;

async function initTypst() {
  if (initialized) return;

  if (!initializing) {
    initializing = (async () => {
      $typst.setCompilerInitOptions({
        getModule: () => "/typst_ts_web_compiler_bg.wasm",
      });

      $typst.setRendererInitOptions({
        getModule: () => "/typst_ts_renderer_bg.wasm",
      });

      // Optional: wait for rendererReady only if it exists
      if (typeof ($typst as any).rendererReady === "function") {
        await ($typst as any).rendererReady();
      }

      initialized = true;
    })();
  }

  await initializing;
}

ctx.onmessage = async (e: MessageEvent<{ code: string }>) => {
  const { code } = e.data;

  try {
    await initTypst();

    console.log("Vector generation initialized");
    const result = await $typst.vector({ mainContent: code });
    console.log("Vector generation finished");

    if (result) {
      ctx.postMessage(result, [result.buffer]);
    } else {
      const empty = new Uint8Array();
      ctx.postMessage(empty, [empty.buffer]);
    }

  } catch (error) {
    console.error("Worker compilation error:", error);
    const empty = new Uint8Array();
    ctx.postMessage(empty, [empty.buffer]);
  }
};

