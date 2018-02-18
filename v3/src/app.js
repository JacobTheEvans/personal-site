//import needed libraries
import React from "react";
import {Route, HashRouter, Switch} from "react-router-dom";
import Scroll from "./components/scroll.js";

//import nav and footer
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";

//import components
import Home from "./containers/home_container.js";
import Blog from "./containers/blog_container.js";
import Article from "./containers/article_container.js";
import NotFound from "./components/404.js";
import Login from "./containers/login_container.js";
import Manage from "./containers/manage_container.js";
import ManageItemContainer from "./containers/manage_item_container.js";

let navItems = [
  {"name": "Home", link: "/"},
  {"name": "Blog", link: "/blog"}
];

const Root = () => (
  <HashRouter>
    <Scroll>
      <div className="wrapper">
        <Navbar logoText="Jacob Evans" navItems={navItems}/>
        <div id="page-wrap">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/blog" component={Blog}/>
            <Route path="/article/:id" component={Article} />
            <Route path="/login" component={Login} />
            <Route path="/manage" component={Manage} />
            <Route path="/manage-item/:id" component={ManageItemContainer} />
            <Route redirectLink="/" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Scroll>
  </HashRouter>

)
export default Root;
