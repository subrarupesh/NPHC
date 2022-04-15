import logo from './logo.svg';
import './App.css';
import UploadCSV from './components/UploadCSV';
import Dashboard from './components/Dashboard';
import { Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <UploadCSV />
      <Dashboard />
    </div>
  );
}

export default App;
