import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';
import EditReminderModal from './EditReminderModel';

const Reminder = () => {
    const location = useLocation();
    const [remindersData, setRemindersData] = useState([]); // State to store the fetched data
    const [historyData, setHistoryData] = useState([]); // State to store the fetched data
    
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleEdit = (id) => {
      setSelectedItemId(id);
    };

    useEffect(() => {
      fetchHistoryData(); // Fetch data when the component mounts
      feather.replace(); // Replace the icons after component mounts
    }, []);

    const fetchHistoryData = () => {
        axios.get('http://localhost:5005/reminder')
          .then(response => {
            // Assuming the response data has both reminders and histories
            const { reminders, histories } = response.data;

            // Sort the data by ID in ascending order
            const sortedReminders = reminders.sort((a, b) => a.id - b.id);
            const sortedHistories = histories.sort((a, b) => b.id - a.id);

            // Set your state or perform any further processing with the data
            setRemindersData(sortedReminders);
            setHistoryData(sortedHistories);
          })
          .catch(error => {
            console.error(error);
          });
      }

    return (
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3"><strong>Template </strong>Reminder</h1>
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
                          <th>Pembuka</th>
                          <th>Isi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {remindersData.map(item => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.pembuka}</td>
                            <td>{item.message}</td>
                            <td>
                            <button type="button" className="btn btn-primary" onClick={() => handleEdit(item.id)} data-bs-toggle="modal" data-bs-target="#editReminderModal">
                              <i className="" data-feather="edit"></i>
                              Edit
                            </button>
                            <EditReminderModal
                                id={selectedItemId}
                                reloadData={fetchHistoryData}
                              />
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
