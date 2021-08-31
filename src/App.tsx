import "./App.css";
import { Login } from "./Login/Login";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

export default App;
