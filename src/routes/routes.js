import HomePage from "./Home/Home";
import TestPage from "./Test";
import NotFoundPage from "./NotFound";

const routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: HomePage
  },
  {
    path: "/test/:id",
    name: "another",
    component: TestPage
  },
  {
    path: "*",
    name: "404",
    component: NotFoundPage
  }
];

export default routes;
