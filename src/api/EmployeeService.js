import axios from 'axios';
import {API_URL_EMPLOYEE} from '../Constants';

class EmployeeService {

    getEmployeeList = (headers) => {
        console.log('executed service: get all employees');
        return axios.get(`${API_URL_EMPLOYEE}/employee`, headers);
    }

    getEmployeeById = (id, headers) => {
        console.log('executed service: get employee by id');
        return axios.get(`${API_URL_EMPLOYEE}/employee/${id}`, headers);
    }

    updateEmployee = (updatedEmployee, headers) => {
        console.log('executed service: update employee');
        return axios.put(`${API_URL_EMPLOYEE}/employee/`, updatedEmployee, headers);
    } 
    
    deleteEmployeeByID = (id, headers) => {
        console.log('executed service: delete employee by id');
        return axios.delete(`${API_URL_EMPLOYEE}/employee/${id}`, headers);
    }

    createEmployee = (employee, headers) => {
        console.log('executed service: create employee');
        return axios.post(`${API_URL_EMPLOYEE}/employee/`, employee, headers);
    }
}

export default new EmployeeService()
