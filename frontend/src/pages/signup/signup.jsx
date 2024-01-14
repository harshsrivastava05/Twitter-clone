import auth from "../../firebase.init"
import React, { useState } from "react";
import twittericon from "../../assets/images/twittericon.jpg";
import TwitterIcon from '@mui/icons-material/Twitter';
// import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";
import "../login/login.css"
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import { API_LINK } from "../../context/apilink";


export function Signup() {
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    const [fullname, setfullname] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const { googleSignIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            const user = {
                username: username,
                fullname: fullname,
                email: email,
                password:password
            }
           const res = await axios.post(`${API_LINK}/signup` , user);
           const data = res.data;
                console.log("data:", data);
                window.alert("user registered successfully")
                navigate('/login');

        } catch (err) {
            window.alert(err.message);
        }
    }
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
            console.log(error);
        }
    };

    return (
        <>
            <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twittericon} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="form-box">
                        <TwitterIcon className="Twittericon" />

                        <h2 className="heading">Happening now</h2>

                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>


                        {error && <p className="errorMessage">{error}</p>}
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                onChange={(e) => setusername(e.target.value)}
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setfullname(e.target.value)}
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setemail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setpassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton
                                className="g-btn"
                                type="light"
                                onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div>
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'skyblue',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
