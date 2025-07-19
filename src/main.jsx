import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Users from './components/Users.jsx';
import Layout from './Layouts/Layout.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
        loader: () => fetch('https://coffee-store-server-pink-tau.vercel.app/getcoffee'),
      },
      {
        path: 'addcoffee',
        element: <PrivateRoute>
          <AddCoffee />
        </PrivateRoute>
      },
      {
        path: 'updatecoffee/:id',
        element: <PrivateRoute>
          <UpdateCoffee></UpdateCoffee>
        </PrivateRoute>,
        loader: ({ params }) =>
          fetch(`https://coffee-store-server-pink-tau.vercel.app/getcoffee/${params.id}`),
      },
      {
        path: 'coffeedetails/:id',
        element: 
          <CoffeeDetails />,
        
        loader: ({ params }) =>
          fetch(`https://coffee-store-server-pink-tau.vercel.app/getcoffee/${params.id}`),
      },
      {
        path: 'users',
        element:<PrivateRoute>
           <Users />
        </PrivateRoute>,
        loader: () => fetch('https://coffee-store-server-pink-tau.vercel.app/users'),
      },
    ],
  },
  // Auth routes outside Layout (optional)
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
