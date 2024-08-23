import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import CreateAlbum from '../components/CreateAlbum/CreateAlbum';
import UpdateAlbum from '../components/UpdateAlbum';
import AlbumPage from '../components/AlbumPage/AlbumPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "albums/:albumId",
        element: <AlbumPage />
      },
      {
        path: "albums/new",
        element: <CreateAlbum />
      },
      {
        path: "/albums/:albumId/edit",
        element: <UpdateAlbum />
      }
    ],
  },
]);
