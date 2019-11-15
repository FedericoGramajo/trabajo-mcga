import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'

function App() {
  return (
    <Router>
      <Route exact path={'/'} component={Login}/>
      <Route exact path={'/home'} component={Home}/>
    </Router>
  );
}

export default App;



/* route para renderice
exact para que sea exacta la ruta====> http://localhost:3000/login*/
