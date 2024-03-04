import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewUrlComponent = () => {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('/app');
        const allUrls = response.data;
        console.log(allUrls);
        let pipo = Cookies.get();
        console.log(pipo);
        const storedUrls = allUrls.filter(url => Object.values(pipo).includes(url.shortUrl));
        console.log(storedUrls);
        setUrls(storedUrls);
      } catch (error) {
        console.error('Error al obtener las URLs:', error);
      }
    };
    fetchUrls();
  }, [urls]);

  const deleteUrl = async (id) => {
    try {
      await axios.delete(`/app/${id}`);
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