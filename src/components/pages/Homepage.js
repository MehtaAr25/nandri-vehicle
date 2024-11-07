import React, { useState, useEffect } from 'react';
import image from '../images/image.webp'
import navbar from '../inc/HeaderFile'
import HeaderFile from '../inc/HeaderFile';


function Homepage() {
    const [entryModalVisible, setEntryModalVisible] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entryForm, setEntryForm] = useState({
        date: '',
        vehicleNo: '',
        vehicleWeight: '',
        entryTime: '',
        driverName: '',
        driverContact: '',
    });
    const [exitForm, setExitForm] = useState({
        exitDate: '',
        exitVehicleNo: '',
        exitTime: '',
        exitVehicleWeight: '',
        weightSlip: null,
    });

    // Function to get current date and time in the correct format
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    };

    const getCurrentTime = () => {
        const date = new Date();
        return date.toTimeString().split(' ')[0]; // Format: HH:MM:SS
    };

    // Automatically set date and time when the entry modal is shown
    useEffect(() => {
        if (entryModalVisible) {
            setEntryForm((prevState) => ({
                ...prevState,
                date: getCurrentDate(),
                entryTime: getCurrentTime(),
            }));
        }
    }, [entryModalVisible]);

    useEffect(() => {
        if (exitModalVisible) {
            setExitForm((prevState) => ({
                ...prevState,
                exitDate: getCurrentDate(),
                exitTime: getCurrentTime(),
            }));
        }
    }, [exitModalVisible]);

    const handleEntryChange = (e) => {
        const { id, value } = e.target;
        setEntryForm(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleExitChange = (e) => {
        const { id, value } = e.target;
        setExitForm(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleAddVehicle = () => {
        setEntryModalVisible(true);
    };

    const handleEntrySubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            ...entryForm,
            exitVehicleWeight: 'N/A',
            weightSlip: 'N/A',
            actions: (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => showExitModal(entryForm.vehicleNo)}
                >
                    Exit
                </button>
            ),
        };
        setEntries([...entries, newEntry]);
        setEntryModalVisible(false);
        setEntryForm({
            date: '',
            vehicleNo: '',
            vehicleWeight: '',
            entryTime: '',
            driverName: '',
            driverContact: '',
        });
    };

      

    const handleExitSubmit = (e) => {
        e.preventDefault(); 
        const updatedEntries = entries.map(entry =>
            entry.vehicleNo === exitForm.exitVehicleNo
                ? {
                    ...entry,
                    exitVehicleWeight: exitForm.exitVehicleWeight + ' kg',
                    weightSlip: 'Uploaded',
                    actions: ''
                }
                : entry
        );
        setEntries(updatedEntries);
        setExitModalVisible(false);
        setExitForm({
            exitDate: '',
            exitVehicleNo: '',
            exitTime: '',
            exitVehicleWeight: '',
            weightSlip: null,
        });
    };

    const showExitModal = (vehicleNo) => {
        setExitForm(prevState => ({
            ...prevState,
            exitVehicleNo: vehicleNo
        }));
        setExitModalVisible(true);
    };

    return (
        <>
        <HeaderFile />
            <div className="header-image">
                <h1 className="ms-3">Vehicle Entry Dashboard</h1>
                <img src={image} alt="Image Description" />
            </div>

            <div className="container-fluid content-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Vehicle Entries</h2>
                    <button className="btn btn-primary" onClick={handleAddVehicle}>Add Vehicle Entry</button>
                </div>

                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <select className="form-select" aria-label="Show entries">
                            <option value="10">Show 10 entries</option>
                            <option value="20">Show 20 entries</option>
                            <option value="50">Show 50 entries</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                </div>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vehicle NO.</th>
                            <th>Entry Vehicle Weight (kg)</th>
                            <th>Entry Time</th>
                            <th>Driver Name</th>
                            <th>Driver Contact</th>
                            <th>Exit Vehicle Weight (kg)</th>
                            <th>Weight Slip</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry, index) => (
    <tr key={index}>
        <td>{entry.date}</td>
        <td>{entry.vehicleNo}</td>
        <td>{entry.vehicleWeight}</td>
        <td>{entry.entryTime}</td>
        <td>{entry.driverName}</td>
        <td>{entry.driverContact}</td>
        <td>{entry.exitVehicleWeight}</td>
        <td>{entry.weightSlip}</td>
        <td>{entry.actions}</td> {/* This will render the Exit button */}
    </tr>
))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center">
                    <div>Showing 1 to 10 of 100 entries</div>
                    <div className="pagination d-flex justify-content-between align-items-center gap-4">
                        <button className="btn btn-light">Previous</button>
                        <button className="btn btn-light">Next</button>
                    </div>
                </div>
            </div>

            {/* Add Entry Modal */}
            <div className={`modal fade ${entryModalVisible ? 'show' : ''}`} tabIndex="-1" aria-labelledby="entryModalLabel" aria-hidden="true" style={{ display: entryModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="entryModalLabel">Add Vehicle Entry</h5>
                            <button type="button" className="btn-close" onClick={() => setEntryModalVisible(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEntrySubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input type="date" className="form-control" id="date" value={entryForm.date} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="vehicleNo" className="form-label">Vehicle NO.</label>
                                        <input type="text" className="form-control" id="vehicleNo" value={entryForm.vehicleNo} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="vehicleWeight" className="form-label">Entry Vehicle Weight (kg)</label>
                                        <input type="number" step="0.01" className="form-control" id="vehicleWeight" value={entryForm.vehicleWeight} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="entryTime" className="form-label">Entry Time</label>
                                        <input type="time" className="form-control" id="entryTime" value={entryForm.entryTime} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="driverName" className="form-label">Driver Name</label>
                                        <input type="text" className="form-control" id="driverName" value={entryForm.driverName} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="driverContact" className="form-label">Driver Contact</label>
                                        <input type="text" className="form-control" id="driverContact" value={entryForm.driverContact} onChange={handleEntryChange} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="weightSlip" className="form-label">Entry Weight Slip</label>
                                        <input type="file" className="form-control" id="weightSlip" onChange={(e) => setExitForm(prevState => ({ ...prevState, weightSlip: e.target.files[0] }))} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Entry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exit Entry Modal */}
            <div className={`modal fade ${exitModalVisible ? 'show' : ''}`} tabIndex="-1" aria-labelledby="exitModalLabel" aria-hidden="true" style={{ display: exitModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exitModalLabel">Vehicle Exit</h5>
                            <button type="button" className="btn-close" onClick={() => setExitModalVisible(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleExitSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="exitDate" className="form-label">Date</label>
                                        <input type="date" className="form-control" id="exitDate" value={exitForm.exitDate} onChange={handleExitChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="exitVehicleNo" className="form-label">Vehicle NO.</label>
                                        <input type="text" className="form-control" id="exitVehicleNo" value={exitForm.exitVehicleNo} readOnly />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="exitTime" className="form-label">Exit Time</label>
                                        <input type="time" className="form-control" id="exitTime" value={exitForm.exitTime} onChange={handleExitChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="exitVehicleWeight" className="form-label">Exit Vehicle Weight (kg)</label>
                                        <input type="number" step="0.01" className="form-control" id="exitVehicleWeight" value={exitForm.exitVehicleWeight} onChange={handleExitChange} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="weightSlip" className="form-label">Exit Weight Slip</label>
                                        <input type="file" className="form-control" id="weightSlip" onChange={(e) => setExitForm(prevState => ({ ...prevState, weightSlip: e.target.files[0] }))} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Exit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Homepage;
