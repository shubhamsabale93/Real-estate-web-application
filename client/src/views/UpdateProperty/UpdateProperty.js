import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

function UpdateProperty() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [contact, setContact] = useState('');

  const updateProperty = async () => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/updateProperty/${id}`, {
      title: title,
      description: description,
      imageURL: imageURL,
      contact: contact,
    });

    toast.success(response.data.message);
  };

  const loadProperty = async () => {
    if (!id) return;
    const response = await axios.get(`${process.env.REACT_APP_URL}/getProperty/${id}`);
    const propertyData = response.data.data;
    const { title, imageURL, contact, description } = propertyData;

    setTitle(title);
    setImageURL(imageURL);
    setContact(contact);
    setDescription(description);
  };

  useEffect(() => {
    loadProperty(id);
  }, [id]);

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '350px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    button: {
      padding: '10px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#28a745',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    link: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#007bff',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Update Property</h1>

      <form style={styles.form}>
        <input
          type='text'
          placeholder='Enter Name of Property'
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='text'
          placeholder='Demo Images'
          style={styles.input}
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <input
          type='text'
          placeholder='Enter the Contact Information'
          style={styles.input}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type='text'
          placeholder='Enter Property Description'
          style={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type='button' onClick={updateProperty} style={styles.button}>
          Update Property
        </button>
      </form>

      <Link to='/' style={styles.link}>
        Show All Your Properties
      </Link>

      <Toaster />
    </div>
  );
}

export default UpdateProperty;
