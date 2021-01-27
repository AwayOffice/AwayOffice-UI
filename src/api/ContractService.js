import axios from 'axios';
import {API_URL_VENDOR} from '../Constants';

class ContractService {

    getContractList = (headers) => {
        console.log('executed service: get all contracts');
        return axios.get(`${API_URL_VENDOR}/contracts`, headers);
    }

    getContractById = (id, headers) => {
        console.log('executed service: get contract by id');
        return axios.get(`${API_URL_VENDOR}/contracts/${id}`, headers);
    }

    updateContractInfoHandler = (updatedContract, headers) => {
        console.log('executed service: update contract');
        return axios.put(`${API_URL_VENDOR}/contracts/`, updatedContract, headers);
    } 
    
    deleteContractByID = (id, headers) => {
        console.log('executed service: delete contract by id');
        return axios.delete(`${API_URL_VENDOR}/contracts/${id}`, headers);
    }

    createContractHandler = (contract, headers) => {
        console.log('executed service: create contract');
        return axios.post(`${API_URL_VENDOR}/contracts/`, contract, headers);
    }

}

export default new ContractService()
