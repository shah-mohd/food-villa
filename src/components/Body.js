import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = ()=> {
    //hookes -- useState()
    // Local State Variable -Super powerful variable
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    // Whenever state variables update, react triggers a reconciliation cycle(re-renders the components)
    // console.log("Body Rendered");
    // console.log(listOfRestaurant);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async ()=>{
        // const data = await fetch(
        //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        // );

        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json);
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // console.log(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) return ( <h1>You're offline</h1>);

    const {loggedInUser, setUserName} = useContext(UserContext);

    // console.log(listOfRestaurant.length);
    return listOfRestaurant.length === 0 ? (
        <Shimmer/>
    ) : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input
                        type="text"
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value)
                            }
                        }
                    />
                    <button className="px-4 py-2 m-4 bg-green-100 rounded-lg"
                        onClick={()=>{
                        //Filter the restraunt cards and update the UI
                        //searchText
                        // console.log(searchText);
                        const filteredRestaurant = listOfRestaurant.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestaurant(filteredRestaurant);
                    }}>Search</button>
                </div>

                <div className="search m-4 p-4 flex items-center">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={()=>{
                      filteredRes = listOfRestaurant.filter(
                          (res) => res.info.avgRating >= 4
                     );
                     setFilteredRestaurant(filteredRes);
                 }}>Top Rated Restaurants</button>
                </div>               

                <div className="search m-4 p-4 flex items-center">
                <label>Username : </label>
                <input className="border border-black p-2" 
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value) } />
            </div>

            </div>

            <div className="flex flex-wrap">
                {filteredRestaurant.map((restaurant) =>(
                    // <RestaurantCard resData={restaurant} key={restaurant.data.id}/>
                    <Link 
                        to={"/restaurants/" + restaurant.info.id} 
                        key={restaurant.info.id} >

                            {/* if the restaurant is promoted then add a promoted label to it */}
                            {restaurant.info.isOpen ? (
                                <RestaurantCardPromoted resData={restaurant} />
                            ):(
                                <RestaurantCard resData={restaurant} />
                            )}
                            {/* <RestaurantCard resData={restaurant} /> */}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Body;