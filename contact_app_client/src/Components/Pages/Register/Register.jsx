import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { GiEnergyArrow } from 'react-icons/gi';
import Swal from 'sweetalert2';
import '../../Styles/login.css';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Transition from '../../Transition/Transition';

// eslint-disable-next-line react-refresh/only-export-components
const Register = () => {
  const { registerUser, googleSignIn, facebookSignIn } =
    useContext(AuthContext);
  const [errorRegi, setErrorRegi] = useState('');
  const [successRegi, setSuccessRegi] = useState('');
  const naviGate = useNavigate();

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then(result => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        Swal.fire({
          imageUrl: `https://i.ibb.co/H4HnLmL/yippee-yay.gif`,
          title: 'WOOHOOO!!!! Welcome To The World!!!!',
          width: 600,
          padding: '3em',
          color: '#7CFC00',
          background: '#fff url()',
          backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
        });
        console.log(result.user);
        naviGate(location?.state ? location.state : '/');
      })
      .catch(error => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        Swal.fire({
          imageUrl: `https://i.ibb.co/H4HnLmL/yippee-yay.gif`,
          title: 'WOOHOOO!!!! Welcome To The World!!!!',
          width: 600,
          padding: '3em',
          color: '#7CFC00',
          background: '#fff url()',
          backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
        });
        naviGate('/login');
        console.log(result.user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRegister = e => {
    setErrorRegi('');
    setSuccessRegi('');

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    console.log(email, name, password);

    if (password.length < 6) {
      Swal.fire({
        imageUrl: `https://i.ibb.co/hfQtDDz/piffle-error.gif`,
        title: 'Password should be at least 6 characters long.',
        width: 600,
        padding: '3em',
        color: '#C70039 ',
        background:
          '#fff url(https://i.ibb.co/nfmHX3X/depositphotos-182476906-stock-illustration-holographic-vector-backgrounds.webp)',
        backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        imageUrl: `https://i.ibb.co/hfQtDDz/piffle-error.gif`,
        title: 'Password should contain at least one uppercase character.',
        width: 600,
        padding: '3em',
        color: '#C70039 ',
        background:
          '#fff url(https://i.ibb.co/nfmHX3X/depositphotos-182476906-stock-illustration-holographic-vector-backgrounds.webp)',
        backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
      });
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Swal.fire({
        imageUrl: `https://i.ibb.co/hfQtDDz/piffle-error.gif`,
        title: 'Password should contain at least one special character.',
        width: 600,
        padding: '3em',
        color: '#C70039 ',
        background:
          '#fff url(https://i.ibb.co/nfmHX3X/depositphotos-182476906-stock-illustration-holographic-vector-backgrounds.webp)',
        backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
      });
      return;
    }

    registerUser(email, password)
      .then(result => {
        console.log(result);
        Swal.fire({
          imageUrl: `https://i.ibb.co/H4HnLmL/yippee-yay.gif`,
          title: 'WOOHOOO!!!! Welcome To The World!!!!',
          width: 600,
          padding: '3em',
          color: '#7CFC00',
          background: '#fff url()',
          backdrop: `
    rgba(0,0,123,0.4)
    top
    no-repeat
  `,
        });
        naviGate('/login');
        setSuccessRegi();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 form-container w-full max-w-sm shadow-lg ">
            <form onSubmit={handleRegister} className="card-body">
              <p class="title">Register</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered"
                  required
                  name="email"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn form-btn">Register</button>
              </div>
              <div>
                <p class="sign-up-label mt-2">
                  Already Have an Account?
                  <Link to="/login">
                    <span class="sign-up-link">Login</span>
                  </Link>
                </p>
              </div>

              {/* {
                <p className="text-black">
                  Already Have An Account? Please{' '}
                  <Link className="font-bold text-blue-700" to="/login">
                    Login
                  </Link>
                </p>
              } */}

              <div className="buttons-container" onClick={handleGoogleSignIn}>
                <div class="google-login-button">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    class="google-icon"
                    viewBox="0 0 48 48"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span>Sign in with Google</span>
                </div>
              </div>
            </form>
            {errorRegi && (
              <p className="text-center text-red-500">{errorRegi}</p>
            )}
            {successRegi && <p className="text-green-500">{successRegi}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Transition(Register);
