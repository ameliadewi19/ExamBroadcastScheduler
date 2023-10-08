import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';
const backendUrl = process.env.BACKEND_URL;
const AddConfirmationModal = ({ reloadData }) => {
  const [formData, setFormData] = useState({ message: '', pembuka: '' });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  // Pastikan bahwa state confirmations dan setConfirmations didefinisikan dengan benar

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddConfirmation = () => {
    axios.post(`${backendUrl}/confirmations`, formData)
      .then(response => {
        console.log('Confirmation added successfully');
        setFormData({ message: '', pembuka: '' });
        setShowModal(false);
        modalRef.current.click(); // Menutup modal
        reloadData(); // Memuat ulang data dari prop
        modalRef.current.click();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="addConfirmationModal" tabIndex="-1" aria-labelledby="addConfirmationModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addConfirmationModalLabel">Tambah Data Konfirmasi</h5>
            <button type="button" className="d-none" ref={modalRef} data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="pembuka" className="form-label">Kalimat Pembuka</label>
                    <textarea
                    className="form-control"
                    id="pembuka"
                    name="pembuka"
                    value={formData.pembuka}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Jadwal</label>
                    <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    />
                </div>
                </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Tutup</button>
            <button type="button" className="btn btn-primary" onClick={handleAddConfirmation}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConfirmationModal;
