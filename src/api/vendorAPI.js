

getVendorList = () => {
    axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response => {
            this.setState({token: response.data.accessToken});
            console.log(this.state.token)                   
            axios.get('http://localhost:8070/api/hr/vendors',
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",                        
                    }}).then(response => {
                        console.log(Object.keys(response.data._embedded.vendorDTOList[0]))
                        this.setState({
                            vendors: response.data._embedded.vendorDTOList,
                            vendorKeys: Object.keys(response.data._embedded.vendorDTOList[0]).filter(item => item !== '_links')
                        })   
                    
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
}