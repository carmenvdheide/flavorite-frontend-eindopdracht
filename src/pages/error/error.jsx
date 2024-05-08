import "./error.css"
import {Link} from "react-router-dom";

function Error() {
    return <>
        <div className="error-page">
            <p>Sorry, the page you are looking for could not be found... Please check the URL and try again.</p>
            <Link to="/">Go to the homepage</Link>        </div>

           </>
}

export default Error