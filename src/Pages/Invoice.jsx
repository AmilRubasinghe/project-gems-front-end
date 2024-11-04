import { useEffect, useState } from "react";
import "./Invoice.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineRest } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

const Invoice = () => {
  const bookingId = localStorage.getItem("bookingId");
  const serverHost = import.meta.env.VITE_SERVER_HOST;

  const [workItems, setWorkItems] = useState(() => {
    // Load workItems from localStorage if available
    const savedItems = localStorage.getItem("workItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const navigate = useNavigate();
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("workItems", JSON.stringify(workItems));
  }, [workItems]);

  // Calculate net total whenever workItems changes
  useEffect(() => {
    const total = workItems.reduce(
      (acc, item) => acc + Number(item.total || 0),
      0
    );
    setNetTotal(total);
  }, [workItems]);

  const handleCreateBill = async () => {
    if (!bookingId || bookingId === "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (workItems.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "At least 1 item is required!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Ensure all required fields are provided
    for (const item of workItems) {
      if (!item.partCode || !item.description || !item.warranty) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "All work item fields are required!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    const data = {
      workItems: workItems,
      netTotal: netTotal,
    };

    try {
      // Update inventory quantities
      for (const item of workItems) {
        await axios.put(
          `${serverHost}/api/inventory/partcode/${item.partCode}`,
          {
            quantity: item.qty, // Decrease the quantity
          }
        );
      }

      // Create the bill
      const response = await axios.post(
        `${serverHost}/api/addBill/${bookingId}`,
        data
      );
      if (response.status === 200) {
        console.log({ ress: response });
        navigate("/mdashboard");
        setWorkItems([]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bill created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(
        "Error creating bill:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create bill!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Function to remove an item by index
  const handleRemove = (index) => {
    const updatedWorkItems = workItems.filter((item, i) => i !== index);
    setWorkItems(updatedWorkItems);
  };

  //use to navigate to the previous page
  const handleGoback = () => {
    navigate("/addwork");
  };

  return (
    <div className="invoice-main">
      <div className="flex flex-col items-center mt-4 w-[80%]">
        <table className="invoice-table m-6">
          <thead>
            <tr colSpan="6">
              <th colSpan={7}>AUTOCARE VEHICLE SERVICE CENTER</th>
            </tr>
            <tr>
              <th>Description</th>
              <th>Warranty</th>
              <th>Parts Code No</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Action</th> {/* New column for remove action */}
            </tr>
          </thead>
          <tbody>
            {workItems.map((item, index) => (
              <tr key={index}>
                <td>{item.description || "N/A"}</td>
                <td>{item.warranty || "N/A"}</td>
                <td>{item.partCode || "N/A"}</td>
                <td>{item.qty ?? "N/A"}</td>
                <td>{item.unitAmount ?? "N/A"}</td>
                <td>{item.total ?? "N/A"}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>
                    <AiOutlineRest />
                  </button>
                </td>
              </tr>
            ))}
            {/* Central logo row */}
            {/* <tr>
              <td colSpan="6" className="center-logo-cell">
                <div className="logo-container">
                  <img
                    className="logo"
                    src={logo}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>

        <div className="flex justify-between w-[100%] gap-5">
          <div>
            <button className="payment-button" onClick={handleGoback}>
              Go Back
            </button>
          </div>
          <div className="flex gap-8">
            <div className="">
              <button className="payment-button" onClick={handleCreateBill}>
                Submit &gt;
              </button>
            </div>
            <div className="bg-gray-200 py-2 px-6 rounded-[10px] ">
              <span className="">MAIN TOTAL (LKR): </span>
              <span className="total-amount">{netTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
