import twittericon from "../../assets/images/twittericon.jpg";
import TwitterIcon from '@mui/icons-material/Twitter';
import React, { useState } from "react";
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img className=" image" src={twittericon} alt="twitterImage" />
            </div>

            <div className="form-container">
                <div className="form-box" >
                    <TwitterIcon className="Twittericon" />
                    <h2 className="heading">Happening now</h2>
                    <div class="d-flex align-items-sm-center">
                        <h3 className="heading1"> Login now! </h3>
                    </div>

                    {error && <p>{error.message}</p>}
                    <form onSubmit={handleSubmit}>

                        <input
                            type="email" className="email"
                            placeholder="Email address"
                            onChange={(e) => setemail(e.target.value)}
                        />



                        <input className="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setpassword(e.target.value)}
                        />


                        <div className="btn-login">
                            <button type="submit" className="btn" >Log In</button>
                        </div>
                    </form>
                    <hr />
                    <div>
                        <GoogleButton

                            className="g-btn"
                            type="light"

                            onClick={handleGoogleSignIn}
                        />


                    </div>
                </div>
                <div style={{
                    color:'black'
                }}>
                    Don't have an account?
                    <Link
                        to="/signup"
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                    >
                        Sign up
                    </Link>
                </div>

            </div>


        </div>
    )
}

export default Login;
