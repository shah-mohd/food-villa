import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                // avatar_url: "https://dummy-photo",
            }
        };

        // console.log("Child Constructor");
    }

    async componentDidMount(){
        // console.log("Child Component Did Mount");
        // api call

        const data = await fetch("https://api.github.com/users/shah-mohd");
        // const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }


    render() {
        
        // const {name, location, contact} = this.props; //desctructring 
        const {name, location, avatar_url} = this.state.userInfo;
        let contact = "@shah";

        // console.log("Child Render");
        // console.log(name, location);

        return (
            <div className="m-6 p-4 font-bold">
                <img className="my-4 w-[200px] rounded-xl"
                     src={avatar_url} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: {contact}</h4>
            </div>
        );
    }
}


export default UserClass;