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
        path: "itemBuilder",
        element: <ItemBuilder />,
        children: [
          {
            path: "/itemBuilder/",
            element: <BuildInfo />,
            loader: itemLoader,
          },
          {
            path: "addItem",
            element: <ItemSelector />,
            loader: itemLoader,
          },
        ]
      },
      {
        path: "items",
        element: <ShowingItemsGrid />,
        loader: itemLoader,
      },
      {
        path: "shop",
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
