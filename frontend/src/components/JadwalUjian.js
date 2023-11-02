import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import '../css/createDosen.css';

const JadwalUjian = () => {
  const location = useLocation();
  const [ujianData, setUjianData] = useState([]); // State to store the fetched data
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    feather.replace(); // Replace the icons after component mounts
    fetchUjianData(); // Fetch data when the component mounts
  }, []);

  const fetchUjianData = () => {
    axios.get('http://localhost:5005/jadwal-ujian')
      .then(response => {
        setUjianData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (item) => {
    const editableFields = {
      id_ujian: item.id_ujian,
      id_dosen_ujian: item.id_dosen_ujian,
      tanggal_ujian: item.tanggal_ujian,
      waktu_mulai: item.waktu_mulai,
      waktu_selesai: item.waktu_selesai,
      nama_matakuliah: item.nama_matakuliah,
      jenis_matakuliah: item.jenis_matakuliah,
      kelas: item.kelas,
      ruangan: item.ruangan,
      id_dosen_pengawas: item.id_dosen_pengawas,
      // Add more editable fields as needed
    };
    setEditingItem(editableFields);
    setShowModal(true);
  };

  const handleSave = (updatedItem) => {
    setShowModal(false);
    const updatedData = {
      id_dosen: updatedItem.id_dosen_ujian,
      tanggal_ujian: updatedItem.tanggal_ujian,
      waktu_mulai: updatedItem.waktu_mulai,
      waktu_selesai: updatedItem.waktu_selesai,
      nama_matakuliah: updatedItem.nama_matakuliah,
      jenis_matakuliah: updatedItem.jenis_matakuliah,
      kelas: updatedItem.kelas,
      ruangan: updatedItem.ruangan,
      id_pengawas: updatedItem.id_dosen_pengawas,
    };
    axios.patch(`http://localhost:5005/jadwal-ujian/${updatedItem.id_ujian}`, updatedData)
      .then(response => {
        console.log('Update successful');
        fetchUjianData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ 
      ...editingItem,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete Jadwal with ID ${id}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      axios.delete(`http://localhost:5005/jadwal-ujian/${id}`)
        .then(response => {
          console.log('Delete successful');
          fetchUjianData();
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
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
        const response = await axios.post('http://localhost:5005/jadwal-ujian', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        fetchUjianData();
  
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
        <h1 className="h3 mb-3"><strong>Jadwal </strong>Ujian</h1>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
              <h5 className="card-title mb-3">Tambah Data</h5>
                <div className="row">
                  <div className="col">
                    <div className="upload-section">
                      <label htmlFor="fileInput" className="btn btn-secondary upload-button">
                        Unggah Excel
                      </label>
                      <input type="file" id="fileInput" accept=".xlsx" onChange={handleFileUpload} />
                    </div>
                  </div>
                  <div className="col text-end">
                    <a className='btn btn-primary mt-2' href="/template/template-jadwal.xlsx" download>
                      <i className="" data-feather="download"></i>
                      <span className=""> Download Template</span>
                    </a>
                  </div>
                </div>
            </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Id Jadwal Ujian</th>
                        <th>Nama Dosen Pengampu</th>
                        <th>Tanggal Mengawas</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Nama Mata Kuliah</th>
                        <th>Jenis Mata Kuliah(PR/TE)</th>
                        <th>Kelas</th>
                        <th>Ruangan</th>
                        <th>Nama Pengawas</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ujianData.map(item => (
                        <tr key={item.id_ujian}>
                          <td>{item.id_ujian}</td>
                          <td>{item.nama_dosen_ujian}</td>
                          <td>{item.tanggal_ujian}</td>
                          <td>{item.waktu_mulai}</td>
                          <td>{item.waktu_selesai}</td>
                          <td>{item.nama_matakuliah}</td>
                          <td>{item.jenis_matakuliah}</td>
                          <td>{item.kelas}</td>
                          <td>{item.ruangan}</td>
                          <td>{item.nama_dosen_pengawas}</td>
                          <td>
                            <button className="btn btn-primary mt-2" style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>
                              <i className="align-middle" data-feather="edit"></i>Edit
                            </button>
                            <button className="btn btn-danger mt-2" onClick={() => handleDelete(item.id_ujian)}>
                              <i className="align-middle" data-feather="trash"></i>Hapus
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
        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="id_ujian">
              <Form.Label>Id Ujian</Form.Label>
              <Form.Control
                type="text"
                name="id_ujian"
                value={editingItem.id_ujian}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="id_dosen_ujian">
              <Form.Label>Id Dosen Ujian</Form.Label>
              <Form.Control
                type="text"
                name="id_dosen_ujian"
                value={editingItem.id_dosen_ujian}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="tanggal_ujian">
              <Form.Label>Tanggal Mengawas</Form.Label>
              <Form.Control
                type="text"
                name="tanggal_ujian"
                value={editingItem.tanggal_ujian}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="waktu_mulai">
              <Form.Label>Waktu Mulai</Form.Label>
              <Form.Control
                type="text"
                name="waktu_mulai"
                value={editingItem.waktu_mulai}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="waktu_selesai">
              <Form.Label>Waktu Selesai</Form.Label>
              <Form.Control
                type="text"
                name="waktu_selesai"
                value={editingItem.waktu_selesai}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="nama_matakuliah">
              <Form.Label>Nama Matakuliah</Form.Label>
              <Form.Control
                type="text"
                name="nama_matakuliah"
                value={editingItem.nama_matakuliah}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="jenis_matakuliah">
              <Form.Label>Jenis Matakuliah (PR/TE)</Form.Label>
              <Form.Control
                type="text"
                name="jenis_matakuliah"
                value={editingItem.jenis_matakuliah}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="kelas">
              <Form.Label>Kelas</Form.Label>
              <Form.Control
                type="text"
                name="kelas"
                value={editingItem.kelas}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="ruangan">
              <Form.Label>Ruangan</Form.Label>
              <Form.Control
                type="text"
                name="ruangan"
                value={editingItem.ruangan}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="id_dosen_pengawas">
              <Form.Label>Id Dosen Pengawas</Form.Label>
              <Form.Control
                type="text"
                name="id_dosen_pengawas"
                value={editingItem.id_dosen_pengawas}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleSave(editingItem)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </main>
  );
};

export default JadwalUjian;