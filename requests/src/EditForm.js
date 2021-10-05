import React, { useState} from 'react'
import axios from 'axios';

const EditForm = ({index, editRequest, requests, setRequests, setIsEditVisible}) => {

  const [request, setRequest] = useState(editRequest);

  const cancelEditForm = (e) => {
    e.preventDefault();
    setIsEditVisible(false);
  };

  const handleChangeForm = (e) => {
    e.preventDefault()
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  }

  const submitEditForm = (e) =>{
    e.preventDefault();
    
    axios.put(`https://603804c74e3a9b0017e92b01.mockapi.io/api/requests/${editRequest.id}`, request)
      .then(response => {
        console.log(response);
        const updatedRequests = [...requests]; // creates a copy of the array
        updatedRequests[index] = response.data;
        setRequests(updatedRequests);
      })
      .catch(error => console.log('Error creating request', error))
    setIsEditVisible(false);
  }

  return (
    <form onChange={(e)=> handleChangeForm(e)}>
      <div className="form-row mb-3">
        <div className="col-md-4 mb-3">
          <label for="request_due_date">Request due date</label>
          <input type="text" className="form-control" name="request_due_date" id="request_due_date" value={request.request_due_date}/>
        </div>
        <div className="col-md-4 mb-3">
          <label for="expiration_date">Expiration date</label>
          <input type="text" className="form-control"  name="expiration_date" id="expiration_date" value={request.expiration_date}/>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <label for="request_text">Request text</label>
        <input type="text" className="form-control" name="request_text" id="request_text" value={request.request_text}/>
      </div>
      <div className="col-md-6 mb-3">
        <label for="department_names">Department names</label>
        <input type="text" className="form-control" name="department_names" id="department_names" value={request.department_names}/>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label for="requester">Requester (Enter your name or email)</label>
          <input type="text" className="form-control" name="requester" id="requester" value={request.requester}/>
        </div>
      </div>
      
      <button type="submit" className="btn btn-info mx-3" onClick={(e)=> submitEditForm(e)}>Update request</button>
      <button type="button" className="btn btn-secondary" onClick={(e)=> cancelEditForm(e)}>Cancel</button>
    </form>
  );
}

export default EditForm;