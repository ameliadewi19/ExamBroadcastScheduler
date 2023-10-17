import React, { useState, useRef, useEffect } from 'react';

const QRModal = ({ qrPath }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
    // Pastikan bahwa state confirmations dan setConfirmations didefinisikan dengan benar
    
  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="qrModalLabel">Tambah Data Konfirmasi</h5>
            <button type="button" className="d-none" ref={modalRef} data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <img src={qrPath} alt="QR Code" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Tutup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
