import { useState, useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';

function MechanicProfile() {
  const [mechanics, setAllMechanics] = useState([]);
  const serverHost = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(
          `${serverHost}/api//bookingSlot/getAllMechanics`,
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

    fetchMechanics();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between border-b-2">
        <h1 className="m-4 text-[36px] text-primary-color font-bold uppercase">
          Mechanic Profile
        </h1>
        <Link
          to={"/admin/dashboard"}
          className="text-[24px] mr-4 cursor-pointer"
        >
          <MdDashboard />
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between mx-4">
        {mechanics.map((mechanic, index) => (
          <div
            key={index}
            className="mt-4 flex items-center justify-center text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
            <div className="flex flex-col justify-center items-center p-4 bg-white shadow-lg rounded-md">
              <div className="flex items-center justify-between w-full border-b-2 py-2 text-[16px]">
                <span>ID: {mechanic.idnumber} </span>
                <span>
                  {mechanic.isOut ? (
                    <span className="bg-green-600 p-1 m-1 rounded-sm text-white">
                      IN
                    </span>
                  ) : (
                    <span className="bg-red-600 p-1 m-1 rounded-sm text-white">
                      OUT
                    </span>
                  )}
                </span>
              </div>
              <div className="m-2 flex items-center justify-center w-[75%]">
                <img src={mechanic.profile || 'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              </div>
              <div className="flex flex-col gap-1 justify-center items-center">
                <span className="text-[24px]">{mechanic.firstname} {mechanic.lastname}</span>
                <span>{mechanic.phone}</span>
                <span>{mechanic.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicProfile;
