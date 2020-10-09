import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import {Provider} from "react-redux";
import store from "./redux/store";
import SpecificPostsPage from "./pages/SpecificPostPage";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route render={() => <PostsPage/>} path={'/posts'} exact/>
          <Route render={() => <SpecificPostsPage/>} path={'/posts/:postId'}/>
          <Route render={() => <Redirect to={'/posts'}/>} path={'*'}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
