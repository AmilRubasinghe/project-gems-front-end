import { MdKeyboardArrowUp } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { BsFilePerson } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import "../ADashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Widget({ type }) {
  const [allUsers, setAllUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // New state variable for user count
  const [allMechanics, setAllMechanics] = useState([]);
  const [mechanicCount, setMechanicCount] = useState(0); // New state variable for user count
  const [allBookings, setAllBookings] = useState([]);
  const [bookingCount, setBookingCount] = useState(0); // New state variable for user count
  const [totalEarnings, setTotalEarnings] = useState(0); // New state variable for total earnings
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchMechanic();
    fetchBooking();
  }, []);

  useEffect(() => {
    setUserCount(allUsers.length); // Update user count when allUsers changes
  }, [allUsers]);

  useEffect(() => {
    setMechanicCount(allMechanics.length); // Update user count when allUsers changes
  }, [allMechanics]);

  useEffect(() => {
    setBookingCount(allBookings.length); // Update user count when allUsers changes
    calculateTotalEarnings();
  }, [allBookings]);

  //get users total count
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${serverHost}/api/userCount/getAllUsers`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == "200") {
        setAllUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error during getting mechanics", error);
    }
  };

  //get users total count
  const fetchMechanic = async () => {
    try {
      const response = await axios.get(
        `${serverHost}/api/mechanicCount/getAllMechanics`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == "200") {
        setAllMechanics(response.data.data);
      }
    } catch (error) {
      console.error("Error during getting mechanics", error);
    }
  };

  //get booking total count
  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `${serverHost}/api/bookingCount/getAllBookings`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == "200") {
        setAllBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error during getting bookings", error);
    }
  };

  const calculateTotalEarnings = () => {
    const total = allBookings.reduce((acc, booking) => acc + booking.netTotal, 0);
    setTotalEarnings(total);
  };

  //navigation to the respective page
  let navigateTo = (type) => {
    switch (type) {
      case "user":
        navigate("/admin/users");
        break;
      case "mechanic":
        navigate("/admin/mechanics");
        break;
      case "booking":
        navigate("/admin/manageBooking");
        break;
      case "earning":
        break;
      default:
        break;
    }
  }

  //manage count
  let amount;
  switch (type) {
    case "user":
      amount = userCount;
      break;
    case "mechanic":
      amount = mechanicCount;
      break;
    case "booking":
      amount = bookingCount;
      break;
    case "earning":
      amount = totalEarnings;
      break;
    default:
      amount = 1000;
      break;
  }
  const percentage = 20;

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all Users",
        icon: (
          <IoPerson
            className="text-[28px] p-[5px] rounded-sm self-end text-blue-500 "
            style={{ color: "crimson", backgroundColor: "rgb(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "mechanic":
      data = {
        title: "MECHANICS",
        isMoney: false,
        link: "See all Mechanics",
        icon: (
          <BsFilePerson
            className="text-[28px] p-[5px] rounded-sm self-end"
            style={{ color: "#218fc2", backgroundColor: "rgb(0,0,255,0.2)" }}
          />
        ),
      };
      break;
    case "booking":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        link: "See all Bookings",
        icon: (
          <TbBrandBooking
            className="text-[28px] p-[5px] rounded-sm self-end "
            style={{ color: "purple", backgroundColor: "#80008041" }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "See all Earnings",
        icon: (
          <FaMoneyBillTrendUp
            className="text-[28px] p-[5px] rounded-sm self-end "
            style={{ color: "green", backgroundColor: "rgb(0,255,0,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div
      className="flex flex-1 padding-[10px] justify-between border rounded-md 
            p-2 h-[160px] shadow-xl shadow-slate-500 "
    >
      <div className="flex flex-col justify-between">
        <span className="bold text-[16px] text-gray-500">{data.title}</span>
        <span className="text-[24px] font-bold text-gray-700 ">
          {data.isMoney && "$"} {amount}
        </span>
        <span onClick={() => navigateTo(type)} className="text-[14px] border-b-2 text-gray-400 w-max cursor-pointer hover:text-gray-500 ">
          {data.link}
        </span>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center text-[16px] positive">
          <MdKeyboardArrowUp />
          {percentage}%
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
