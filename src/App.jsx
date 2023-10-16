import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import PersonalPage from "./pages/PersonalPage";

import "./App.css";

const cache = {};

const router = createBrowserRouter([
  {
    path: "/",
    loader: async ({ request }) => {
      if (!cache[request.url]) {
        const query = new URL(request.url).search;

        // loaders can be async functions
        const people = await axios.get(`http://localhost:3000/people${query}`).then(res => res.data);

        cache[request.url] = people;
      }

      return cache[request.url];
    },
    element: (
      <Home />
    ),
  },
  {
    path: "/people/:id",
    loader: async ({ request, params }) => {
      if (!cache[request.url]) {
        // loaders can be async functions
        const people = await axios.get(`http://localhost:3000/people/${params.id}`).then(res => res.data);

        cache[request.url] = people;
      }

      return cache[request.url];
    },
    element: <PersonalPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
