import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';
import AddConfirmationModal from './AddConfirmationModal';
import EditConfirmationModal from './EditConfirmationModal';

// Using Arrow Function
const Confirmation = () => {
  const location = useLocation();
  const [confirmationData, setConfirmationData] = useState([]); // State to store the fetched data

  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleEdit = (id) => {
    setSelectedItemId(id);
  };

  useEffect(() => {
    fetchConfirmationData(); // Fetch data when the component mounts
    feather.replace(); // Replace the icons after component mounts
  }, []);

  const fetchConfirmationData = () => {
    axios.get('http://localhost:5000/confirmations')
      .then(response => {
        // Sort the data by ID in ascending order
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setConfirmationData(sortedData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete data Confirmation Template with ID ${id}?`);
    
    if (confirmDelete) {
        axios.delete(`http://localhost:5000/confirmations/${id}`)
          .then(response => {
            console.log('Delete successful');
            fetchConfirmationData();
          })
          .catch(error => {
            console.error(error);
          });
    }
  };

  const handleSend = (id) => {
    // Send a DELETE request to your endpoint with the selected id
    axios.post('http://localhost:5000/send-confirmation', { id: id })
      .then(response => {
        console.log('Send successful');
        // Refresh the data after deletion
        fetchConfirmationData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3"><strong>Confirmation Message</strong></h1>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Tambah Data</h5>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addConfirmationModal">
                  <i className="" data-feather="plus"></i>
                   Add Confirmation Template
                </button>
                <AddConfirmationModal reloadData={fetchConfirmationData}/>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Id Template</th>
                        <th>Pembuka</th>
                        <th>Isi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmationData.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.pembuka}</td>
                          <td>{item.message}</td>
                          <td>
                            <button type="button" className="btn btn-primary" onClick={() => handleEdit(item.id)} data-bs-toggle="modal" data-bs-target="#editConfirmationModal">
                              <i className="" data-feather="edit"></i>
                              Edit
                            </button>
                            <EditConfirmationModal
                                id={selectedItemId}
                                reloadData={fetchConfirmationData}
                              />
                            <button
                            className="btn btn-danger mt-2" onClick={() => handleDelete(item.id)} // Pass the id to the handler
                            >
                            <i className="align-middle" data-feather="trash"></i> Delete
                            </button>
                            <button
                              className="btn btn-success mt-2"
                              onClick={() => handleSend(item.id)} // Pass the id to the handleSend function
                            >
                            <i className="align-middle" data-feather="send"></i> Kirim
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default Confirmation;
