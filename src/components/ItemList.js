import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../utils/constants";

const ItemList = ({items}) => {
    
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        // Dispatch an action
        dispatch(addItem(item));
    }
    return (
        <div>
            {items.map((item) => (
            <div 
                key={item.card.info.id}
                className="m-2 p-2 border-gray-300 border-b-2 text-left flex justify-between"
                >
                    <div className="w-10/12">
                <div className="py-2">
                    <span>{item.card.info.name}</span>
                    <span> - ₹ {item.card.info.price 
                        ? item.card.info.price / 100
                        : item.card.info.defaultPrice / 100    
                    }</span>
                </div>
                <p className="text-xs">{item.card.info.description}</p>
                </div>
                <div className="w-2/12">
                <div className="absolute">
                    <button 
                    className="p-2 mx-4 rounded-lg bg-black text-white shadow-lg"
                    onClick={() => handleAddItem(item)}
                    >
                        Add +
                    </button>
                </div>
                    {item.card.info.imageId ? <img src={ IMG_CDN_URL + item.card.info.imageId} /> : console.log("imageId not found")}
                {/* <img src={ IMG_CDN_URL + item.card.info.imageId} /> */}
                </div>
            </div>
            ))}
        </div>
    )
}

export default ItemList;