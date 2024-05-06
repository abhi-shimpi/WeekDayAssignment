import './App.css';
import MainContainer from './components/main-container/MainContainer';
import './styles/CommanStyles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <MainContainer></MainContainer>
      </Router>
    </div>
  );
}

export default App;
