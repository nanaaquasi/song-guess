import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import PlaylistSelect from "./pages/PlaylistSelect";
import Quiz from "./pages/Quiz";
import RedirectPage from "./pages/RedirectPage";
import ScoresPage from "./pages/ScoresPage";
import Welcome from "./pages/Welcome";

const Navigator = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/redirect' component={RedirectPage} />
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/scores/:id' component={ScoresPage} />
      <Route exact path='/user/playlists' component={PlaylistSelect} />
      <Route exact path='/quiz/playlist/:id' component={Quiz} />
    </Switch>
  );
};

export default Navigator;
