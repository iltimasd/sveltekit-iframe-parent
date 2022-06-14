var ifrm = document.createElement("iframe");
ifrm.setAttribute("width", "100%");
ifrm.setAttribute("height", "1000px");
ifrm.setAttribute("frameborder", "0");
ifrm.setAttribute(
  "src",
  "http://localhost:8000" + window.location.pathname + window.location.search
);
ifrm.setAttribute("id", "sk-iframe");
// @ts-ignore
document.currentScript.before(ifrm);
let apiParams = {
  getUserDetails: "/wcs/resources/store/10051/hdsmember/getUserDetails",
  checkHdsAuth: "/HdsAuth?storeId=10051",
  apiEndpoint: assetmanagerEndpoint,
  endpoint: apiEndpoint,
  login:
    "/LogonForm?myAcctMain=1&catalogId=10054&langId=-1&storeId=10051&returnPage=apm",
  clientId: cid, //externa var
  clientSecret: cs, //external var
};
// @ts-ignore
window.addEventListener("svelte-kit:start", function (e) {
  console.log("sveltekit:start", e);
});

window.addEventListener(
  "message",
  async (event) => {
    //only grab svelte-kit messages
    if (
      event.data.type === undefined ||
      !event.data.type.startsWith("svelte-kit:")
    ) {
      return;
    }
    if (event.data.type.endsWith("start")) {
      await init();
    }

    if (event.data.type.endsWith("navigated")) {
      const { pathname, search } = event.data.payload;
      history.replaceState({}, "", pathname + search);
      //triggerPostMessage();
    }
  },
  false
);

// const triggerPostMessage = () => {
//   const parseCookie = (str) => {
//     const cookies = str
//       .split(";")
//       .map((v) => `${decodeURIComponent(v.trim())}; SameSite=None; Secure`);
//   };
//   parseCookie(document.cookie);

// };

const init = async () => {
  const userResponse = await tryFetch();
  const user = await userResponse.json();
  ifrm.contentWindow?.postMessage(
    {
      type: "user",
      user,
      apiParams,
    },
    "*"
  );
};

const tryFetch = () => {
  return fetch(apiParams.getUserDetails, {
    method: "GET",
  });
};
