import { Grid, TextField } from "@material-ui/core";
import React, { useState, useMemo } from "react";
import { connect } from "react-redux";

import { useParams, useHistory } from "react-router-dom";

import { updateAppointment } from "../../action";

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const MOBILE_NUMBER = "mobile";

const AppointmentDetails = ({ appointments, updateAppointment }) => {
  let { date, month, year, timeFrom } = useParams();
  const currentDate = `${date}/${month}/${year}`;
  const history = useHistory();
  const DATA = useMemo(
    () => (appointments && appointments[currentDate]) || {},
    [appointments, currentDate]
  );
  const [userDetails, setUserDetails] = useState(DATA[timeFrom] || {});

  const updateFormData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.dataset.type]: e.target.value,
    });
  };

  const onClickSave = () => {
    let error = false;
    let obj = {
      ...userDetails,
    };

    [FIRST_NAME, MOBILE_NUMBER, LAST_NAME].forEach((detail) => {
      if (!userDetails[detail]) {
        error = true;
        obj = {
          ...obj,
          [detail]: "",
        };
      }
    });

    setUserDetails(obj);

    if (error) {
      return;
    }

    updateAppointment(currentDate, timeFrom, obj);

    history.goBack();
  };

  return (
    <section>
      <Grid item>
        <input
          type="text"
          placeholder="First Name"
          onChange={updateFormData}
          data-type={FIRST_NAME}
          isInvalid={userDetails[FIRST_NAME] === ""}
          value={userDetails[FIRST_NAME]}
        />
        <input
          type="text"
          placeholder="Last Name"
          aria-label="Last Name"
          aria-describedby="Last Name"
          data-type={LAST_NAME}
          onChange={updateFormData}
          isInvalid={userDetails[LAST_NAME] === ""}
          value={userDetails[LAST_NAME]}
        />
        <input
          type="number"
          placeholder="Mobile Number"
          aria-label="First Name"
          aria-describedby="First Name"
          data-type={MOBILE_NUMBER}
          onChange={updateFormData}
          isInvalid={userDetails[MOBILE_NUMBER] === ""}
          value={userDetails[MOBILE_NUMBER]}
        />
      </Grid>
      <button onClick={() => history.goBack()} variant="secondary">
        Cancel
      </button>

      <button onClick={onClickSave}>Save</button>
    </section>
  );
};

export default connect(
  ({ appointments }) => ({
    appointments,
  }),
  {
    updateAppointment,
  }
)(AppointmentDetails);