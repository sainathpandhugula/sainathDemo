import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PatientList = ({ contacts, doctors ,deleteContact }) => {
  console.log(deleteContact)
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Patient
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">City</th>
                <th scope="col">Phone</th>
                <th scope="col">AssignedDoctor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.gender}</td>
                    <td>{contact.city}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.dname}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.patientReducer,
  doctors:state.doctorReducer
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_PATIENT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
