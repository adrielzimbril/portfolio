export async function init(props?: { disablePolyfill?: boolean }) {
  const mod = await import("./squircle-generator.ts?raw");
  const blob = new Blob([mod.default.toString()], {
    type: "application/javascript",
  });
  const moduleUrl = URL.createObjectURL(blob);

  if (!("paintWorklet" in CSS) && !props?.disablePolyfill) {
    // @ts-ignore
    await import("@squircle/paint-polyfill");
  }
  // @ts-ignore
  await CSS.paintWorklet.addModule(moduleUrl);
}
