import { useEffect, useState } from "react";
import "./Store.css";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar.jsx"
import axios from "axios";
// import bearingImage from './assets/Bearing.png';  // Example image import
// import steeringCoverImage from './assets/Steering.png';
// import engineImage from './assets/engine.png';
// import batteryimage from './assets/Battery.png';
// import headlightimage from './assets/Headlight.png';

const Store = () => {
  const [parts, setParts] = useState([
    {
      "name": "Oil Filter",
      "code": "AC001",
      "price": 200.00,
      "quantity": 5,
      "photo": "https://5.imimg.com/data5/ES/XU/MY-21701725/car-filter-500x500.jpg"
    },
    {
      "name": "Brake Pad Set",
      "code": "AC002",
      "price": 600.00,
      "quantity": 4,
      "photo": "https://m.media-amazon.com/images/I/712q+jx11rL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "name": "Battery",
      "code": "AC003",
      "price": 7000.00,
      "quantity": 10,
      "photo": "https://images.tayna.com/prod-images/1200/Powerline/065-powerline-45-435.jpg"
    },
    {
      "name": "Headlight Bulb",
      "code": "AC004",
      "price": 4500.00,
      "quantity": 10,
      "photo": "https://static-01.daraz.lk/p/31f40f52e0904ffb3842fadd9f3b823a.jpg"
    },
    {
      "name": "Windshield Wiper",
      "code": "AC005",
      "price": 600.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/51LGmNBL7mL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "name": "Spark Plug",
      "code": "AC006",
      "price": 1500.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/71FZXJroy2L._AC_UF894,1000_QL80_.jpg"
    },
    {
      "name": "Radiator",
      "code": "AC007",
      "price": 11000.00,
      "quantity": 10,
      "photo": "https://5.imimg.com/data5/PQ/KM/WB/SELLER-44795145/car-radiator-500x500.jpg"
    },
    {
      "name": "Alternator",
      "code": "AC008",
      "price": 2550.00,
      "quantity": 10,
      "photo": "https://5.imimg.com/data5/YY/QY/MY-11409969/electric-alternator-500x500.jpg"
    },
    {
      "name": "Timing Belt",
      "code": "AC009",
      "price": 350.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/61CJs6HDxkL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "name": "Fuel Pump",
      "code": "AC010",
      "price": 9000.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/61Rpj0vTgZL._AC_SL1419_.jpg"
    },
    {
      "name": "Muffler",
      "code": "AC011",
      "price": 14000.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/51vrkR5sEYL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "name": "Tire",
      "code": "AC012",
      "price": 17500.00,
      "quantity": 10,
      "photo": "https://tyreshoponline.lk/images/products/FERENTINO15565R14ELOGICSRILANKA--1--1663326584.jpg"
    },
    {
      "name": "Brake Disc",
      "code": "AC013",
      "price": 14500.00,
      "quantity": 20,
      "photo": "https://m.media-amazon.com/images/I/71dMy+n3HYL._AC_UF350,350_QL80_.jpg"
    },
    {
      "name": "Steering Wheel",
      "code": "AC014",
      "price": 50000.00,
      "quantity": 30,
      "photo": "https://static-01.daraz.lk/p/c4baabb1066aa276de8e1a78d8309ece.jpg"
    },
    {
      "name": "Clutch Plate",
      "code": "AC015",
      "price": 8500.00,
      "quantity": 25,
      "photo": "https://i.ebayimg.com/images/g/46MAAOSwopBmUMu3/s-l400.jpg"
    },

    {
      "name": "Turbocharger",
      "code": "AC016",
      "price": 65000.00,
      "quantity": 10,
      "photo": "https://accelleron-industries.com/content/accelleronind/solutions-services/marine/products/turbochargers/_jcr_content/root/container/container/container/container_1638140452/container_1652027291_1765651758/teaser_copy_930711378.coreimg.jpeg/1686241274937/accx300-l-next-gen-turbocharger-3d-render-thumbnail.jpeg"
    },

    {
      "name": "Starter Motor",
      "code": "AC017",
      "price": 8000.00,
      "quantity": 4,
      "photo": "https://img.drz.lazcdn.com/static/lk/p/684a4c826797be3eb5911ab808bc9f8d.jpg_720x720q80.jpg"
    },
    {
      "name": "AC Compressor",
      "code": "AC018",
      "price": 24500.00,
      "quantity": 20,
      "photo": "https://ithurukaramu.lk/wp-content/uploads/2020/05/unnamed-39.jpg"
    },

    {
      "name": "Fuel Injector",
      "code": "AC019",
      "price": 45500.00,
      "quantity": 5,
      "photo": "https://m.media-amazon.com/images/I/51HTYhHgYbL._AC_SL1500_.jpg"
    },
    {
      "name": "Engine Mount",
      "code": "AC020",
      "price": 26500.00,
      "quantity": 20,
      "photo": "https://images-cdn.ubuy.qa/634fa5dd9cf52917d63bcd28-ena-engine-motor-mount-set-of-4.jpg"
    },
    {
      "name": "Tail Light",
      "code": "AC021",
      "price": 2500.00,
      "quantity": 10,
      "photo": "https://www.ido.lk/wp-content/uploads/2023/02/Car-LED-Brake-Lamp-in-Sri-Lanka-@ido.lk_.jpg.webp"
    },
    {
      "name": "Gearbox",
      "code": "AC022",
      "price": 120000.00,
      "quantity": 10,
      "photo": "https://interlinksprayers.net/cdn/shop/products/gearbox_worm_wr3_1024x1024.jpg?v=1539649995"
    },

    {
      "name": "Suspension Spring",
      "code": "AC023",
      "price": 7500.00,
      "quantity": 5,
      "photo": "https://static-01.daraz.lk/p/54b0e4019eaa08257e27b4ef7ca18e06.jpg"
    },
    {
      "name": "Wheel Bearing",
      "code": "AC024",
      "price": 150.00,
      "quantity": 5,
      "photo": "https://static.tudo.lk/uploads/2022/12-2/stainless-steel-fan-rubber-seal-bearings-6203-2rs--16717356294995361.webp"
    },
    {
      "name": "Transmission Fluid",
      "code": "AC025",
      "price": 4000.00,
      "quantity": 10,
      "photo": "https://greasemonkey.lk/wp-content/uploads/2018/04/Mobil-ATF-3309.png"
    },

    {
      "name": "Drive Shaft",
      "code": "AC026",
      "price": 22000.00,
      "quantity": 8,
      "photo": "https://newpgenterprises.com/wp-content/uploads/2023/01/121-CV-AXLE-L-2.jpg"
    },
    {
      "name": "Throttle Body",
      "code": "AC027",
      "price": 65000.00,
      "quantity": 4,
      "photo": "https://m.media-amazon.com/images/I/71VOGjzfooL._AC_SL1500_.jpg"
    },
    {
      "name": "Oxygen Sensor",
      "code": "AC028",
      "price": 32000.00,
      "quantity": 5,
      "photo": "https://m.media-amazon.com/images/I/71qtHYoSbAL.jpg"
    },
    {
      "name": "Ignition Coil",
      "code": "AC029",
      "price": 3500.00,
      "quantity": 3,
      "photo": "https://colombomall.lk/wp-content/uploads/2024/04/21VkKfUFWHL.jpg"
    },


    {
      "name": "Control Arm",
      "code": "AC030",
      "price": 12250.00,
      "quantity": 4,
      "photo": "https://m.media-amazon.com/images/I/71Bz17PVSsL.jpg"
    },
    {
      "name": "Carburetor",
      "code": "AC031",
      "price": 15000.00,
      "quantity": 0,
      "photo": "https://bikesd.lk/files/productimages/photo/164a7d1c-e4f4-4fc2-84be-ee8de6cc57e0/large_carburetter%20assy%20PUL%20150%20UG3-UG4%20OE%20cbbpe%20107.jpg"
    },


    {
      "name": "Cylinder Head",
      "code": "AC032",
      "price": 21500.00,
      "quantity": 8,
      "photo": "https://bikesd.lk/files/productimages/photo/2329eec0-88f7-4bdc-bd05-880a4622911f/large_Cylinder%20Head%20175CC%20CH175E13.jpg"
    },
    {
      "name": "Timing Chain",
      "code": "AC033",
      "price": 4850.00,
      "quantity": 10,
      "photo": "https://m.media-amazon.com/images/I/31Xkx7bsDJL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "name": "Camshaft",
      "code": "AC034",
      "price": 950.00,
      "quantity": 6,
      "photo": "https://image.made-in-china.com/2f0j00PczoWqNDrHkA/Bajaj-Engine-Spare-Parts-Camshaft-for-3-Wheeler.jpg"
    },
    {
      "name": "Crankshaft Pulley",
      "code": "AC035",
      "price": 22550.00,
      "quantity": 8,
      "photo": "https://i.ebayimg.com/images/g/by4AAOSw3Sdd-iLK/s-l400.jpg"
    },

    {
      "name": "EGR Valve",
      "code": "AC036",
      "price": 19500.00,
      "quantity": 0,
      "photo": "https://m.media-amazon.com/images/I/513ltUIwzkL._AC_SL1000_.jpg"
    },
    {
      "name": "Piston Rings",
      "code": "AC037",
      "price": 1450.00,
      "quantity": 20,
      "photo": "https://5.imimg.com/data5/SELLER/Default/2022/9/MC/YS/TK/3233093/greaves-piston-ring-set-500x500.jpg"
    },
    {
      "name": "Power Steering Pump",
      "code": "AC038",
      "price": 41550.00,
      "quantity": 3,
      "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwRKaWESG7B1oxNKT2ppqB0w1HH827Af3C8Q&s"
    },
    {
      "name": "Radiator Fan",
      "code": "AC039",
      "price": 31000.00,
      "quantity": 7,
      "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-wqa9dYDledshgEbM9o-_CCcmfLOkaLHxQQ&s"
    }
  ]);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        await axios.get(`${serverHost}/api/getInventoryParts/${partsid}`);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchParts();
  }, []);



  // Use useEffect to log addedItem when it changes
  // useEffect(() => {
  //   if (addedItem) {
  //     console.log("Added item: ", addedItem);
  //   }
  // }, [addedItem]);

  const { setAddedItem } = useAuth();

  const handleAdd = (part) => {
    // Find the index of the part in the array
    const updatedParts = parts.map((p) => {
      if (p.id === part.id) {
        // Reduce the quantity by 1, ensuring it doesn't go below 0
        return { ...p, quantity: Math.max(p.quantity - 1, 0) };
      }
      return p;
    });

    // Update the parts array state
    setParts(updatedParts);

    // Optionally set the added item
    setAddedItem(part.code);

    console.log(setAddedItem);


    // Show success alert
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Item added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // const handleDelete = (code) => {
  //   const updatedParts = parts.map((part) => {
  //     if (part.code === code && part.quantity > ) {
  //       return { ...part, quantity: prt.quantity - 1 };
  //     }
  //     return part;
  //   });
  //   setParts(updatedParts);
  // };



  return (
    <div className="">
      <div className="mt-5">
        <Navbar />
      </div>
      <div className="pt-10 flex flex-wrap gap-5 justify-center">
        {parts.map((part) => (
          <div key={part.code} className="flex flex-col md:flex-row items-center justify-start gap-2 py-10 px-5 w-full mx-5 md:mx-0 md:w-max border hover:shadow-lg cursor-pointer rounded-xl">
            <div className="w-52 h-52">
              <img src={part.photo} alt={part.name} className="w-full h-full object-cover hover:scale-110" />
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="px-10">
                <p className="">{part.name}</p>
                <p>Code: {part.code}</p>
                {part.quantity === 0 ? (
                  <p className="bg-red-600 text-white text-center w-[120px] rounded">
                    Out of Stock
                  </p>
                ) : (
                  <p>Qty    : {part.quantity} pcs</p>
                )}
                <p>Price: Rs {part.price}</p>
              </div>
              <button className="px-4 py-2 w-full bg-red-500 rounded-full text-white" onClick={() => handleAdd(part)}>Add Item</button>
            </div>
            {/* <button onClick={() => handleDelete(part.code)}>Delete Item</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Store;
