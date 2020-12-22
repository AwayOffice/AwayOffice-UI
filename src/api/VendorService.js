import axios from 'axios';
import {API_URL_VENDOR} from '../Constants';

class VendorService {

    getVendorList = (headers) => {
        console.log('executed service: get all vendors');
        return axios.get(`${API_URL_VENDOR}/vendors`, headers);
    }

    getVendorById = (id, headers) => {
        console.log('executed service: get vendor by id');
        return axios.get(`${API_URL_VENDOR}/vendors/${id}`, headers);
    }

    updateVendorInfoHandler = (updatedVendor, headers) => {
        console.log('executed service: update vendor');
        return axios.put(`${API_URL_VENDOR}/vendors/`, updatedVendor, headers);
    } 
    
    deleteVendorByID = (id, headers) => {
        console.log('executed service: delete vendor by id');
        return axios.delete(`${API_URL_VENDOR}/vendors/${id}`, headers);
    }

    createVendorHandler = (vendor, headers) => {
        console.log('executed service: create vendor');
        return axios.post(`${API_URL_VENDOR}/vendors/`, vendor, headers);
    }

}

export default new VendorService()
