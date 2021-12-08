import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";

const Auth = ({ authRoute }) => {
  // useEffect(() => loadUser(), [])

  return (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );
};

export default Auth;
