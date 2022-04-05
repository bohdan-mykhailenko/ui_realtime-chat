import { CHAT_ROUTE, HOME_ROUTE } from "./utils/consts";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    component: <Home />,
  }
]

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    component: <Chat />,
  }
]