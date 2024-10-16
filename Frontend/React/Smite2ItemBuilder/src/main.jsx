import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import App, { loader as itemLoader } from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import ItemBuilder from './pages/ItemBuilder.jsx';
import ShowingItemsGrid from "./pages/ShowingItemsGrid.jsx";
import ShowingItemsShop from "./pages/ShowingItemsShop.jsx";

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
        path: "Items",
        element: <ShowingItemsGrid />,
        loader: itemLoader,
      },
      {
        path: "Shop",
        element: <ShowingItemsShop />,
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
