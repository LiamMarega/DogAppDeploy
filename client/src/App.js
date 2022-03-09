import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home";
import CreateDogs from "./components/Home/CreateDog/CreateDogs";
import Detail from "./components/Details/Detail"
import Spinner from "./components/Spinner/Spinner"



function App() {
     

   
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/dogs" component={CreateDogs} />
          <Route path="/details/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
