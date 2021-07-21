import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from "./components/Users";
import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";

const  App = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact>
          <Users />
        </Route>
        <Route path={"/posts"} exact>
          <Posts />
        </Route>
        <Route path={"/posts/:postId"} exact>
          <PostDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
