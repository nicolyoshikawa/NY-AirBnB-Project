import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
// import SpotImages from "../Images/SpotImage.js";
import "./Spots.css";

const CreateNewSpot = () => {
    const user = useSelector(state => state.session.user);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    // const [previewImage, setPreviewImage] = useState("");
    // const [image1, setImage1] = useState("");
    // const [image2, setImage2] = useState("");
    // const [image3, setImage3] = useState("");
    // const [image4, setImage4] = useState("");

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const errors = {};
        if(!country) errors["country"] = "Country is required";
        if(!address) errors["address"] = "Address is required";
        if(!city) errors["city"] = "City is required";
        if(!state) errors["state"] = "State is required";
        if(!name) errors["name"] = "Name is required";
        if(!price) errors["price"] = "Price is required";
        setErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {address, city, state, country, lat, lng, name, description, price, ownerId: user.id};
        // console.log(newSpot)
        setErrors({});
        const spot = await dispatch(spotActions.createNewSpot(newSpot))
        .catch(async (res) => {
            const data = await res.json();
            console.log("data", data)
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
        if(spot){
            console.log("spot", spot)
            reset();
            <Redirect to={`/spots/${spot.id}`}/>;
        };
    };

    const reset = () => {
        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setLat('');
        setLng('');
        setName('');
        setDescription('');
        setPrice('');
    };

    return (
        <div className="newSpotFormPage">
            <form onSubmit={handleSubmit} className="newSpotForm form">
                <h2 className="newSpotForm">Create A New Spot</h2>
                {errors.length > 0 && errors.map(el => (
                    <div key={el} className="errors">{el}</div>
                ))}
                <div className="section">
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>Country
                    {errors.country && <div className="errors">{errors.country}</div>}
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                placeholder='Country'
                                name='country'
                                className="input-box"
                            />
                        </div>
                    </label>
                    <label>Street Address
                    {errors.address && <div className="errors">{errors.address}</div>}
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                placeholder='Address'
                                name='address'
                                className="input-box"
                            />
                        </div>
                    </label>
                    <label>City
                    {errors.city && <div className="errors">{errors.city}</div>}
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                placeholder='City'
                                name='city'
                                className="input-box"
                            />,
                        </div>
                    </label>
                    <label>State
                    {errors.state && <div className="errors">{errors.state}</div>}
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                placeholder='STATE'
                                name='state'
                                className="input-box"
                            />
                        </div>
                    </label>
                    <label>Latitude
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setLat(e.target.value)}
                                value={lat}
                                placeholder='Latitude'
                                name='latitude'
                                className="input-box"
                            />,
                        </div>
                    </label>
                    <label>Longitude
                        <div>
                            <input
                                type='text'
                                onChange={(e) => setLng(e.target.value)}
                                value={lng}
                                placeholder='Longitude'
                                name='longitude'
                                className="input-box"
                            />
                        </div>
                    </label>
                </div>

                <div className="section">
                <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities
                        like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name='body'
                            placeholder='Please write at least 30 characters'
                            className="input-box"
                        />
                        {errors.description && <div className="errors">{errors.description}</div>}
                </div>
                <div className="section">
                <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Name of your spot'
                        name='name'
                        className="input-box"
                    />
                    {errors.name && <div className="errors">{errors.name}</div>}
                </div>
                <div className="section">
                <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <label>$
                        <input
                            type='text'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price per night (USD)'
                            name='price'
                            className="input-box"
                        />
                    </label>
                </div>
                <div className="section">
                    {/* <SpotImages/> */}
                </div>
            <button type='submit' className="createSpotButton">Create Spot</button>
            </form>
        </div>
    )
};

export default CreateNewSpot;
