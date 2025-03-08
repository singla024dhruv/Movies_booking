// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaChair } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../index.css";

// const SeatMap = ({ seats, onSeatSelect }) => {
//   return (
//     <div className="grid grid-cols-8 gap-2 p-4">
//       {seats.map((seat) => (  
//         <div
//           key={seat.seatId}
//           onClick={() => !seat.isBooked && onSeatSelect(seat)}
//           className={`p-4 rounded-lg cursor-pointer transition-all ${seat.isBooked
//             ? "bg-red-500"
//             : seat.type==="vip"
//               ? "bg-blue-500 hover:bg-blue-600"
//               : "bg-green-500 hover:bg-green-600"
//             }`}
//         >
//           <FaChair
//             className={`w-6 h-6 ${seat.isBooked ? "text-red-200" : "text-white"}`}
//           />
//           <p className="text-white text-xs mt-1">{seat.seatId}</p>
//         </div>
//       ))}
//     </div>
//   );
// };


// const Home = () => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [stats, setStats] = useState({
//     totalSeats: 0,
//     bookedPercentage: 0,
//     revenue: 0,
//     vipOccupancy: 0,
//   });

//   useEffect(() => {
//     fetchSeats();
//     fetchAnalytics();
//   }, []);

//   const fetchSeats = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/seats");
//       setSeats(response.data);
//       console.log(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch seats");
//     }
//   };

//   const fetchAnalytics = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/analytics");
//       setStats(response.data);
//       console.log(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch analytics");
//     }
//   };

//   const handleSeatSelect = (seat) => {
//     setSelectedSeat(seat);
//   };

//   const handleBookingConfirm = async (bookingData) => {
//     try {
//       await axios.post("http://localhost:3000/api/bookings", bookingData);
//       await fetchSeats();
//       await fetchAnalytics();
//       setSelectedSeat(null);
//       toast.success("Booking confirmed!");
//     } catch (error) {
//       toast.error("Booking failed"+error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow p-4">
//         <h1 className="text-2xl font-bold">Movie Theatre Booking</h1>
//       </header>
//       <main className="container mx-auto py-8">
//         <AnalyticsDashboard stats={stats} />
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>
//           <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
//         </div>
//         {selectedSeat && (
//           <BookingModal
//             seat={selectedSeat}
//             onClose={() => setSelectedSeat(null)}
//             onConfirm={handleBookingConfirm}
//           />
//         )}
//       </main>
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChair, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";


const AnalyticsDashboard = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-bold mb-2">Total Seats</h3>
        <p className="text-3xl">{stats.totalSeats}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-bold mb-2">Booked Seats</h3>
        <p className="text-3xl">{stats.bookedSeats}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-bold mb-2">Revenue</h3>
        <p className="text-3xl">${stats.revenue}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-bold mb-2">VIP Occupancy</h3>
        <p className="text-3xl">{stats.occupancyRate}</p>
      </div>
    </div>
  );
};

const SeatMap = ({ seats, onSeatSelect, onSeatDelete }) => {
  return (
    <div className="grid grid-cols-8 gap-2 p-4">
      {seats.map((seat) => (
        <div
          key={seat.seatId}
          onClick={() => !seat.isBooked && onSeatSelect(seat)}
          className={`p-4 rounded-lg cursor-pointer transition-all relative ${
            seat.isBooked
              ? "bg-red-500"
              : seat.type === "vip"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <FaChair
            className={`w-6 h-6 ${seat.isBooked ? "text-red-200" : "text-white"}`}
            onClick={() => !seat.isBooked && onSeatSelect(seat)}
          />
          <p className="text-white text-xs mt-1">{seat.seatId}</p>
          {seat.isBooked && (
            <button
              onClick={() => onSeatDelete(seat.seatId)}
              className="absolute top-1 right-1 bg-white p-1 rounded-full"
            >
              <FaTrash className="text-red-500" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const BookingModal = ({ seat, onClose, onConfirm }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(seat.seatId);
    onConfirm({ name, seatId: seat.seatId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Book Seat {seat.seatId}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <p>Category: {seat.type}</p>
            <p>Price: ${seat.price}</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [stats, setStats] = useState({
    totalSeats: 0,
    bookedPercentage: 0,
    revenue: 0,
    vipOccupancy: 0,
  });

  useEffect(() => {
    fetchSeats();
    fetchAnalytics();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/seats");
      setSeats(response.data);
    } catch (error) {
      toast.error("Failed to fetch seats");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/analytics");
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to fetch analytics");
    }
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBookingConfirm = async (bookingData) => {
    try {
      await axios.post("http://localhost:3000/api/bookings", bookingData);
      await fetchSeats();
      await fetchAnalytics();
      setSelectedSeat(null);
      toast.success("Booking confirmed!");
    } catch (error) {
      toast.error("Booking failed" + error);
    }
  };

  const handleSeatDelete = async (seatId) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${seatId}`);
      await fetchSeats();
      await fetchAnalytics();
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking" + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Movie Theatre Booking</h1>
      </header>
      <main className="container mx-auto py-8">
      <AnalyticsDashboard stats={stats} />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>
          <SeatMap seats={seats} onSeatSelect={handleSeatSelect} onSeatDelete={handleSeatDelete} />
        </div>
        {selectedSeat && (
          <BookingModal
            seat={selectedSeat}
            onClose={() => setSelectedSeat(null)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;
