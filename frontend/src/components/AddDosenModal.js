import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';

const AddDosenModal = ({ reloadData }) => { // Mengubah nama kelas menjadi AddDosenModal
  const [formData, setFormData] = useState({ nama: '', nip: '', nidn: '', no_whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDosen = () => { // Mengubah nama fungsi menjadi handleAddDosen
    axios.post('http://localhost:5000/dosen', formData) // Mengubah URL menjadi 'http://localhost:5000/dosens'
      .then(response => {
        console.log('Dosen added successfully');
        setFormData({ nama: '', nip: '', nidn: '', no_whatsapp: '' });
        setShowModal(false);
        modalRef.current.click();
        reloadData();
        modalRef.current.click();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="addDosenModal" tabIndex="-1" aria-labelledby="addDosenModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addDosenModalLabel">Tambah Data Dosen</h5>
            <button type="button" className="d-none" ref={modalRef} data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nip" className="form-label">NIP</label>
                <input
                  type="text"
                  className="form-control"
                  id="nip"
                  name="nip"
                  value={formData.nip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nidn" className="form-label">NIDN</label>
                <input
                  type="text"
                  className="form-control"
                  id="nidn"
                  name="nidn"
                  value={formData.nidn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="no_whatsapp" className="form-label">Nomor WhatsApp</label>
                <input
                  type="text"
                  className="form-control"
                  id="no_whatsapp"
                  name="no_whatsapp"
                  value={formData.no_whatsapp}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Tutup</button>
            <button type="button" className="btn btn-primary" onClick={handleAddDosen}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDosenModal; // Mengubah ekspor default sesuai dengan nama kelas yang baru
