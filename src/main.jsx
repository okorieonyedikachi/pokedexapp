import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PokemonDetails from './routes/PokemonDetails.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetails/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
