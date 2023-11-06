// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <div className="w-full h-20 flex items-center" style={{backgroundColor:"li"}}>
//       <h1 className="pl-8 text-3xl font-bold">POWER OF REACT</h1>
//       <div className="ml-auto pr-8">
//         <Link to="/">
//           <button className="pr-8 ">Home</button>
//         </Link>
//         <Link to="/location">
//           <button className="pr-8">Location</button>
//         </Link>
//         <Link to="/food">
//           <button className="pr-8">Food</button>
//         </Link>
//         <Link to="/conduct">
//           <button className="pr-8">Code of Conduct</button>
//         </Link>
//         <Link to="/schedule">
//           <button className="pr-8">Schedule</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Header;

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-20 bg-[lightcoral] flex items-center">
      <h1 className="pl-8 text-3xl font-bold">POWER OF REACT</h1>
      <div className="ml-auto pr-8">
        <Link to="/">
          <button className="pr-8">Home</button>
        </Link>
        <Link to="/location">
          <button className="pr-8">Location</button>
        </Link>
        <Link to="/food">
          <button className="pr-8">Food</button>
        </Link>
        <Link to="/conduct">
          <button className="pr-8">Code of Conduct</button>
        </Link>
        <Link to="/schedule">
          <button className="pr-8">Schedule</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
