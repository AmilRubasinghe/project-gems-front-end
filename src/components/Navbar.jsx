import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/photos/logo.png";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState([
    { bookingId: 1, topic: "New Booking", message: "Your booking is confirmed." },
    { bookingId: 2, topic: "Special Offer", message: "Get 20% off on next booking!" },
  ]);
  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleSignup = () => {
    window.location.href = "/signupoption";
  };

  const handleNotificationClick = (bookingId) => {
    console.log("Notification clicked:", bookingId);
  };

  return (
    <header className="header px-4 sm:px-10 lg:px-20 relative">
      <div className="flex w-full justify-between items-center">
        <img
          className="Logo"
          src={Logo}
          style={{ width: "90px", height: "70px" }}
          alt="Logo"
        />

        {/* Mobile Menu Toggle */}
        <button className="sm:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex sm:space-x-4 sm:items-center">
          <div className="nav-links flex space-x-4">
            <Link to="/">HOME</Link>
            {token && <Link to="/bookings">BOOKINGS</Link>}
            {token && <Link to="/contact">CONTACT</Link>}
            <Link to="/servicepage">SERVICES</Link>
            <Link to="/offerpage">OFFERS</Link>
            {token && <Link to="/store">STORE</Link>}
          </div>

          {token ? (
            <div className="flex items-center space-x-4">
              <button
                className="hover:bg-transparent notification-btn"
                onClick={toggleModal}
              >
                <IoNotificationsSharp size={20} />
              </button>

              {showModal && (
                <div className="notification-modal z-[10000]">
                  <button
                    className="absolute bg-gray-200 h-[30px] w-[30px] top-[5px] right-[5px] text-black rounded-2xl text-[20px]"
                    onClick={toggleModal}
                  >
                    &times;
                  </button>
                  {notification.map((note, index) => (
                    <button
                      key={index}
                      onClick={() => handleNotificationClick(note.bookingId)}
                      className="notification-content"
                    >
                      <h5>{note.topic}</h5>
                      <p>{note.message}</p>
                    </button>
                  ))}
                </div>
              )}

              <button
                className="btn text-white px-3 w-[100px] rounded hover:bg-blue-700 h-[40px] bg-primary"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              className="sign-up-btn1 px-4 py-1 rounded hover:bg-blue-700"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          )}
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav
            className="fixed top-0 left-0 w-full h-[300px] backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center z-50 transform transition-transform duration-1000 ease-in-out"
          >
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={toggleMenu}
            >
              &times;
            </button>
            <div className="flex flex-col space-y-4 text-center">
              <Link to="/" onClick={toggleMenu}>HOME</Link>
              {token && <Link to="/bookings" onClick={toggleMenu}>BOOKINGS</Link>}
              {token && <Link to="/contact" onClick={toggleMenu}>CONTACT</Link>}
              <Link to="/servicepage" onClick={toggleMenu}>SERVICES</Link>
              <Link to="/offerpage" onClick={toggleMenu}>OFFERS</Link>
              {token && <Link to="/store" onClick={toggleMenu}>STORE</Link>}
              {token ? (
                <button
                  className="text-white px-4 py-2 rounded bg-primary hover:bg-blue-700"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) : (
                <button
                  className="text-white px-4 py-2 rounded bg-primary hover:bg-blue-700"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
