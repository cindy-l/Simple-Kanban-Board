import { Route } from "react-router-dom";
import React from "react";
import BoardContainer from "./components/BoardContainer";
import Home from "./components/Home";

const routes = [
  <Route key="/" exact path="/" component={Home}></Route>,
  <Route key="boards" path="/:boards" component={BoardContainer}></Route>,
];

export default routes;
