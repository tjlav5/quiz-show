import * as React from "react";
import "./styles.css";
import {
  RouteProps,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { FirebaseAppProvider, StorageImage, AuthCheck } from "reactfire";
import { Login } from "./Login";
import { Home } from "./Home";

const firebaseConfig = {
  apiKey: "AIzaSyDfUD_CHRtOdBAW1bI7jvHGDFyhhFmwyWw",
  authDomain: "etj-baby-shower.firebaseapp.com",
  databaseURL: "https://etj-baby-shower.firebaseio.com",
  projectId: "etj-baby-shower",
  storageBucket: "etj-baby-shower.appspot.com",
  messagingSenderId: "579035071622",
  appId: "1:579035071622:web:412ebcfd16f1fe87993d07"
};

const RootProviders: React.FC = ({ children }) => (
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    {children}
  </FirebaseAppProvider>
);

const Test: React.FC = () => {
  const profileImagePath = "IMG_20180313_223943.jpg";
  return (
    <StorageImage style={{ width: "100%" }} storagePath={profileImagePath} />
  );
};

export default function App() {
  return (
    <RootProviders>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </React.Suspense>
    </RootProviders>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => (
        <AuthCheck
          fallback={
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          }
        >
          {children}
        </AuthCheck>
      )}
    />
  );
};
