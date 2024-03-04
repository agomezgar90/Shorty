import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../App.css'; // Importa tu archivo CSS

const ViewUrlComponent = () => {
  const [urls, setUrls] = useState([{}]);

  useEffect(() => {
    const fetchUrlAndSetUrl = async () => {
      const result = await axios.get("http://localhost:3333/app");
      setUrls(result.data);
    };
    fetchUrlAndSetUrl();
  }, [urls]);

  const deleteUrl = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/app/${id}`);
      setUrls(urls.filter(url => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div class="table-responsive">
      <table className="table text-center">
        <thead className="table-primary text-center">
          <tr>
            <th>Url Original</th>
            <th>Url Acortada</th>
            <th>Veces usada</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.fullUrl}</td>
              <td>
                <a href={`${url.shortUrl}`}>{url.shortUrl}</a>
              </td>
              <td>{url.counts}</td>
              <td>
                <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteUrl(url.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;