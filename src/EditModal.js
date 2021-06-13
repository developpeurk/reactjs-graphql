import React from 'react';
import { UPDATE_CONTACT } from './mutations/mutations';
import { useMutation } from '@apollo/react-hooks';
function EditModal({ contactToUpdate }) {
  const [contact, setContact] = React.useState({
    name: '',
    phone: '',
  });
  React.useEffect(() => {
    setContact(contactToUpdate);
  }, [contactToUpdate]);
  const [error, setError] = React.useState('');
  //function return mutation
  const [updateContact] = useMutation(UPDATE_CONTACT);

  function handleInputChange(event) {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { id, name, phone } = contact;
    if (name || phone) {
      //function
      updateContact({
        variables: {
          id,
          name,
          phone,
        },
      });
      setContact({
        name: '',
        phone: '',
      });
      setError('');
    } else {
      setError('Tous les champs sont obligatoires');
    }
  }
  return (
    <div role="dialog" id="editContact" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editer un contact</h5>
            <button className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form method="post">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  value={contact.name}
                  onChange={(event) => handleInputChange(event)}
                  placeholder="full name"
                  className="form-control"
                  type="text"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  value={contact.phone}
                  onChange={(event) => handleInputChange(event)}
                  placeholder="phone"
                  className="form-control"
                  type="text"
                  name="phone"
                />
              </div>
              <div className="modal-footer">
                <button onClick={handleSubmit} className="btn btn-primary">
                  valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
