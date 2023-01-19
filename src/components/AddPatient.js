import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Grid, Paper, Avatar, InputLabel, Select, TextField, Button, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, MenuItem } from '@mui/material'


const AddPost = ({ contacts, doctors, addContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [dname, setDname] = useState("");
  const [gender, setGender] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );

    if (!email || !name || !phone || !dname || !gender) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
      phone,
      city, dname,gender
    };

    addContact(data);
    toast.success("Patient added successfully!!");
    history("/patient");
  };
  const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
  const headerStyle = { margin: '10px 0px' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 20 }
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
          </Avatar>
          <h2 style={headerStyle}>AddPatient</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label='Name' value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label='Email' value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} style={{ display: 'initial' }}>
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField fullWidth label='Phone Number' value={phone} placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
          <TextField fullWidth label='City Name' value={city} placeholder="Enter your city name" onChange={(e) => setCity(e.target.value)} />
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Select Doctor</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={dname}
              onChange={(e) => setDname(e.target.value)}
            >{doctors.map((doc) => { return <MenuItem value={doc.name} >{doc.name}</MenuItem> })}
            </Select>
          </FormControl>
          <Button style={marginTop} type='submit' variant='contained' color='primary'>ADD</Button>
        </form>
      </Paper>
    </Grid>

  );
};

const mapStateToProps = (state) => ({
  contacts: state.patientReducer,
  doctors: state.doctorReducer,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_PATIENT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
