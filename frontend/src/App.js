import "bootstrap/dist/css/bootstrap.min.css";
import AddUrlComponent from "./components/ComponenteAcortar";
import ViewUrlComponent from "./components/ComponenteVista";

function App() {
  return (
    <div className="App container mt-5">
      <AddUrlComponent />
      <ViewUrlComponent />
    </div>
  );
}

export default App;