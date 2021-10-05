import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Request from './Request'
import CreateForm from './CreateForm'
import EditForm from './EditForm'

function App() {

  const [requests, setRequests] = useState([]);
  const [editRequest, setEditRequest] = useState({});
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [index, setIndex] = useState(null);

  useEffect(() => { 
    axios('https://603804c74e3a9b0017e92b01.mockapi.io/api/requests')
      .then(response => 
        setRequests(response.data)
        )
      .catch(error => console.log('Error fetching requests', error))
  }, []);

  const showCreateForm = (e) => {
    e.preventDefault();
    setIsCreateVisible(true);
  };

  const handleEditForm = (e, index) =>{
    e.preventDefault();
    setIsEditVisible(true);
    setEditRequest(requests[index]);
    setIndex(index);
  }

  const filterRequests= (id) => {
    setRequests( requests.filter(p => p.id !== id));
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center my-3">Requests</h2>
        <div>
          <button type="button" className="btn btn-outline-success m-3" onClick={(e)=> showCreateForm(e)}>Create request</button>
        </div>
        {isCreateVisible ?
          <CreateForm 
            requests={requests} 
            setRequests={setRequests}
            setIsCreateVisible={setIsCreateVisible}
          />
          : null
        }
        {isEditVisible ?
          <EditForm 
            index={index}
            editRequest={editRequest}
            requests={requests} 
            setRequests={setRequests}
            setIsEditVisible={setIsEditVisible}
          />
          : null
        }
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Text</th>
              <th scope="col">Due date</th>
              <th scope="col">Expiration date</th>
              <th scope="col">Department names</th>
              <th scope="col">Requester</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {requests.length !==0 ? 
              requests.map((request, index) => (
                <Request 
                  key={request.id.toString()} 
                  index={index}
                  request={request}
                  handleEditForm={handleEditForm}
                  filterRequests={filterRequests}
                />
              ))
              :
              <tr>
                There are no requests yet.
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
