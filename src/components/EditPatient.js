import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Grid, Paper,Stack, Avatar, InputLabel, Select, TextField, Button, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, MenuItem } from '@mui/material'


const EditContact = ({ contacts, doctors, updateContact }) => {
  const { id } = useParams();
  const history = useNavigate();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
  const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
  const headerStyle = { margin: '10px 0px' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 20 }
  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
    setCity(currentContact.city);
    setGender(currentContact.gender);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [dname, setDname] = useState("");
  const [gender, setGender] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      name,
      phone,
      city, dname, gender
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
    history("/patient");
  };

  return (
    <>
      {currentContact ? (
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}>
              </Avatar>
              <h2 style={headerStyle}>EditPatient</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label='Name' value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
              <TextField fullWidth label='Email' style={marginTop} value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} style={{ display: 'initial', marginTop }}>
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth style={marginTop} label='Phone Number' value={phone} placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
              <TextField fullWidth style={marginTop} label='City Name' value={city} placeholder="Enter your city name" onChange={(e) => setCity(e.target.value)} />
              <FormControl style={marginTop} fullWidth>
                <InputLabel id="demo-select-small">Select Doctor</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={dname}
                  onChange={(e) => setDname(e.target.value)}
                >{doctors.map((doc) => { return <MenuItem value={doc.name} >{doc.name}</MenuItem> })}
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2}>
              <Button style={marginTop} type='submit' variant='contained' color='primary'>UPDATE</Button>
              <Button style={marginTop} type='submit' variant='contained' color='primary' onClick={() => history("/patient")}>CANCEL</Button>
            </Stack></form>
          </Paper>
        </Grid>) : (
        <h1 className="text-center">No Contact Found</h1>
      )}
    </>
  )
};

const mapStateToProps = (state) => ({
  contacts: state.patientReducer,
  doctors: state.doctorReducer
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_PATIENT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
