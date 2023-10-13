import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import PersonalPage from "./pages/PersonalPage";

import './App.css';

const cache = {};

const router = createBrowserRouter([
  {
    // path: "/", // implicit
    loader: () => {
      return "jujuck";
    },
    id: "global",
    children: [
      {
        path: "/",
        loader: async (req) => {
          if (!cache[req.request.url]) {
            const urlArray = req.request.url.split('?')
            const query = urlArray[1] ? urlArray[1] : null;
            // loaders can be async functions
            const people = await axios.get(`http://localhost:3000/people?${query}`).then(res => res.data);
            cache[req.request.url] = people;
          }
          return cache[req.request.url];
        },
        shouldRevalidate: (crtUrl) => {
          return crtUrl.currentUrl !== crtUrl.nextUrl
        },
        element: (
          <Home />
        ),
      },
      {
        path: "/people/:id",
        loader: async (req) => {
          if (!cache[req.request.url]) {
            // loaders can be async functions
            const people = await axios.get(`http://localhost:3000/people/${req.params.id}`).then(res => res.data);
            cache[req.request.url] = people;
          }
          return cache[req.request.url];
        },
        element: <PersonalPage />,
      },
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
