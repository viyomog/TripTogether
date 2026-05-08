importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDPew83Uek8Zw2sRTzwo38hdiDAhyb1SCo",
  authDomain: "triptogether9191.firebaseapp.com",
  projectId: "triptogether9191",
  storageBucket: "triptogether9191.firebasestorage.app",
  messagingSenderId: "1007061520652",
  appId: "1:1007061520652:web:4863d10ee5b3e00a03b929",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png", // Make sure to have a logo in public folder or use default
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
