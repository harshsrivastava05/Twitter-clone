import auth from "../../firebase.init"
import React, { useState } from "react";
import twittericon from "../../assets/images/twittericon.jpg";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";
import "../login/login.css"


export function Signup() {
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    const [fullname, setfullname] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    if (user || googleuser) {
        navigate('/')
        console.log(user)
        console.log(googleuser)
    }
    if (error || googleerror) {
        console.log(error.message)
        console.log(googleerror.message)
    }
    if (loading || googleloading) {
        console.log("loading...")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(email, password);
        } catch (err) {
            window.alert(err.message);
        }
    }
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        signInWithGoogle()
    };

    return (
        <>
            <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twittericon} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="">
                        <TwitterIcon className="Twittericon" style={{ color: "skyblue", marginLeft: '150px' }} />

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