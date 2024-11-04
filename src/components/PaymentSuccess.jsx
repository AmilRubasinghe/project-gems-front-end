import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, } from 'react';

const PaymentSuccess = () => {
  const { id } = useParams();
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const clientHost = import.meta.env.VITE_CLIENT_HOST;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        await axios.get(`${serverHost}/api/changePaymentStatus/${id}`);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

      fetchBookingDetails();
  }, []);

  const handleReturnHome = async () => {
      window.location.href = `${clientHost}/`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you for your payment. Your transaction was successful.</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleReturnHome}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;