import './App.css';
import NavigationContainer from './containers/NavigationContainer';
import DisplayContainer from './containers/DisplayContainer';

function App() {
  return (
    <div className="App">
      <NavigationContainer />
      {/* <EventListContainer /> */}
      <DisplayContainer />
    </div>
  );
}

export default App;