import React from 'react'

import HelloWorldService from '../../api/HelloWorldService/HelloWorldService'

const Dashboard = () => {
  HelloWorldService.executeHelloWorldService().then(() => console.log("promise completed"))
  HelloWorldService.executeHelloWorldService().then((response) => console.log(response))


  return (
    <div>
    <h1>Welcome to Away Office App <b>(Under Development ReactJS)</b>. Enjoy using our app.</h1>
    <br></br>
    <h2>Repository: </h2>
    <h2><a href={"https://github.com/awayoffice/AwayOffice-UI"}
    >https://github.com/ awayoffice/AwayOffice-UI</a></h2>
    <br></br>
    <br></br>
    <ul>
    <li> Company equipment are available for employees to borrow.</li> 
    <br></br>
    <li> Employee can borrow IT equipment (Displays, keyboards,..)</li> 
    <br></br>
    <li>Reservation of equipment and return have to be managed by the this Web-App.</li>
    </ul>

    </div>
    )
  }
  
  export default Dashboard
  