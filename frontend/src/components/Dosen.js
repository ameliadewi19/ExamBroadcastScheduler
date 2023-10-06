import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './createDosen.css';

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
      const response = await axios.get('http://localhost:5000/dosen');
      setDosenData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteDosen = async (id_dosen) => {
    console.log('ID yang akan dihapus:', id_dosen);
    try {
      await axios.delete(`http://localhost:5000/dosen/${id_dosen}`);
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
    if (name === "no_whatsapp" && /[^0-9]/.test(value)) {
      alert("NO WHATSAPP hanya boleh mengandung angka.");
      return;
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  


  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/dosen', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchDosenData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving data:', error);
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
                        <th>NO WHATSAPP</th>
                        <th>Action</th>
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
                            <Link>
                              <button
                                to={`edit/${dosen.id_dosen}`}
                                className="btn btn-primary mt-2 border"
                                style={{ marginRight: '5px' }}
                              >
                                Edit
                              </button>
                            </Link>
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Dosen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nama">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="nip">
              <Form.Label>NIP</Form.Label>
              <Form.Control type="text" name="nip" value={formData.nip} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="nidn">
              <Form.Label>NIDN</Form.Label>
              <Form.Control type="text" name="nidn" value={formData.nidn} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="no_whatsapp">
              <Form.Label>NO WHATSAPP</Form.Label>
              <Form.Control
                type="text"
                name="no_whatsapp"
                value={formData.no_whatsapp}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Dosen;
