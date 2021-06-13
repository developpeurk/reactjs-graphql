import './App.css';
import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { SYNC_CONTACT } from './subscriptions/subscriptions';
import {DELETE_CONTACT} from './mutations/mutations'
import AddModal from './AddModal'
import EditModal from './EditModal'
import { useMutation } from 'react-apollo';

function App() {
  const { data, error, loading } = useSubscription( SYNC_CONTACT );
  const [deleteContact] = useMutation(DELETE_CONTACT)
  const [ contact, setContact ] = React.useState( {
    name: "",
    phone: ""
  })
  if (error) {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-md-6 mx-auto">
            <div className="alert alert-danger">Error loading data!</div>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-md-6 mx-auto">
            <div className="spinner-grow"></div>
          </div>
        </div>
      </div>
    );
  }

  function removeContactPermanently ( {id} )
  {
    deleteContact( {
      variables: {
         id
       }
     } );
  }
  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-6 mx-auto">
          <div className="card p-2">
           <div className="form-group">
                <button
                  data-toggle="modal"
                  data-target="#addContact"
                  className="btn btn-sm btn-primary">
                  Ajouter
                </button>
            </div>        
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map((contact, i) => (
                  <tr key={i}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <button
                      data-toggle="modal"
                      onClick={()=>setContact(contact)}
                  data-target="#editContact"
                  className="btn btn-sm btn-warning">
                  Modifier
                      </button>
                      <button
                      onClick={()=>removeContactPermanently(contact)}
                  className="btn btn-sm btn-danger">
                  Supprimer
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddModal/>
            <EditModal contactToUpdate = {contact}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
