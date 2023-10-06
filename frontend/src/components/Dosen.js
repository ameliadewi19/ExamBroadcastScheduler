import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './createDosen.css'

const Dosen = () => {
  const [dosenData, setDosenData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false); // Tambahkan state untuk modal edit
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    nidn: '',
    no_whatsapp: '',
  });

  const [editFormData, setEditFormData] = useState({ // Tambahkan state untuk data yang akan diedit
    id: null,
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


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowEditModal = (dosen) => { // Menampilkan modal edit dengan data dosen yang akan diedit
    setEditModal(true);
    setEditFormData({
      id: dosen.id_dosen,
      nama: dosen.nama,
      nip: dosen.nip,
      nidn: dosen.nidn,
      no_whatsapp: dosen.no_whatsapp,
    });
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setEditFormData({
      id: null,
      nama: '',
      nip: '',
      nidn: '',
      no_whatsapp: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditChange = (e) => { // Handle perubahan data pada form edit
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // const handleSubmit = async () => {
  //   try {
  //     await axios.post('http://localhost:5000/dosen', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     fetchDosenData();
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };

  const handleEditSubmit = async () => { // Handle penyimpanan perubahan data
    try {
      await axios.patch(`http://localhost:5000/dosen/${editFormData.id}`, editFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchDosenData();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const [isEditing, setIsEditing] = useState(false); // State untuk menentukan apakah dalam mode edit atau tambah

  const handleShowModal = (editMode = false, dosenData = null) => {
    setIsEditing(editMode); // Set isEditing sesuai dengan editMode yang diterima
    setShowModal(true);

    // Jika dalam mode edit, isi form dengan data dosen yang akan diedit
    if (editMode && dosenData) {
      setEditFormData({
        id: dosenData.id_dosen,
        nama: dosenData.nama,
        nip: dosenData.nip,
        nidn: dosenData.nidn,
        no_whatsapp: dosenData.no_whatsapp,
      });
    } else {
      // Jika dalam mode tambah, reset form
      setEditFormData({
        id: null,
        nama: '',
        nip: '',
        nidn: '',
        no_whatsapp: '',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Jika dalam mode edit, kirim permintaan PATCH untuk mengubah data
        await axios.patch(`http://localhost:5000/dosen/${editFormData.id}`, editFormData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Jika dalam mode tambah, kirim permintaan POST untuk menambahkan data
        await axios.post('http://localhost:5000/dosen', editFormData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
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
                <button className="btn btn-primary mt-2" onClick={() => handleShowModal(false)}>
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
                            <button onClick={() => handleShowEditModal(dosen)} className="btn btn-primary mt-2 border">
                              Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => confirmDelete(dosen.id_dosen)}
                              className="btn btn-danger mt-2 border"
                            >
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

      {/* Modal di sini di luar div dengan class container-fluid */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Dosen' : 'Tambah Dosen'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="edit_nama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={editFormData.nama}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="edit_nip">
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                name="nip"
                value={editFormData.nip}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="edit_nidn">
              <Form.Label>NIDN</Form.Label>
              <Form.Control
                type="text"
                name="nidn"
                value={editFormData.nidn}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="edit_no_whatsapp">
              <Form.Label>NO WHATSAPP</Form.Label>
              <Form.Control
                type="text"
                name="no_whatsapp"
                value={editFormData.no_whatsapp}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Simpan Perubahan' : 'Simpan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Dosen;