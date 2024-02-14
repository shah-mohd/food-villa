import { useState } from "react";

const User = ({name, location}) => {

    const [count, setCount] = useState(0);

    return(
        <div className="user-card">
            <h1>Count : {count}</h1>
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @shah</h4>
        </div>
    );
}

export default User;