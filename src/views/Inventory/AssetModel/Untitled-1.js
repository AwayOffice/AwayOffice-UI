    
    useEffect(() => {
        var toki =  axios.post('http://localhost:8070/api/authenticate',{"username":"admin","password":"admin"});
        toki.then(response =>{
        var token = response.data.accessToken
        axios.get('http://localhost:8070/api/inventory/assetmodels',{headers:
        {'Authorization': 'Bearer ' +token,
          "Content-Type": "application/json"}})
          .then(response => {
            setAssetModelDataBackend(response.data._embedded.assetModelDTOList)
            //console.log(response.data._embedded.assetModelDTOList)
          })
            .catch(e => console.log(e.toString()));
  
            
      })
    })