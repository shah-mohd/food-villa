import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = ()=>{
    const [btnNameReact, setBtnNameReact] = useState("LogIn");

    const onlineStatus = useOnlineStatus();

    const data = useContext(UserContext);
    const {loggedInUser} = data;

    // Subscribing to the store using a Selector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    //if no dependency array => useEffect is called on every render
    //if dependency array is empty = [] => useEffect is called on initial render(just once)
    //if dependency array is [btnNameReact] => called everytime btnNameReact is updated
    // useEffect(()=>{
    //     console.log("useEffect Called");
    // }, [btnNameReact]);

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg">
            <div className="logo-container">
                <img 
                src={LOGO_URL}
                alt="Logo"
                className="w-36"
                />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status : {onlineStatus ? "🟢" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to="/cart">Card - ({cartItems.length} items)</Link>
                    </li>
                    <button className="login" onClick={()=>{
                        btnNameReact === "LogIn"
                            ? setBtnNameReact("LogOut")
                            : setBtnNameReact("LogIn")
                        }}
                    >
                        {btnNameReact}
                    </button>

                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
}

export default Header;