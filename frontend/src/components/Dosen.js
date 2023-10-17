import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/createDosen.css';
import Swal from 'sweetalert2';

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
      const response = await axios.get(`http://194.233.93.124:5005/dosen`);
      setDosenData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteDosen = async (id_dosen) => {
    console.log('ID yang akan dihapus:', id_dosen);
    try {
      await axios.delete(`http://194.233.93.124:5005/dosen/${id_dosen}`);
      fetchDosenData();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id_dosen) => {
    Swal.fire({
      title: 'Are you sure you want to delete this data?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      deleteDosen(id_dosen);
    }
    );
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
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
      no_whatsapp: dosen.no_whatsapp,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (formData.id_dosen) {
      try {
        await axios.put(`http://194.233.93.124:5005/dosen/${formData.id_dosen}`, formData, {
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
        await axios.post(`http://194.233.93.124:5005/dosen`, formData, {
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
      await axios.patch(`http://194.233.93.124:5005/dosen/${id_dosen}`, formDataWithoutId, {
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

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">
          <strong>Analytics</strong> Dashboard
        </h1>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Tambah Data</h5>
                <button className="btn btn-primary mt-2" onClick={handleShowModal}>
                  Tambah Dosen
                </button>
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
                <Form.Control type="text" name="id_dosen" value={formData.id_dosen} onChange={handleChange} placeholder='ID Dosen' />
              </Form.Group>
              <Form.Group controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder='Nama Dosen'/>
              </Form.Group>
              <Form.Group controlId="nip">
                <Form.Label>NIP</Form.Label>
                <Form.Control type="text" name="nip" value={formData.nip} onChange={handleChange} placeholder='NIP Dosen' />
              </Form.Group>
              <Form.Group controlId="nidn">
                <Form.Label>NIDN</Form.Label>
                <Form.Control type="text" name="nidn" value={formData.nidn} onChange={handleChange} placeholder='NIDN Dosen'/>
              </Form.Group>
              <Form.Group controlId="no_whatsapp">
                <Form.Label>No Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  name="no_whatsapp"
                  value={formData.no_whatsapp}
                  onChange={handleChange}
                  placeholder='Nomor Whatsapp, Contoh: +6289389982923'
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
