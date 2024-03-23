import {Link} from "react-router-dom";

const Home = () => {
    //const todayNameDay = nameday.today("hu");

    return (
        <div>
            <div>
                Welcome to Calendar
            </div>
            <Link to="/register">Register</Link><br/>
            <Link to="/login">Login</Link><br/>
            <Link to="/createCalendar">Create a new Calendar</Link>
            <div>Todays nameday:</div>
        </div>
    )
}

export default Home