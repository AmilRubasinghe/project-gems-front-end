import "./ADashboard.css"; // Add your own styling
import logo from "../../assets/photos/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ASideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        navigate("/login");
      }
    });
  };

  return (
    <div className="Admin-sidebar fixed flex-2">
      <div className="flex flex-col justify-center items-center h-[100%] w-[100%] relative">
        <div className="mt-3 absolute top-0">
          <img src={logo} alt="logo" className="w-[200px] h-[200px]" />
        </div>
        <div className="flex flex-col justify-center items-center mt-[250px] uppercase text-[16px] font-bold">
          <Link
            to="/admin/dashboard"
            className="bg-white text-[#204a64] text-center w-[100%] p-[10px] rounded-lg m-2 border border-black hover:bg-green-500 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/manageBooking"
            className="bg-white text-[#204a64] text-center w-[100%] p-[10px] rounded-lg m-2 border border-black hover:bg-green-500 hover:text-white"
          >
            Manage Booking
          </Link>
          <Link
            to="/admin/inventory"
            className="bg-white text-[#204a64] text-center w-[100%] p-[10px] rounded-lg m-2 border border-black hover:bg-green-500 hover:text-white"
          >
            Store
          </Link>
          <button className="bg-white text-[#204a64] text-center w-[100%] p-[10px] rounded-lg m-2 border border-black hover:bg-green-500 hover:text-white uppercase">
            Setting
          </button>
          <Link
            onClick={handleLogout}
            className="bg-white text-[#204a64] text-center w-[100%] p-[10px] rounded-lg m-2 border border-black hover:bg-green-500 hover:text-white"
          >
            Log Out
          </Link>
        </div>
        <div className="flex items-center mt-2 gap-2 cursor-pointer ">
          <div className="bg-white w-[20px] h-[20px] "></div>
          <div className="bg-[#888] w-[20px] h-[20px] "></div>
        </div>
      </div>
    </div>
  );
};

export default ASideBar;
