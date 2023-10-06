import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';

const Reminder = () => {
    const location = useLocation();
    const [historyData, setHistoryData] = useState([]); // State to store the fetched data
    
    useEffect(() => {
      fetchHistoryData(); // Fetch data when the component mounts
      feather.replace(); // Replace the icons after component mounts
    }, []);

    const fetchHistoryData = () => {
        axios.get('http://localhost:5000/reminder')
          .then(response => {
            // Sort the data by ID in ascending order
            const sortedData = response.data.sort((a, b) => a.id - b.id);
            setHistoryData(sortedData);
          })
          .catch(error => {
            console.error(error);
          });
      }

    return (
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3"><strong>History Reminder</strong></h1>
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
              {/* <div className="card-header">
                <h5 className="card-title">Reminder H-1</h5>
              </div> */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Nama</th>
                          <th>No. WhatsApp</th>
                          <th>Status</th>
                          <th>Jenis Reminder</th>
                          <th>Waktu Terkirim</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama}</td>
                            <td>{item.phone}</td>
                            <td>{item.status}</td> 
                            <td>{item.jenis_reminder}</td>
                            <td>
                              {new Date(item.timestamp).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
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

export default Reminder;
