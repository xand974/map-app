import styled from "styled-components";
import Home from "pages/Home";
import Register from "pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  const Main = styled.main``;

  return (
    <Main className="App">
      <Router>
        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;
