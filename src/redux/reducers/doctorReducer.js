
  const DoctorInfo = []
    
  
  export const doctorReducer = (state = DoctorInfo, action) => {
    switch (action.type) {
      case "ADD_DOCTOR":
        state = [...state, action.payload];
        return state;
      case "DELETE_DOCTOR":
        const contactFilter = state.filter((doctor) =>
        doctor.id === action.payload ? null : doctor
        );
        state = contactFilter;
        return state;
      case "UPDATE_DOCTOR":
        const contactUpdate = state.filter((doctor) =>
        doctor.id === action.payload.id
            ? Object.assign(doctor, action.payload)
            : doctor
        );
        state = contactUpdate;
        return state;
      case "RESET_DOCTOR":
        state = [{ name: null, email: null, phone: null }];
        return state;
      default:
        return state;
    }
  };
  
  