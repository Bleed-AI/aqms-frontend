import "./App.css";
import { BrowserRouter } from "react-router-dom";
import WebRouter from "./route";
import { UserProvider } from "./context/UserContext/UserContext";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <WebRouter />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
