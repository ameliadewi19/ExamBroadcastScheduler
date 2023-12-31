import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';

const EditConfirmationModal = ({ reloadData, id }) => {
  console.log(id);
  const [formData, setFormData] = useState({ message: '', pembuka: '' });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  
  useEffect(() => {
    // Fetch data based on the provided id
    if (id) {
      axios.get(`http://localhost:5005/confirmations/${id}`)
        .then(response => {
          const { message, pembuka } = response.data; // Assuming response is in JSON format
          setFormData({ message, pembuka });
          feather.replace(); // Replace the icons after data is loaded
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditConfirmation = (e) => {
    console.log("idnya", e);
    axios.put(`http://localhost:5005/confirmations/${e}`, formData)
      .then(response => {
        console.log('Confirmation updated successfully');
        // Optimistically update UI
        // setFormData({ message: '', pembuka: '' });
        setShowModal(false);
        modalRef.current.click(); // Close modal
        reloadData(); // Reload data from prop
        modalRef.current.click();
      })
      .catch(error => {
        console.error(error);
        // Provide user feedback in case of an error
      });
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="editConfirmationModal" tabIndex="-1" aria-labelledby="editConfirmationModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editConfirmationModalLabel">Edit Data Konfirmasi</h5>
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
                    value={formData.pembuka} // Gunakan formData untuk nilai awal
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Jadwal</label>
                    <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message} // Gunakan formData untuk nilai awal
                    onChange={handleInputChange}
                    required
                    />
                </div>
                </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Tutup</button>
            <button type="button" className="btn btn-primary" onClick={() => handleEditConfirmation(id)}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditConfirmationModal;
