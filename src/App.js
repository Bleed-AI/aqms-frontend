import "./App.css";
import { BrowserRouter } from "react-router-dom";
import WebRouter from "./route";
import { UserProvider } from "./context/UserContext/UserContext";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';


const queryClient = new QueryClient();


function App() {
  return (
    <div className="App">
       {/* <Helmet>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Helmet> */}
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <WebRouter />
        </UserProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
