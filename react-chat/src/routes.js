import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";

export const publicRoutes = [
  {
    path: '/home',
    component: <Home />,
  }
]

export const privateRoutes = [
  {
    path: '/chat',
    component: <Chat />,
  }
]