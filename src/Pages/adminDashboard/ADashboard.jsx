import Widget from "./adminComponent/Widget";
import BookingsEarningsGraph from "./adminComponent/BookingsEarningsGraph";
import "./ADashboard.css"; // Add your own styling

const ADashboard = () => {
  return (
    <div className="Adashboard">
      <h2 className="m-6 text-[56px] font-extrabold uppercase text-primary-color">
        Dashboard
      </h2>

      <div className="flex p-[20px] w-[100%] gap-[20px]">
        <Widget type="user" />
        <Widget type="mechanic" />
        <Widget type="earning" />
        <Widget type="booking" />
      </div>

      <div className="mt-8">
        <BookingsEarningsGraph />
      </div>
    </div>
  );
};

export default ADashboard;
