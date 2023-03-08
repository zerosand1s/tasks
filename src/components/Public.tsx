import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import WelcomePage from 'pages/WelcomePage';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path: '/*',
    element: <Navigate to="/welcome" replace />
  }
]);

const Public = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Public;
