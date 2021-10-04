import './App.css';
import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"


function App() {
  return (
    <div className="App">
      <SignUp />
      <Homepage />
    </div>
  );
}

export default App;
