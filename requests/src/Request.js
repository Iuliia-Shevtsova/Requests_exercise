import React from 'react'
import axios from 'axios';

const Request = ({index, request, handleEditForm, filterRequests}) => {

  const deleteRequest = (e, id) =>{
    e.preventDefault();
    axios.delete(`https://603804c74e3a9b0017e92b01.mockapi.io/api/requests/${id}`)
    .then( (data) => {
      filterRequests(id);
      console.log(data)
    })
    .catch(error => console.log('api errors:', error))
  }

  return (
    <tr>
      <th scope="row">{request.id}</th>
      <td>{request.request_text}</td>
      <td>{request.request_due_date}</td>
      <td>{request.expiration_date}</td>
      <td>{request.department_names}</td>
      <td>{request.requester}</td>
      <td><i className="fa fa-2x fa-times text-danger" data-toggle="tooltip" data-placement="top" title="Delete request" onClick={(e) => deleteRequest(e, request.id)}></i></td>
      <td><i className="fa fa-2x fa-edit text-info" data-toggle="tooltip" data-placement="top" title="Edit request" onClick={(e) => handleEditForm(e, index)}></i></td>
    </tr>
  );
}

export default Request;