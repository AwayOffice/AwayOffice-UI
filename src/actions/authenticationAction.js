import axios from 'axios';

export function getToken (username, password) {
	//dispatch({type: 'LOADING' })
    
   return( dispatch ) => {
        dispatch({type: 'LOADING' });

        axios.post('http://localhost:8070/api/authenticate',
        {
            "username": username,
            "password": password,
            "role": "role_admin",
        })
        .then(response => {            
            dispatch({type: 'LOADED', payload: response.data.accessToken});  
            console.log(response.data.accessToken);
        }).catch(err => {
            dispatch({type: 'ERROR', payload: err});
        })        
   }                
}

//store.dispatch(getToken);	
