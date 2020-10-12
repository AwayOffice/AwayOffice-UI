import React from 'react'
import usersData from './UsersData'



const borrowRequestData = [
    {id: 0, status: 'Rejected', quantity: 1 , assetModelName: 'MacBook Air 13"',assetModelManafacturer: 'Apple',startDate:'25/10/2020',endDate:'02/01/2021',employee:usersData[1] },
    {id: 1, status: 'Pending', quantity: 2, assetModelName: 'UltraSharp 38 Curved Monitor - U3818DW',assetModelManafacturer: 'Dell',startDate:'25/10/2020',endDate:'02/01/2021',employee:usersData[2]},
    {id: 2, status: 'Accepted', quantity: 2, assetModelName: 'WT525 Black',assetModelManafacturer: 'Asus',startDate:'25/10/2020',endDate:'02/01/2021',employee:usersData[3]},
    {id: 3, status: 'Accepted', quantity: 1, assetModelName: 'C27R50 27" FHD Curved Monitor',assetModelManafacturer: 'Samsung',startDate:'25/10/2020',endDate:'02/01/2021',employee:usersData[4]}


  ]

  console.log(borrowRequestData[3].employee.full_name)
  
  export default borrowRequestData
  