import axios from 'axios';
import { API_URL_INVENTORY } from '../Constants';

class VendorService {

    getAssetModelList = (headers) => {
        console.log('executed service: get all assetModels');
        return axios.get(`${API_URL_INVENTORY}/assetmodels`, headers);
    }

    getAssetModelById = (id, headers) => {
        console.log('executed service: get AssetModel By Id');
        return axios.get(`${API_URL_INVENTORY}/assetmodel/${id}`, headers);
    }

    updateAssetModelInfoHandler = (updatedAssetModel, headers) => {
        console.log('executed service: update AssetModel');
        return axios.put(`${API_URL_INVENTORY}/assetmodel/`, updatedAssetModel, headers);
    }

    deleteAssetModelByID = (id, headers) => {
        console.log('executed service: delete AssetModel by id');
        return axios.delete(`${API_URL_INVENTORY}/assetmodel/${id}`, headers);
    }

    createAssetModelHandler = (assetModel, headers) => {
        console.log('executed service: create AssetModel');
        return axios.post(`${API_URL_INVENTORY}/assetmodel/`, assetModel, headers);
    }

}

export default new VendorService()
