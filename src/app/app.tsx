import React from "react";
import "../style/style.sass";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./homePage"
import TodoPage from "./todoPage"


class App extends React.Component {
  constructor(props:any) {
    super(props);
    this.activePage = this.activePage.bind(this)
  }

  activePage(event:any){
    let target = event.target
    let allElem = event.currentTarget.childNodes
    if(target.tagName == 'A' && !target.className.includes('link_black' )){
      for(let i=0; i < 2; i++){
        let link = allElem[i].firstChild
        if(link.className.includes('link_black')){
          link.classList.remove('link_black')
        }
        else{
          link.classList.add('link_black')
        }
      }
    }
  }

 
  render() {
    return (
      <Router>
        <div className="main_page">
          <ul 
          onClick={this.activePage}
           className="head">
            <li>
              <Link className='link link_black' to="/Home">Пингвины</Link>
            </li>
            <li>
              <Link className='link' to="/todocase">Дела</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/Home">
              <HomePage />
            </Route>
            <Route path="/todocase">
              <TodoPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
