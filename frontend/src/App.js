import "bootstrap/dist/css/bootstrap.min.css";
import ComponenteBorrar from "./components/ComponenteAcortar";
import ComponenteVista from "./components/ComponenteVista";
import React, { useState } from 'react';


function App() {
  const [urls, setUrls] = useState([]);

  return (
    <div className="App container mt-5">
      <ComponenteBorrar setUrls={setUrls} />
      <ComponenteVista urls={urls} setUrls={setUrls} />
    </div>
  );
}

export default App;