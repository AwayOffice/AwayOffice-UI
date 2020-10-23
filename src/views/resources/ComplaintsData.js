<<<<<<< HEAD:src/views/complaints/ComplaintsData.js
import employeeData from '../employee/EmployeesData'
import assetModelData from '../asset/AssetModelData'
=======
import usersData from './UsersData'
import assetModelData from './AssetModelData'
>>>>>>> main:src/views/resources/ComplaintsData.js



const borrowRequestData = [
    {id: 0, title: 'Problematic Monitor', description: "Unknown" , asset:assetModelData[1]  ,employee:employeeData[1] },
    {id: 1, title: 'Keys Faulty', description: "Keyboard Damaged" , asset:assetModelData[0]  ,employee:employeeData[2] },
    {id: 2, title: 'Fault Bilmiyoruz', description: "Unknown" , asset:assetModelData[2]  ,employee:employeeData[3] },
    {id: 3, title: 'Keine Ahnung', description: "Unknown" , asset:assetModelData[3]  ,employee:employeeData[0] },


  ]

  
  export default borrowRequestData
  