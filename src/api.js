import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles';

// Fetch all vehicles
export const fetchVehicles = async () => {
    return await axios.get(API_URL);
};

// Create a new vehicle
export const createVehicle = async (vehicleData) => {
    return await axios.post(API_URL, vehicleData);
};

// Update a vehicle by ID
export const updateVehicle = async (id, vehicleData) => {
    return await axios.put(`${API_URL}/${id}`, vehicleData);
};

// Delete a vehicle by ID
export const deleteVehicle = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
