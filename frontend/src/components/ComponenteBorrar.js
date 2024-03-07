import React from 'react';
import axios from 'axios';

const ComponenteBorrar = ({ id, onDelete }) => {

  const deleteUrl = async () => {
    try {
      axios.delete(`http://localhost:3333/app/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };
  return (
    <button type='button' className='btn btn-danger btn-sm' onClick={deleteUrl}>X</button>
  );
};
export default ComponenteBorrar;