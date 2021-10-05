import Homepage from "./Components/Homepage"
import Login from "./Components/User/Login"
import SignUp from "./Components/User/SignUp"
import Header from "./Components/Header"

function App() {
  return (
    <div className="App">
      {/* <SignUp /> */}
      <Header />
      <Login />
      <Homepage />
    </div>
  );
}

export default App;
