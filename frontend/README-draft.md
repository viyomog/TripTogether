![NPM Version](https://img.shields.io/npm/v/frontend?style=flat-square)
![License](https://img.shields.io/badge/License-ARR-blue.svg?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dt/frontend?style=flat-square)

# TripTogether

TripTogether is a modern, full-featured social travel planning platform designed to help adventurers connect, plan, and share their journeys seamlessly. Whether you're organizing a group expedition, discovering new destinations, or looking for travel companions, TripTogether provides the tools to make your travel dreams a reality.

## Description

TripTogether is a dynamic frontend application built with React and Vite, offering an intuitive and engaging user experience. It serves as a central hub for travelers to:

*   **Plan journeys**: Manually add destinations and dates, or leverage AI to generate trip itineraries based on prompts.
*   **Connect with others**: Find fellow travelers, follow their adventures, and engage in real-time chat.
*   **Communicate effectively**: Utilize integrated voice and video calling features for seamless coordination with travel mates.
*   **Explore destinations**: Discover popular cities, view detailed information, and get inspired for your next adventure.
*   **Manage profiles**: Personalize your profile, showcase your travel styles and interests, and track your followers and following.

The application emphasizes a beautiful, responsive design powered by Tailwind CSS and smooth animations with Framer Motion, ensuring a delightful experience across all devices.

## Features

*   **User Authentication**: Secure sign-up and login with email/password or Google OAuth.
*   **Personalized Profiles**: Create and manage your traveler profile, including bio, age, gender, location, travel interests, and styles.
*   **Follow System**: Follow other users to see their activities and connect with potential travel mates.
*   **Real-time Chat**: Engage in one-on-one instant messaging with your followers and following.
*   **Voice & Video Calls**: Integrated WebRTC-based voice and video calling for direct communication within the app.
*   **Journey Planner**:
    *   **Manual Planning**: Add destinations and dates to build your itinerary.
    *   **AI-Powered Planning**: Generate trip plans using natural language prompts with an AI assistant.
*   **Destination Discovery**: Explore popular cities with detailed information and stunning imagery.
*   **Saved Trips**: Curate and manage a collection of your dream destinations and planned adventures.
*   **Notifications**: Receive real-time updates and messages via Firebase Cloud Messaging.
*   **Responsive UI**: Optimized for a seamless experience on desktop, tablet, and mobile devices using Tailwind CSS.
*   **Smooth Animations**: Enhanced user experience with fluid page transitions and component animations powered by Framer Motion.

## Installation

To get TripTogether up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/triptogether-frontend.git
    cd triptogether-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project based on `.env.example`. You will need to provide the following:
    ```
    VITE_API_URL="http://localhost:5000" # Or your deployed backend URL
    VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    VITE_UNSPLASH_ACCESS_KEY="YOUR_UNSPLASH_ACCESS_KEY"
    ```
    *   `VITE_API_URL`: The URL of your backend server.
    *   `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID for Google Sign-In.
    *   `VITE_UNSPLASH_ACCESS_KEY`: Your Unsplash API access key for fetching city images.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

## Usage

Once the application is running, you can:

1.  **Register/Login**: Create a new account or log in using your credentials or Google.
2.  **Explore**: Navigate through the "Home" page to discover popular cities and inspiring journeys.
3.  **Find Mates**: Visit the "Find Mates" section to connect with other travelers.
4.  **Plan a Journey**: Go to the "Journey Planner" to manually add destinations or use the AI to generate a plan.
5.  **Chat & Call**: Use the "Messages" section to chat with your connections and initiate voice or video calls.

### Critical Code Snippet: Initiating a WebRTC Call

One of the core real-time communication features is the ability to initiate voice and video calls. The `startCall` function within `src/context/CallContext.jsx` demonstrates the intricate process of setting up a WebRTC connection, including media device access, error handling, and signaling via Socket.io.

```jsx
// src/context/CallContext.jsx
  const startCall = async (receiverId, receiverName, receiverImage, type = "audio") => {
    try {
      // 1. Request media access (audio and/or video)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: type === "video" 
      });
      localStream.current = stream;
      
      setCallType(type);
      setCallData({ 
        peerId: receiverId, 
        peerName: receiverName, 
        peerImage: receiverImage 
      });
      setCallStatus("outgoing");
      outgoingRingRef.current.play().catch(e => console.log("Audio play blocked:", e));

      // 2. Set up a timeout for missed calls
      callTimeoutRef.current = setTimeout(() => {
        if (callStatus === "outgoing") {
          saveCallHistory("missed"); // Placeholder for saving call history
          endCall();
        }
      }, 45000); // 45 seconds timeout

      // 3. Initialize RTCPeerConnection
      initPeerConnection(); // This sets up onicecandidate and ontrack handlers
      
      // 4. Add local media tracks to the peer connection
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      // 5. Create and set local SDP offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      // 6. Signal the offer to the peer via Socket.io
      socket.emit("call-user", {
        to: receiverId,
        offer,
        fromName: user?.fullName || "Traveler",
        fromImage: user?.profilePic || "",
        callType: type
      });
    } catch (err) {
      console.error("Failed to start call:", err);
      // 7. Handle various media access errors
      if (err.name === "NotAllowedError") {
        alert("Permission denied. Please allow microphone and camera access in your browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        if (type === "video") {
          const tryVoice = window.confirm("No camera found. Would you like to start a voice call instead?");
          if (tryVoice) {
            startCall(receiverId, receiverName, receiverImage, "audio");
          }
        } else {
          alert("No microphone found on this device.");
        }
      } else {
        alert("Could not access media devices. Please check your settings.");
      }
    }
  };
