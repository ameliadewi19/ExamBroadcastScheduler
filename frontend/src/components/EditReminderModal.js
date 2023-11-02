import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import feather from 'feather-icons';

const EditReminderModal = ({ reloadData, id }) => {
  console.log(id);
  const [formData, setFormData] = useState({ message: '', pembuka: '' });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  
  useEffect(() => {
    // Fetch data based on the provided id
    if (id) {
      axios.get(`http://localhost:5005/reminder/${id}`)
        .then(response => {
          const { pembuka, message } = response.data; // Assuming response is in JSON format
          setFormData({ pembuka, message });
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

  const handleEditReminder = (e) => {
    axios.patch(`http://localhost:5005/reminder/${e}`, formData) // Use PATCH instead of PUT
      .then(response => {
        console.log('Reminder updated successfully');
        setShowModal(false);
        modalRef.current.click(); // Close modal
        reloadData();
        modalRef.current.click();
      })
      .catch(error => {
        console.error(error);
      });
  };  

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="editReminderModal" tabIndex="-1" aria-labelledby="editConfirmationModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editReminderModalLabel">Edit Template Reminder</h5>
            <button type="button" className="d-none" ref={modalRef} data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
          <p>Harap "&#123;...&#125;" tidak diubah</p>
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
            <button type="button" className="btn btn-primary" onClick={() => handleEditReminder(id)}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReminderModal;
