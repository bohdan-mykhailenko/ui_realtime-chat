import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";
import Gallery from "./components/gallery/Gallery";

export const publicRoutes = [
  { path: '/home', component: <Home />, exact: true, },
]

export const privateRoutes = [
  { path: '/chat', component: <Chat />, exact: true, },
  { path: '/gallery', component: <Gallery />, exact: true, },
]