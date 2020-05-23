import * as React from "react";
import { useAuth } from "reactfire";
import { Switch, Route } from "react-router-dom";
import { Rooms } from "./Rooms";

export const Home: React.FC = () => {
  const auth = useAuth();
  return (
    <div>
      <button onClick={() => auth.signOut()}>logout</button>
      <Switch>
        <Route path="/rooms">
          <Rooms />
        </Route>
        <Route path="/">WOW</Route>
      </Switch>
    </div>
  );
};
