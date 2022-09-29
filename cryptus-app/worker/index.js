console.log("Loaded service worker!");

self.addEventListener("push", (ev) => {
  const data = ev.data.text();
  const title = JSON.parse(data).title
  console.log("Got push", title);
  self.registration.showNotification("PublicWallet", {
    body: title,
    icon: "https://www.publicwallet.app/icons/android-chrome-192x192.png",
  });
});