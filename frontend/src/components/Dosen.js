import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/createDosen.css';

const Dosen = () => {
  const [dosenData, setDosenData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    nidn: '',
    no_whatsapp: '',
  });

  useEffect(() => {
    fetchDosenData();
  }, []);

  const fetchDosenData = async () => {
    try {
      const response = await axios.get('http://localhost:5005/dosen');
      setDosenData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteDosen = async (id_dosen) => {
    console.log('ID yang akan dihapus:', id_dosen);
    try {
      await axios.delete(`http://localhost:5005/dosen/${id_dosen}`);
      fetchDosenData();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id_dosen) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (shouldDelete) {
      deleteDosen(id_dosen);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id_dosen: '',
      nama: '',
      nip: '',
      nidn: '',
      no_whatsapp: '',
    });
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validasi Nama: Hanya huruf diizinkan
    if (name === "nama" && /[^a-zA-Z\s]/.test(value)) {
      alert("Nama hanya boleh mengandung huruf.");
      return;
    }
  
    // Validasi NIP: Hanya angka diizinkan
    if (name === "nip" && /[^0-9]/.test(value)) {
      alert("NIP hanya boleh mengandung angka.");
      return;
    }
  
    // Validasi NIDN: Hanya angka diizinkan
    if (name === "nidn" && /[^0-9]/.test(value)) {
      alert("NIDN hanya boleh mengandung angka.");
      return;
    }
  
    // Validasi NO WHATSAPP: Hanya angka diizinkan
    // if (name === "no_whatsapp" && !/^\+\d{11,15}$/.test(value)) {
    //   alert("Masukkan nomor telepon dengan format yang benar, contoh: +6280102108290");
    //   return;
    // }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleEdit = (dosen) => {
    setFormData({
      id_dosen: dosen.id_dosen,
      nama: dosen.nama,
      nip: dosen.nip,
      nidn: dosen.nidn,
      kode_dosen: dosen.kode_dosen,
      no_whatsapp: dosen.no_whatsapp,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (formData.id_dosen) {
      try {
        await axios.put(`http://localhost:5005/dosen/${formData.id_dosen}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        fetchDosenData();
        handleCloseModal();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:5005/dosen', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        fetchDosenData();
        handleCloseModal();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const handleEditSave = async (dosen) => {
    const { id_dosen, ...formDataWithoutId } = formData; // Pisahkan id_dosen dari formData
  
    try {
      await axios.patch(`http://localhost:5005/dosen/${id_dosen}`, formDataWithoutId, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchDosenData();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleFileUpload = async (e) => {
    const fileInput = e.target; // Get a reference to the file input element
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('excelFile', file);
  
    // Show a confirmation dialog before proceeding with the upload
    const confirmUpload = window.confirm("Are you sure you want to upload this Excel file?");
    
    if (confirmUpload) {
      try {
        const response = await axios.post('http://localhost:5005/dosen-bulk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        fetchDosenData(); // Fetch the updated data
  
        // Clear the file input field after successful upload
        fileInput.value = ''; // Reset the file input value to an empty string
      } catch (error){
        console.error(error);
      }
    } else {
      // User canceled the upload, you can handle it as needed
      console.log("Upload canceled.");
    }
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">
          <strong>Data Dosen</strong>
        </h1>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
            <div className="card-header">
              
                <h5 className="card-title">Tambah 1 Data Dosen</h5>
                <button className="btn btn-primary mt-2 mb-5" onClick={handleShowModal}>
                  Tambah Dosen
                </button>
                <h5 className="card-title">Tambah Data Dosen Excel</h5>
                <div className="upload-section">
                  <label htmlFor="fileInput" className="btn btn-secondary upload-button">
                    Unggah Excel
                  </label>
                  <input type="file" id="fileInput" accept=".xlsx" onChange={handleFileUpload} />
                  <a className="btn btn-primary download-template" href="/template/template-dosen.xlsx" download>
                    <i className="icon" data-feather="download"></i>
                    <span>Download Template</span>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>NIP</th>
                        <th>NIDN</th>
                        <th>KODE DOSEN</th>
                        <th>No Whatsapp</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                    {dosenData.map((dosen, index) => (
                      <tr key={dosen.id_dosen}>
                        <td>{index + 1}</td>
                        <td>{dosen.id_dosen}</td>
                        <td>{dosen.nama}</td>
                        <td>{dosen.nip}</td>
                        <td>{dosen.nidn}</td>
                        <td>{dosen.kode_dosen}</td>
                        <td>{dosen.no_whatsapp}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(dosen)}
                            className="btn btn-primary mt-2 border"
                            style={{ marginRight: '5px' }}
                          >
                            Edit
                          </button>
                          <button onClick={() => confirmDelete(dosen.id_dosen)} className="btn btn-danger mt-2 border">
                            Delete
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
      
      {/* Render the modal if showModal is true */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.id_dosen ? `Edit Dosen` : 'Tambah Dosen'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="id_dosen" hidden>
                <Form.Control type="text" name="id_dosen" value={formData.id_dosen} onChange={handleChange} placeholder='ID Dosen' required/>
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder='Nama Dosen' required/>
              </Form.Group>
              <Form.Group controlId="nip">
                <Form.Label>NIP</Form.Label>
                <Form.Control type="text" name="nip" value={formData.nip} onChange={handleChange} placeholder='NIP Dosen' required/>
              </Form.Group>
              <Form.Group controlId="nidn">
                <Form.Label>NIDN</Form.Label>
                <Form.Control type="text" name="nidn" value={formData.nidn} onChange={handleChange} placeholder='NIDN Dosen' required/>
              </Form.Group>
              <Form.Group controlId="kode_dosen">
                <Form.Label>KODE DOSEN</Form.Label>
                <Form.Control type="text" name="kode_dosen" value={formData.kode_dosen} onChange={handleChange} placeholder='KODE DOSEN' required/>
              </Form.Group>
              <Form.Group controlId="no_whatsapp">
                <Form.Label>No Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  name="no_whatsapp"
                  value={formData.no_whatsapp}
                  onChange={handleChange}
                  placeholder='Nomor Whatsapp, Contoh: +6289389982923'
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            {formData.id_dosen ? (
              <button onClick={() => handleEditSave(formData)} className="btn btn-primary">
                Edit
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-primary">
                Add
              </button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </main>
  );
};

export default Dosen;