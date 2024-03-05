import "bootstrap/dist/css/bootstrap.min.css";
import AddUrlComponent from "./components/ComponenteAcortar";
import ViewUrlComponent from "./components/ComponenteVista";
import React, { useState } from 'react';


function App() {
  const [urls, setUrls] = useState([]);

  console.log("Fallo");

  return (
    <div className="App container mt-5">
      <AddUrlComponent setUrls={setUrls} />
      <ViewUrlComponent urls={urls} setUrls={setUrls} />
    </div>
  );
}

export default App;