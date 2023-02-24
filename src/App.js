import TribezRouter from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
    <Provider store={store}>
      <TribezRouter />
      </Provider>
    </>
  );
}

export default App;
