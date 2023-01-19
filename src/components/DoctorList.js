import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  doctorReducer  from "../redux/reducers/doctorReducer";
const DoctorList = ({ doctors, deletedoctor}) => {
  console.log(deletedoctor)
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/adddoctor" className="btn btn-outline-dark my-5 ml-auto ">
          Add Doctor
        </Link>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                doctors.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <Link
                        to={`/editdoctor/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deletedoctor(contact.id)}
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
  doctors: state.doctorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deletedoctor: (id) => {
    dispatch({ type: "DELETE_DOCTOR", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
