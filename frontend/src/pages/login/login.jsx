.login-container {
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
}

.form-container {
  flex: 1;
  padding: 50px;
  margin: 10px;
  /* margin-left: -50px; */
  align-content: center;
}

.form-box {
  justify-content: left;
  align-items: inherit;
  grid-row: auto;
}

.Twittericon {
  color: skyblue;
  margin-left: 50%;
  /* max-width: 50%; */
  /* display: flex; */
}

.input-form {
  width: 20px;
}

.heading,
h1 {
  font-size: 50px;
  color: rgba(0, 0, 0, 0.829);
}

.heading1,
h3 {
  font-size: 35px;
  color: rgba(0, 0, 0, 0.808);

  justify-content: end;
}

.image-container {
  flex: 2;
  margin-left: -100px;
}

.image {
  max-width: 100%;
  height: 100%;
  /* margin-left: -50px; */
}

input {
  display: grid;
  margin-bottom: 1px;
  padding: 5px;
  background-color: white;
  margin-top: 20px;
  color: black;
  font-size: medium;
  font-weight: 500;
}

.email,
.password {
  background-color: #e8f0fe;
  width: 70%;
  border-radius: 8px;
  padding: 14px;
  border: none;
  outline: none;
}

.display-name {
  background-color: #e8f0fe;
  width: 70%;
  border-radius: 8px;
  padding: 14px;
  border: none;
  outline: none;
}

.btn-login {
  padding: 7px;
}

.btn {
  background-color: rgb(92, 199, 241);
  width: 75%;
  margin-right: 20px;
  padding: 14px;
  border-radius: 8px;
  font-size: 17px;
  border: none;
  outline: none;
  margin-bottom: 20px;
  margin-top: 15px;
}

.g-btn {
  border: 1px solid;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 15px !important;
  width: 70% !important;
  margin: 10px;
}

.google-button {
  margin-top: 5%;
}

.g-btn > div,
.g-btn > div > svg {
  height: 30px !important;
}

.errorMessage {
  color: red;
  font-weight: 500;
  margin: 10px 0;
}

.signUpText > Link {
  text-decoration: none;
  color: var(--twitter-color) !important;
}

@media screen and (max-width: 688px) {
  .login-container {
    order: 2;
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }

  .form-container {
    padding: 10px;
  }

  .image-container {
    width: 100%;
    vertical-align: text-bottom;
    display: flex;
    flex-direction: column-reverse;
    order: 1;
    max-width: 100%;
    width: 100%;
  }

  .image {
    order: 2;
    width: 100%;
    height: 100%;
    margin-left: 100px;
  }
}
