import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";
import Gallery from "./components/gallery/Gallery";

export const publicRoutes = [
  { path: '/home', component: <Home />, exaxt: true, },
]

export const privateRoutes = [
  { path: '/chat', component: <Chat />, },
  { path: '/gallery', component: <Gallery />, exaxt: true, },
]