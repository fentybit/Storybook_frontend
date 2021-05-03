import './App.css';
import NavigationContainer from './containers/NavigationContainer';
import EventViewContainer from './containers/EventViewContainer';
import DisplayContainer from './containers/DisplayContainer';

function App() {
  return (
    <div className="App">
      <NavigationContainer />
      <hr />
      <EventViewContainer />
      <hr />
      <DisplayContainer />
    </div>
  );
}

export default App;