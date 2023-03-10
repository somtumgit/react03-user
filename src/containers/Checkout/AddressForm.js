import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddress, getCartItems } from "../../actions";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";

export default function AddressForm(props) {
    const { initialData, disableAddressEditForm, disableNewAddressEditForm, selectAddress } = props;
    const auth = useSelector((state) => state.auth);
    const [name, setName] = useState(initialData ? initialData.name : "");
    const [phone, setPhone] = useState(
        initialData ? initialData.phone : ""
    );
    const [pinCode, setPinCode] = useState(
        initialData ? initialData.pinCode : ""
    );
    const [locality, setLocality] = useState(
        initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
        initialData ? initialData.address : ""
    );
    const [cityDistrictTown, setCityDistrictTown] = useState(
        initialData ? initialData.cityDistrictTown : ""
    );
    const [state, setState] = useState(initialData ? initialData.state : "");
    const [landmark, setLandmark] = useState(
        initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
        initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
        initialData ? initialData.addressType : ""
    );
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");

    const inputContainer = {
        width: "100%",
        marginRight: 10,
    };

    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name,
                phone,
                pinCode,
                locality,
                address,
                cityDistrictTown,
                state,
                landmark,
                alternatePhone,
                addressType,
            },
        };
        // console.log('payload',payload);
        if (id) {
            payload.address._id = id;
        }

        console.log('onAddressSubmit',initialData);
        if(initialData) {
            dispatch(addAddress(payload));
            disableAddressEditForm(initialData);
            selectAddress(initialData);
        }else if(initialData == null) {
            // console.log('123');
            // console.log(disableNewAddressEditForm);
            dispatch(addAddress(payload));
            disableNewAddressEditForm();
        }
        
        
        // setSubmitFlag(true);
    };


    useEffect(() => {
        console.log("addressCount", user.address);
        if (submitFlag) {
        console.log("where are we", user);
        let _address = {};
        if (id) {
            _address = {
            _id: id,
            name,
            phone,
            pinCode,
            locality,
            address,
            cityDistrictTown,
            state,
            landmark,
            alternatePhone,
            addressType,
            };
        } else {
            _address = user.address.slice(user.address.length - 1)[0];
        }

        props.onSubmitForm(_address);
        }
    }, [user.address]);

    const renderAddressForm = () => {
        return (
        <>
            {/* <div>
                {JSON.stringify(initialData)}
            </div> */}
            <div className="flexRow">
                <div style={inputContainer}>
                    <MaterialInput
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={inputContainer}>
                    <MaterialInput
                    label="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="flexRow">
            <div style={inputContainer}>
                <MaterialInput
                label="Pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                />
            </div>
            <div style={inputContainer}>
                <MaterialInput
                label="Locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                />
            </div>
            </div>
            <div className="flexRow">
            <div style={inputContainer}>
                <MaterialInput
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            </div>

            <div className="flexRow">
                <div style={inputContainer}>
                    <MaterialInput
                    label="City/District/Town"
                    value={cityDistrictTown}
                    onChange={(e) => setCityDistrictTown(e.target.value)}
                    />
                </div>
                <div style={inputContainer}>
                    <MaterialInput
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                </div>
            </div>
            <div className="flexRow">
                <div style={inputContainer}>
                    <MaterialInput
                    label="Landmark (Optional)"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    />
                </div>
                <div style={inputContainer}>
                    <MaterialInput
                    label="Alternate Phone (Optional)"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <label>Address Type</label>
                <div className="flexRow">
                    <div style={{width:'100%',marginRight:'10px'}}>
                        <input
                            type="radio"
                            onClick={() => setAddressType("home")}
                            name="addressType"
                            value="home"
                            onChange={() => {}}
                            checked={addressType==='home'?true:false}
                        />
                        <span>Home</span>
                    </div>
                    <div style={{width:'100%',marginRight:'10px'}}>
                        <input
                            type="radio"
                            onClick={() => setAddressType("work")}
                            name="addressType"
                            value="work"
                            onChange={() => {}}
                            checked={addressType==='work'?true:false}
                        />
                        <span>Work</span>
                    </div>
                </div>
            </div>
            <div className="flexRow">
                <MaterialButton
                    title="SAVE AND DELIVER HERE"
                    // onclick={onAddressSubmit}
                    onclick={onAddressSubmit}
                    style={{
                    width: "250px",
                    margin: "20px 0",
                    }}
                />
            </div>
        </>
        );
    };

    if (props.withoutLayout) {
        return <div>{renderAddressForm()}</div>;
    }


    return (
        <div className="checkoutStep" style={{ background: "#f5faff" }}>
            <div className={`checkoutHeader`}>
                <div>
                    <span className="stepNumber">+</span>
                    <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
                </div>
            </div>
            <div
                style={{
                padding: "0 60px",
                paddingBottom: "20px",
                boxSizing: "border-box",
                }}
            >
                {renderAddressForm()}
            </div>
        </div>
    )
}
