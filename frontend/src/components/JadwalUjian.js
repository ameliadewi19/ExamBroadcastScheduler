import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';

const JadwalUjian = () => {
  const location = useLocation();
  const [ujianData, setUjianData] = useState([]); // State to store the fetched data

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
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await axios.post('http://localhost:5000/jadwal-ujian', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      fetchUjianData();
    } catch (error) {
      console.error(error);
    }
  };

  const downloadExcelTemplate = () => {
    // Define the URL to your Excel template file within the public/template directory
    const templateFileUrl = '/template/excel-template.xlsx'; // Adjust the path as needed
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = templateFileUrl;
    link.setAttribute('download', 'excel-template.xlsx'); // Specify the filename
    link.click();
  };
  
  return (
    <main className="content">
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3"><strong>Jadwal Ujian</strong></h1>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Tambah Data</h5>
                <input type="file" accept=".xlsx" onChange={handleFileUpload}/>
                  <button className="btn btn-primary mt-2" onClick={downloadExcelTemplate}>
                    <i className="align-middle" data-feather="download"></i>
                    <span className="align-middle">Download Template</span>
                  </button>
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
                            <button className="btn btn-primary mt-2" style={{ marginRight: '5px' }}>
                              <i className="align-middle" data-feather="edit"></i>
                            </button>
                            <button
                            className="btn btn-danger mt-2" onClick={() => handleDelete(item.id_ujian)} // Pass the id to the handler
                            >
                            <i className="align-middle" data-feather="trash"></i>
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
    </main>
  );
};

export default JadwalUjian;