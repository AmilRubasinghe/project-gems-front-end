import { useEffect, useState } from "react";
import "./Bookingdetails.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Bookingdetails() {
  const { user, addedItem } = useAuth();
  const [allMechanics, setAllMechanics] = useState([]);
  const [userName, setUserName] = useState(user?.fullname || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [mobileNumber, setMobileNumber] = useState(user?.phone || "");
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(
          `${serverHost}/api/bookingSlot/getAllMechanics`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setAllMechanics(response.data.data);
        }
      } catch (error) {
        console.error("Error during getting mechanics", error);
      }
    };

    fetchMechanics();
  }, []);

  const [form, setForm] = useState({
    vehicleMake: "",
    vehicleModel: "",
    vehicleNumber: "",
    manufacturedYear: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMechanicChange = (e) => {
    const mechanicId = e.target.value;
    setSelectedMechanic(mechanicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.vehicleMake ||
      !form.vehicleModel ||
      !form.vehicleNumber ||
      !form.manufacturedYear ||
      !userName ||
      !mobileNumber ||
      !userEmail
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const bookingData = {
      vehiclemake: form.vehicleMake,
      vehicletype: form.vehicleModel,
      vehiclenumber: form.vehicleNumber,
      manufecturedyear: form.manufacturedYear,
      preferreddate: form.preferredDate,
      preferredtime: form.preferredTime,
      vehicleownername: userName,
      mobilenumber: mobileNumber,
      model: addedItem ?? "No item selected",
      email: userEmail,
      message: form.message,
      userId: user._id,
      mechanicId: selectedMechanic,
    };

    try {
      let bookingId;
      const response = await fetch(`${serverHost}/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Booking creation failed:", errorData);
        throw new Error("Failed to create booking");
      }
      const responseData = await response.json();

      if (response.status === 200) {
        bookingId = responseData.data._id;
      }

      const sendNotification = await fetch(
        `${serverHost}/api/notification/createNotification/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingId,
            mechanicId: selectedMechanic,
            topic: "Booking",
            message: "Booking created successfully",
          }),
        }
      );

      if (!sendNotification.ok) {
        const notificationError = await sendNotification.json();
        console.error("Notification sending failed:", notificationError);
        throw new Error("Failed to send notification");
      }

      Swal.fire({
        title: "Success!",
        text: "Your operation was successful.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
      setForm({
        vehicleMake: "",
        vehicleModel: "",
        vehicleNumber: "",
        manufacturedYear: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        mechanicId: "",
      });
      setUserName("");
      setMobileNumber("");
      setUserEmail("");
    } catch (error) {
      console.error(
        "Error during booking creation or notification sending:",
        error
      );
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "Failed to create booking or send notification. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 15; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const today = new Date().toISOString().split("T")[0];

  const handleCancel = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  return (
    <main className="booking-details flex justify-center text-white relative p-4 md:p-8">
      <div className="background-design"></div>
      <div className="app-booking pb-4 w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Slot Booking Details</h1>
        <div className="container-booking">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Vehicle Make</label>
              <input
                className="input-area"
                type="text"
                name="vehicleMake"
                placeholder="Ex: Hybrid"
                value={form.vehicleMake}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Vehicle Model</label>
              <input
                className="input-area"
                type="text"
                name="vehicleModel"
                placeholder="Ex: Vezel"
                value={form.vehicleModel}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Vehicle Number</label>
              <input
                className="input-area"
                type="text"
                name="vehicleNumber"
                placeholder="Ex: CAB - 1234"
                value={form.vehicleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Manufactured Year</label>
              <input
                className="input-area"
                type="text"
                name="manufacturedYear"
                placeholder="Ex: 2040"
                value={form.manufacturedYear}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={form.preferredDate}
                onChange={handleChange}
                min={today}
                className="input-area"
              />
            </div>
            <div className="flex flex-col">
              <label>Preferred Time</label>
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                className="input-area"
              >
                <option value="">Select a time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Vehicle Owner Name</label>
              <input
                className="input-area"
                type="text"
                name="ownerName"
                placeholder="Ex: Mr. Perera"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Mobile Number</label>
              <input
                className="input-area"
                type="text"
                name="mobileNumber"
                placeholder="Ex: 078-7587700"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Selected Item</label>
              <input
                className="input-area"
                type="text"
                name="selectedItem"
                value={addedItem}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className="input-area"
                type="email"
                name="email"
                placeholder="Ex: abcdefgh@gmail.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label>Message</label>
              <textarea
                className="textarea-last"
                name="message"
                placeholder="Enter your message here"
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label>Select a Mechanic</label>
              <select
                className="dropdown rounded-lg text-gray-700 p-2 w-full"
                value={selectedMechanic}
                onChange={handleMechanicChange}
              >
                <option className="text-gray-700" value="">
                  Select a Mechanic
                </option>
                {allMechanics.map((mechanic) => (
                  <option key={mechanic._id} className="text-gray-700" value={mechanic._id}>
                    {mechanic.firstname} ({mechanic.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:col-span-2">
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-300 text-white p-3 w-full rounded-lg"
              >
                Cancel Booking
              </button>
              <button type="submit" className="btn bg-blue-500 hover:bg-blue-400 text-white p-3 w-full rounded-lg">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Bookingdetails;
