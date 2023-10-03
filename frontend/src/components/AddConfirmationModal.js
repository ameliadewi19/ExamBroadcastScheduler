import React, { useState } from 'react';
import axios from 'axios';

const AddConfirmationModal = () => {
  const [formData, setFormData] = useState({ message: '', status: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddConfirmation = () => {
    // Pastikan untuk menyesuaikan dengan endpoint Anda
    axios.post('http://localhost:5000/confirmations', formData)
      .then(response => {
        console.log('Confirmation added successfully');
        // Reset form data after successful addition
        setFormData({ message: '', status: '' });
        // Close the modal
        document.getElementById('addConfirmationModal').classList.remove('show');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="modal fade" id="addConfirmationModal" tabIndex="-1" aria-labelledby="addConfirmationModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addConfirmationModalLabel">Tambah Data Konfirmasi</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="button" className="btn btn-primary" onClick={handleAddConfirmation}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConfirmationModal;
