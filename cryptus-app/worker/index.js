console.log("Loaded service worker!");

self.addEventListener("push", (ev) => {
  const data = ev.data.text();
  console.log("Got push", data);
  self.registration.showNotification("PublicWallet", {
    body: "Hello ? are you still there! I have 100X my money with this project...",
    icon: "https://www.publicwallet.app/icons/android-chrome-192x192.png",
  });
});
