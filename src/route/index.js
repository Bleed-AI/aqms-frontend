import React from "react";
import Error from "../pages/Error";
import { useRoutes } from "react-router-dom";
import Rates from "../views/group/Rates";
import FileConfiguration from "../components/Rates/FileConfiguration";
import Group from "../pages/Group";
import Login from "../components/Login/Login";
import Organization from "../pages/Organization";

export default function WebRouter() {
  let routes = useRoutes([
    { path: "/dashboard", element: <Organization />},
    { path: "/dashboard/:org_id", element: <Organization /> },
    { path: "/dashboard/:org_id/:view", element: <Organization /> },
    { path: "/organization/:org_id/group/:group_id", element: <Group /> },
    { path: "/organization/:org_id/group/:group_id/:view", element: <Group /> },
    { path: "/", element: <Login /> },
    { path: "*", element: <Error /> },
  ]);
  return routes;
}
