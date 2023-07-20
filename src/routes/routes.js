import Home from '../pages/home/Home';
import Chat from "../pages/chat/Chat";
import Gallery from "../pages/gallery/Gallery";

export const publicRoutes = [
  { path: '/home', component: <Home />, exact: true, },
]

export const privateRoutes = [
  { path: '/chat', component: <Chat />, exact: true, },
  { path: '/gallery', component: <Gallery />, exact: true, },
]