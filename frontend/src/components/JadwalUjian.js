import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    axios.get('http://localhost:5000/jadwal-ujian')
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
    axios.patch(`http://localhost:5000/jadwal-ujian/${updatedItem.id_ujian}`, updatedData)
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
    const confirmDelete = window.confirm(`Are you sure you want to delete data Jadwal with ID ${id}?`);
    
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/jadwal-ujian/${id}`)
        .then(response => {
          console.log('Delete successful');
          fetchUjianData();
        })
        .catch(error => {
          console.error(error);
        });
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
        const response = await axios.post('http://localhost:5000/jadwal-ujian', formData, {
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
                    <input type="file" accept=".xlsx" onChange={handleFileUpload}/>
                  </div>
                  <div className="col text-end">
                    <a className='btn btn-primary' href="/template/excel-template.xlsx" download>
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
            {/* Create form fields for editing */}
            <form>
              <div className="form-group">
                <label htmlFor="id_ujian">Id Ujian</label>
                <input
                  type="text"
                  name="id_ujian"
                  value={editingItem.id_ujian}
                  onChange={handleInputChange}
                disabled/>
              </div>
              <div className="form-group">
                <label htmlFor="id_dosen_ujian">Id Dosen Ujian</label>
                <input
                  type="text"
                  name="id_dosen_ujian"
                  value={editingItem.id_dosen_ujian}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tanggal_ujian">Tanggal Mengawas</label>
                <input
                  type="text"
                  name="tanggal_ujian"
                  value={editingItem.tanggal_ujian}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="waktu_mulai">Waktu Mulai</label>
                <input
                  type="text"
                  name="waktu_mulai"
                  value={editingItem.waktu_mulai}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="waktu_selesai">Waktu Selesai</label>
                <input
                  type="text"
                  name="waktu_selesai"
                  value={editingItem.waktu_selesai}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nama_matakuliah">Nama Matakuliah</label>
                <input
                  type="text"
                  name="nama_matakuliah"
                  value={editingItem.nama_matakuliah}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jenis_matakuliah">Jenis Matakuliah (PR/TE)</label>
                <input
                  type="text"
                  name="jenis_matakuliah"
                  value={editingItem.jenis_matakuliah}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="kelas">Kelas</label>
                <input
                  type="text"
                  name="kelas"
                  value={editingItem.kelas}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ruangan">Ruangan</label>
                <input
                  type="text"
                  name="ruangan"
                  value={editingItem.ruangan}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_dosen_pengawas">Id Dosen Pengawas</label>
                <input
                  type="text"
                  name="id_dosen_pengawas"
                  value={editingItem.id_dosen_pengawas}
                  onChange={handleInputChange}
                />
              </div>
              {/* Add more input fields for other fields you want to edit */}
            </form>
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