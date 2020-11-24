import axios from 'axios';



class HelloWorldService {
    executeHelloWorldService() {

        console.log((axios.get('http://localhost:8070/hello')))
        return axios.get('http://localhost:8070/pv/zubair')
    }


}

export default new HelloWorldService();