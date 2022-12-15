import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './style.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { Modal, MaterialInput, MaterialButton, DropdownMenu } from '../MaterialUI';
import { login, logout, getCartItems, signup as _signup } from '../../actions';
import Cart from "../UI/Cart";

export default function Header() {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState('test01@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState("");
  const auth = useSelector(state => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);
  
  const submitLoginForm = function(e) {
    if (signup) {
      userSignup();
    } else {
      console.log('123');
      dispatch(login({
        email: email,
        password: password
      }));
    }

  }

  const userSignup = () => {
    const user = { firstname, lastname, email, password };
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    console.log(user);
    dispatch(_signup(user));
  };

  const handleLogout = function(e) {
    // console.log('123');
    dispatch(logout());
  }

  const handleOrder = function(e) {
    !auth.authenticate && setLoginModal(true);
    auth.authenticate && navigate('/account/orders');
  }
    

  const renderLoggedInMenu = function() {
    return (
      <DropdownMenu
        menu={
          <a className='fullname'>
            {auth.user.firstName} {auth.user.lastName}
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'SuperCoin Zone', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '/account/orders', icon: null, onClick: handleOrder },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'My Chats', href: '', icon: null },
          { label: 'Coupons', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Notifications', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
          { label: 'Logout', href: '', icon: null, onClick: handleLogout },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a style={{ color: '#2874f0', cursor: 'pointer' }}>Sign Up</a>
          </div>
        }
      />
    );
  }

  const renderNonLoggedInMenu = function() {
    return (
      <DropdownMenu
        menu={
          <a 
            className="loginButton" 
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '/account/orders', icon: null, onClick: handleOrder },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }} 
              style={{ color: '#2874f0', cursor: 'pointer' }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  }

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {/* <div>{JSON.stringify(auth)}</div> */}
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onclick={submitLoginForm}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo */}
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* Logo ends here */}

        {/* Search component */}
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        {/* Search component ends here */}

        {/* Right side menu */}
        <div className="rightMenu">
          {
            auth.authenticate ?
            renderLoggedInMenu() :
            renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <Link to={`/cart`} className="cart">
              {/* <IoIosCart /> */}
              <Cart count={Object.keys(cart.cartItems).length} />
              <span  style={{ margin: '0 10px' }}>Cart</span>
            </Link>
          </div>
        </div>
        {/* Right side menu ends here */}

      </div>
    </div>
  )

}
