import './App.css';
import LeftBar from './components/LeftBar'
import RightContent from './components/RightContent'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';

import Logs from './components/Logs';
import Dashboard from './components/Dashboard';
import MainTable from './components/MainTable';
import Devices from './components/Devices';
import Signal from './components/Signal';
import Grid from './components/Grid';
import Sample from './components/Sample';
import Hello from './components/Hello';
function App() {
    return (
      <Router>
            <div >
                <Route exact path="/Home" component={Home} />
                <Route exact path="/" component={LeftBar} />
                <Route exact path="/" component={RightContent} />
                {/* <Route exact path="/Site" component={Site} />    */}
                <Route exact path="/Logs" component={Logs} /> 
                <Route exact path="/Dashboard" component={Dashboard} /> 
                <Route exact path="/Site" component={MainTable} /> 
                <Route exact path="/Devices" component={Devices} />
                <Route exact path="/Signal" component={Signal} />
                <Route exact path="/Grid" component={Grid} />
                <Route exact path="/Sample" component={Sample} />
                <Route exact path="/Hello" component={Hello} />
            </div>
            </Router>
  );
}

export default App;
