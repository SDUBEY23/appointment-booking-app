import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./appointment.css";

import { useParams, useHistory, Link, Redirect } from "react-router-dom";

// import LeftArrow from "static/icons/left.png";
// import RightArrow from "static/icons/right.png";

const TIME_SLOT = [9, 10, 11, 12, 13, 14, 15, 16];

const Appointment = ({ appointments }) => {
  let { date, month, year } = useParams();
  const history = useHistory();
  const currentDate = `${date}/${month}/${year}`;

  const bookingData = useMemo(
    () => (appointments && appointments[currentDate]) || {},
    [appointments, currentDate]
  );

  const gotoDate = useCallback(
    (day) =>
      moment(`${date}/${month}/${year}`, "D/M/YYYY")
        .add(day, "days")
        .format("D-M-YYYY")
        .split("-"),
    [date, month, year]
  );

  const changeDate = useCallback(
    (newDate) =>
      history.push(
        `/${parseInt(newDate[0])}/${parseInt(newDate[1])}/${parseInt(
          newDate[2]
        )}/`
      ),
    [history]
  );

  const formatTime = useCallback((time) => {
    if (time < 12) {
      return `${time} AM`;
    }

    if (time > 12) {
      time = time - 12;
    }

    return `${time} PM`;
  }, []);

  if (!(date && month && year)) {
    const currentDate = moment();
    date = currentDate.date();
    month = currentDate.month() + 1;
    year = currentDate.year();
    return <Redirect to={`/${date}/${month}/${year}/`} />;
  }

  return (
    <div className="row">
      <div className="row__header">
        <article>
          <div onClick={() => changeDate(gotoDate(-1))} className="button">
            <img alt="left button" />️
          </div>
          <h2>{currentDate}</h2>
          <div onClick={() => changeDate(gotoDate(1))} className="button">
            <img alt="right button" />️
          </div>
        </article>
      </div>
      <section className="row__timeslots">
        <div>
          <div>
            <h2>Select A Time Slot</h2>
          </div>
        </div>
        <div>
          <div>
            {TIME_SLOT.map((time) => (
              <Link className="row__item" key={time} to={`${time}/details/`}>
                <button className={bookingData[time] && "booked"}>
                  {formatTime(time)} to {formatTime(++time)}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(({ appointments }) => ({
  appointments,
}))(Appointment);