```

## Tech Stack

*   **Frontend Framework**: React (with Hooks and Context API)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS, PostCSS, Custom CSS
*   **Routing**: React Router DOM
*   **Real-time Communication**: Socket.io Client
*   **Animations**: Framer Motion
*   **HTTP Client**: Axios
*   **Authentication**: Google OAuth, Custom JWT/Cookie-based
*   **Notifications**: Firebase (FCM)
*   **Date Management**: Day.js
*   **Unique IDs**: UUID
*   **Linting**: ESLint
*   **Deployment**: Vercel (configuration provided in `vercel.json`)

## Project Structure

```
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── favicon.png
│   ├── favicon.svg
│   ├── firebase-messaging-sw.js
│   ├── icons.svg
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── london.jpg
│   ├── main-img.jpg
│   ├── newyork.jpg
│   ├── paris.jpg
│   ├── rome.jpg
│   ├── sydney.jpg
│   ├── tokyo.jpg
│   ├── trip1.jpg
│   ├── trip2.jpg
│   ├── trip3.jpg
│   ├── trip4.jpg
│   ├── trip5.jpg
│   └── trip6.jpg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   ├── hero.png
│   │   ├── loginpage
│   │   │   └── travel-hero.jpg
│   │   ├── logo
│   │   │   └── logo.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── Auth
│   │   │   └── AuthLayout.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageTransition.jsx
│   │   ├── PopularCities.jsx
│   │   ├── TimeLineJouney.jsx
│   │   ├── TravelLoader.jsx
│   │   ├── UserCard.jsx
│   │   ├── VideoCallModal.jsx
│   │   └── VoiceCallModal.jsx
│   ├── config
│   │   └── api.js
│   ├── context
│   │   ├── CallContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── userContext.jsx
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── ChatPage.jsx
│   │   ├── CityInfoPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── CookiePolicyPage.jsx
│   │   ├── FaqPage.jsx
│   │   ├── FindMatesPage.jsx
│   │   ├── FollowersPage.jsx
│   │   ├── FollowingPage.jsx
│   │   ├── HelpCenterPage.jsx
│   │   ├── Home.jsx
│   │   ├── JourneyPlanner.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MyJourneysPage.jsx
│   │   ├── PrivacyPolicyPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SavedTripsPage.jsx
│   │   ├── SignupPage.jsx
│   │   └── TermsOfServicePage.jsx
│   └── styles
│       ├── Auth.css
│       ├── FollowersPage.css
│       └── FollowingPage.css
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## API

TripTogether interacts with a dedicated backend API to manage user data, authentication, chat, calls, and trip planning. The base URL for the API is configured in `src/config/api.js` and can be set via the `VITE_API_URL` environment variable.

Key API endpoints and interactions include:

*   **Authentication**:
    *   `POST /api/auth/signup`: User registration.
    *   `POST /api/auth/login`: User login.
    *   `POST /api/auth/google-sign-in`: Google OAuth integration.
*   **User Profiles**:
    *   `GET /api/user-profile/get-my-profile`: Retrieve current user's profile.
    *   `GET /api/user-profile/get-user-profile/:username`: Retrieve another user's profile.
    *   `POST /api/user-profile/update-fcm-token`: Update Firebase Cloud Messaging token for notifications.
    *   `POST /api/user-profile/follow-user`: Follow or unfollow a user.
    *   `GET /api/user-profile/get-followers[/:username]`: Get followers list.
    *   `GET /api/user-profile/get-following[/:username]`: Get following list.
    *   `GET /api/user-profile/get-profiles-from-username`: Search for users by username.
*   **Chat & Calls**:
    *   `GET /api/chat/:receiverId`: Fetch messages for a conversation.
    *   `POST /api/chat/send/:receiverId`: Send a new message.
    *   **Socket.io Events**:
        *   `call-user`: Initiate a call.
        *   `answer-call`: Accept an incoming call.
        *   `ice-candidate`: Exchange ICE candidates for WebRTC.
        *   `end-call`: Terminate a call.
        *   `decline-call`: Reject an incoming call.
        *   `newMessage`: Receive real-time messages.
        *   `getOnlineUsers`: Get list of online users.
*   **City Information & Journey Planning**:
    *   `GET /api/city/:cityName`: Fetch details about a specific city.
    *   `POST /api/city/ai-plan`: Generate a trip plan using AI.

## Contributing

We welcome contributions to TripTogether! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  **Fork the repository.**
2.  **Create a new branch** (`git checkout -b feature/your-feature-name` or `bugfix/your-bug-fix`).
3.  **Make your changes.**
4.  **Commit your changes** (`git commit -m 'feat: Add new feature'`).
5.  **Push to your branch** (`git push origin feature/your-feature-name`).
6.  **Open a Pull Request** describing your changes.

Please ensure your code adheres to the project's coding style and passes all linting checks.

## License

This project is licensed under the **ARR License**.