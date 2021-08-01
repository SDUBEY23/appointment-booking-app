import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./appointment.css";
import { useParams, useHistory, Link, Redirect } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Badge, IconButton } from "@material-ui/core";

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
        <div>
          <h1 className="display-4">Let's Connect! 🗓️</h1>
          <hr className="my-2" />
          <p className="lead">
            Tap or click on an available timeslot below to book an appointment.
          </p>
          <p>
            Time slots marked in <span className="red-text">red</span> are
            already booked.
          </p>
          <h2>Select Date</h2>
        </div>
        <article className="row__date">
          <div onClick={() => changeDate(gotoDate(-1))} className="button">
            <IconButton>
              <Badge>
                <ArrowBackIosIcon style={{ color: "#111" }} />
              </Badge>
            </IconButton>
            ️
          </div>
          <h2>{currentDate}</h2>
          <div onClick={() => changeDate(gotoDate(1))} className="button">
            <IconButton>
              <Badge>
                <ArrowForwardIosIcon style={{ color: "#111" }} />
              </Badge>
            </IconButton>
            ️
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
