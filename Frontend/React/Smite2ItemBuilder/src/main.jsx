import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import App, { loader as itemLoader } from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import ItemBuilder from './pages/ItemBuilder.jsx';
import ItemSelector from "./components/ItemSelector.jsx";

import './index.css'
import './fonts/Outfit.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: itemLoader,
    children: [
      {
        path: "Item-Builder",
        element: <ItemBuilder />,
      },
      {
        path: "Builds",
        element: <ItemSelector />,
        loader: itemLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
