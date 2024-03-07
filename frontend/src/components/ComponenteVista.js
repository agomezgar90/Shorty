import React, { useEffect, useState } from 'react'
import axios from "axios"
import DeleteUrlButton from './ComponenteBorrar'


const ComponenteVista = ({ urls, setUrls }) => {
  
  const fetchUrlAndSetUrl = async () => {
    const result = await axios.get("http://localhost:3333/app");
    setUrls(result.data);
  };

  useEffect(() => {
    fetchUrlAndSetUrl();
  }, [])

  const handleDeleteUrl = (id) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  return (
    <div>
      <div className="table-responsive">
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
                  <DeleteUrlButton id={url.id} onDelete={handleDeleteUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ComponenteVista;