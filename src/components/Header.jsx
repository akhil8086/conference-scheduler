
import { Link } from "react-router-dom";


function Header() {
  return (
    <div className="w-full h-20 bg-[lightcoral] flex items-center">
      <h1 className="pl-8 text-3xl font-bold">CONFERENCE SCHEDULER</h1>
      <div className="ml-auto pr-8">
        <Link to="/">
          <button className="pr-8">Home</button>
        </Link>
        <Link to="/location">
          <button className="pr-8">Location</button>
        </Link>
        
      </div>
    </div>
  );
}

export default Header;
