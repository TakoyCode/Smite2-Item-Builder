import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import App, { loader as itemLoader } from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import ItemBuilder from './pages/ItemBuilder.jsx';
import ShowingItemsGrid from "./pages/ShowingItemsGrid.jsx";
import ItemSelector from "./pages/ItemSelector.jsx";
import BuildInfo from './pages/BuildInfo.jsx';

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
        children: [
          {
            path: "/Item-Builder/",
            element: <BuildInfo />,
            loader: itemLoader,
          },
          {
            path: "Add-Item",
            element: <ItemSelector />,
            loader: itemLoader,
          },
        ]
      },
      {
        path: "Items",
        element: <ShowingItemsGrid />,
        loader: itemLoader,
      },
      {
        path: "Shop",
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
