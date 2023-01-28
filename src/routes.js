import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "react-query";
import Collection from "./pages/collections";
import Home from "./pages/home";
import Search from "./pages/search";

const queryClient = new QueryClient();

const routes = [
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    ),
  },
  {
    path: "collection/:collectionID",
    element: (
      <QueryClientProvider client={queryClient}>
        <Collection />
      </QueryClientProvider>
    ),
  },
  {
    path: "search/:searchID",
    element: (
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    ),
  },
];

export default routes;
