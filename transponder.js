var ifrm = document.createElement("iframe");
ifrm.setAttribute("width", "100%");
ifrm.setAttribute("height", "1000px");
ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute(
  "src",
  "http://localhost:8000" + window.location.pathname + window.location.search
);
console.log("ifrm", ifrm.src);
// @ts-ignore
document.currentScript.before(ifrm);
window.addEventListener("sveltekit:start", function (e) {
  console.log("sveltekit:start", e);
});
window.addEventListener(
  "message",
  (event) => {
    //only grab svelte-kit messages
    if (
      event.data.type === undefined ||
      !event.data.type.startsWith("svelte-kit:")
    )
      return;
    if (event.data.type.endsWith("navigated")) {
      const { pathname, search } = event.data.payload;
      history.replaceState({}, "", pathname + search);
    }
  },
  false
);
