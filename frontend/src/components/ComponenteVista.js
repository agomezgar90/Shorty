import React, { useEffect, useState } from 'react'
import axios from "axios"

const ViewUrlComponent= () => {
    const [urls, setUrls] = useState([{}]);

    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios.get("http://localhost:3333/app");
        setUrls(result.data);
      };
      fetchUrlAndSetUrl();
    }, [urls]);

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Url Original</th>
            <th>Url Acortada</th>
            <th>Veces usada</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;