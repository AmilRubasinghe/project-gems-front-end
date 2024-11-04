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
    const savedItems = localStorage.getItem("workItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const navigate = useNavigate();
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("workItems", JSON.stringify(workItems));
  }, [workItems]);

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
      for (const item of workItems) {
        await axios.put(
          `${serverHost}/api/inventory/partcode/${item.partCode}`,
          {
            quantity: item.qty,
          }
        );
      }

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

  const handleRemove = (index) => {
    const updatedWorkItems = workItems.filter((item, i) => i !== index);
    setWorkItems(updatedWorkItems);
  };

  const handleGoback = () => {
    navigate("/addwork");
  };

  return (
    <div className="w-full flex items-center flex-col bg-[#13496b] min-h-screen h-full">
      <div className="flex flex-col items-center mt-4 w-full max-w-[1800px] px-5 lg:px-10">
        <div className="overflow-x-auto w-full">
          <table className="invoice-table w-full m-6 text-sm sm:text-base">
            <thead>
              <tr colSpan="6">
                <th colSpan={7} className="text-center py-4">
                  AUTOCARE VEHICLE SERVICE CENTER
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th>Description</th>
                <th>Warranty</th>
                <th>Parts Code No</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workItems?.map((item, index) => (
                <tr key={index} className="border-b">
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
            </tbody>
          </table>
        </div>

        <div className="flex sm:flex-row flex-col  sm:items-center sm:justify-between w-full mt-5 gap-3 sm:gap-5 mb-5">
          <button className="text-nowrap sm:w-auto w-full h-10 sm:h-12 px-5 rounded-md bg-[#4CAF50] hover:bg-[#4CAF50]/80 text-white " onClick={handleGoback}>
            Go Back
          </button>
          <div className="flex gap-3 sm:gap-5 sm:items-center  w-full sm:justify-end sm:flex-row flex-col">
           
            <button className="text-nowrap sm:w-auto w-full h-10 sm:h-12 px-5 rounded-md bg-[#4CAF50] hover:bg-[#4CAF50]/80 text-white " onClick={handleCreateBill}>
              Submit &gt;
            </button>

            <div className="text-nowrap sm:w-auto w-full bg-gray-200 hover:bg-gray-100 h-10 sm:h-12 px-5 rounded-md flex items-center text-black ">
              <span>MAIN TOTAL (LKR): </span>
              <span className="total-amount">{netTotal}</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Invoice;
