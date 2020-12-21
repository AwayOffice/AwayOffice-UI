import axios from 'axios';

const getToken = (dispatch) => {
	dispatch({type: 'LOADING' })
    
    axios.post('http://localhost:8070/api/authenticate',
    {
        "username":"admin",
        "password":"admin",
    })
    .then(response => {
        dispatch({type: 'LOADED', payload: response.data.accessToken});  
    }).catch(err => {
        dispatch({type: 'ERROR', payload: err});
    })
                    
}

//store.dispatch(getToken);	

export default getToken;