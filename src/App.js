import moment from "moment";
import Container from "react-bootstrap/Container";
import { FaTimesCircle, FaCheck } from "react-icons/fa";

const MIN_HOUR = 6;
const MAX_HOUR = 20;

const calcTimeRemaining = () => {
  const now = moment();

  const minutesPast = now.hours() * 60 + now.minutes();

  let totalMinutes = MAX_HOUR * 60 - minutesPast;
  let minutes = totalMinutes;
  let hours = 0;

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes %= 60;
  }

  return { hours, minutes, totalMinutes };
};

const parseTimeRemaining = ({ hours, minutes, totalMinutes }) => {
  if (totalMinutes < 0) {
    return null;
  } else if (hours === 0) {
    return `${minutes}min`;
  } else {
    return `${hours}h${minutes}min`;
  }
};

const isAccessRestricted = ({ totalMinutes }) => totalMinutes > 0;

const App = () => {
  const timeRemaining = calcTimeRemaining();

  const accessRestricted = isAccessRestricted(timeRemaining);

  const pageConfig = {
    bgColor: accessRestricted ? "bg-danger" : "bg-success",
    icon: accessRestricted ? <FaTimesCircle /> : <FaCheck />,
    heading: accessRestricted ? "You have been redirected" : "Access granted",
    body: accessRestricted ? (
      <p>
        This app is restricted from{" "}
        <code className="text-light">
          {MIN_HOUR.toString().padStart(2, "0")}:00
        </code>{" "}
        to{" "}
        <code className="text-light">
          {MAX_HOUR.toString().padStart(2, "0")}:00
        </code>{" "}
        your time. Please come back in{" "}
        <code className="text-light">{parseTimeRemaining(timeRemaining)}</code>.
      </p>
    ) : (
      <p>Enjoy your time!</p>
    ),
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center text-light text-center p-3 ${pageConfig.bgColor}`}
      style={{ height: "100vh" }}
    >
      <Container>
        <div className="mb-5">
          <h1 className="display-1 mb-4">{pageConfig.icon}</h1>
          <h5 className="font-weight-bold">{pageConfig.heading}</h5>
        </div>
        {pageConfig.body}
      </Container>
    </div>
  );
};

export default App;
