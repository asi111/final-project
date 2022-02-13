import { DataProvider } from "./useContext/dataContext";

import EditorPage from "./screens/EditorPage";
import { AuthProvider } from "./useContext/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./screens/Home";
import { PositionsProvider } from "./useContext/PositionsContext";
import { LocalStorageProvide } from "./useContext/LocalStorageContext";

import SingUpForm from "./userAccount/SingUpForm";
import LoginForm from "./userAccount/LoginForm";

function App() {
  return (
    <AuthProvider>
      <LocalStorageProvide>
        <DataProvider>
          <PositionsProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route
                  exact
                  path={"/"}
                  render={() => {
                    <Home />;
                  }}
                >
                  <Home />
                </Route>
                <Route
                  exact
                  path={"/EditorPage"}
                  render={() => {
                    <EditorPage />;
                  }}
                >
                  <EditorPage />
                </Route>
                <Route
                  exact
                  path={"/SingUpForm"}
                  render={() => {
                    <SingUpForm />;
                  }}
                >
                  <SingUpForm />
                </Route>
                <Route
                  exact
                  path={"/LoginForm"}
                  render={() => {
                    <LoginForm />;
                  }}
                >
                  <LoginForm />
                </Route>
              </Switch>
            </Router>
          </PositionsProvider>
        </DataProvider>
      </LocalStorageProvide>
    </AuthProvider>
  );
}

export default App;
