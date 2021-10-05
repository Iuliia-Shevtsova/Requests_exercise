import React, { useState} from 'react'
import axios from 'axios';

const CreateForm = ({requests, setRequests, setIsCreateVisible}) => {

  const [request, setRequest] = useState({ request_due_date: '', expiration_date: '', request_text: '', department_names: '', requester: '' })

  const cancelCreateForm = (e) => {
    e.preventDefault();
    setIsCreateVisible(false);
  };

  const handleChangeForm = (e) => {
    e.preventDefault()
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  }

  const handlDateFormat = () => {
    setRequest({
      ...request,
      request_due_date: new Date(request.request_due_date).toISOString(),
      expiration_date: new Date(request.expiration_date).toISOString()
    });
  }
  const submitCreateForm = (e) =>{
    e.preventDefault();
    // handlDateFormat;
    
    axios.post('https://603804c74e3a9b0017e92b01.mockapi.io/api/requests', request)
      .then(response => {
        console.log(response);
        setRequests([...requests, response.data]);
      })
      .catch(error => console.log('Error creating request', error))
    
    setIsCreateVisible(false);
  }

  return (
    <form onChange={(e)=> handleChangeForm(e)}>
      <div className="form-row mb-3">
        <div className="col-md-4 mb-3">
          <label for="request_due_date">Request due date</label>
          <input type="text" className="form-control" name="request_due_date" id="request_due_date" placeholder="May 6, 2020"/>
        </div>
        <div className="col-md-4 mb-3">
          <label for="expiration_date">Expiration date</label>
          <input type="text" className="form-control"  name="expiration_date" id="expiration_date" placeholder="January 6, 2022"/>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <label for="request_text">Request text</label>
        <input type="text" className="form-control" name="request_text" id="request_text"/>
      </div>
      <div className="col-md-6 mb-3">
        <label for="department_names">Department names</label>
        <input type="text" className="form-control" name="department_names" id="department_names"/>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label for="requester">Requester (Enter your name or email)</label>
          <input type="text" className="form-control" name="requester" id="requester"/>
        </div>
      </div>
      
      <button type="submit" className="btn btn-success mx-3" onClick={(e)=> submitCreateForm(e)}>Create request</button>
      <button type="button" className="btn btn-secondary" onClick={(e)=> cancelCreateForm(e)}>Cancel</button>
    </form>
  );
}

export default CreateForm;