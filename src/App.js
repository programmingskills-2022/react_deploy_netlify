import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Search from "./Search";
import Home from "./Home";
import NewPost from "./NewPost";
import PostDetail from "./PostDetail";
import About from "./About";
import Footer from "./Footer";
import Missing from "./Missing";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import EditPost from "./EditPost";
import useFetchAxios from "./hooks/useFetchAxios";
import { action, useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, errorMsg, isLoading } = useFetchAxios(
    "http://localhost:3500/posts"
  );
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div>
      <Header title={"React Js Blog"} />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home errorMsg={errorMsg} isLoading={isLoading} />
        </Route>
        <Route exact path="/post" component={NewPost} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
