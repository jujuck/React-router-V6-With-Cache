import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import PersonalPage from "./pages/PersonalPage";

import './App.css';

const cache = {};

let isConnected = false;

function Login() {
  const somewhereToRedirect = useLoaderData();

  const navigate = useNavigate();

  return (
    <form>
      <button onClick={() => {
        isConnected = true;

        if (somewhereToRedirect) {
          navigate(somewhereToRedirect);
        }
      }}>
        log in
      </button>
    </form>
  )
}

const router = createBrowserRouter([
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
    path: "/login",
    loader: ({ request }) => {
      return new URL(request.url).searchParams.get("redirect");
    },
    element: <Login />
  },
  {
    element: (
      <> {/* could be a context provider */}
        <Outlet />
      </>
    ),
    loader: ({ request }) => {
      if (!isConnected) {
        const url = new URL(request.url);

        return redirect(`/login?redirect=${url.pathname + url.search + url.hash}`);
      }

      return null; // mandatory
    },
    children: [
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
