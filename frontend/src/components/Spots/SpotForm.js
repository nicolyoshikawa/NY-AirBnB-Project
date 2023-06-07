import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as imageActions from "../../store/images";
import "./Spots.css";

const SpotForm = () => {
    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const spotsObj = useSelector(state => state.spots);
    const history = useHistory();
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [previewImage, setPreviewImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    const [errors, setErrors] = useState({});
    const imgArr = [];
    let spot;

    if(spotId){
        console.log(spotsObj)
        spot = spotsObj[spotId];
        // ({address, city, state, country, lat, lng, name, description, price, ownerId} = spot);
        console.log(spot)
    }

    useEffect(() => {
        const errors = {};
        if(!country) errors["country"] = "Country is required";
        if(!address) errors["address"] = "Address is required";
        if(!city) errors["city"] = "City is required";
        if(!state) errors["state"] = "State is required";
        if(!name) errors["name"] = "Name is required";
        if(!price) errors["price"] = "Price is required";
        if(!lat) errors["lat"] = "Latitude is required";
        if(!lng) errors["price"] = "Longitude is required";
        if(!description) errors["description"] = "Description is required";

        if(!previewImage) errors["previewImage"] = "Preview image is required";
        if(previewImage && (!previewImage.endsWith(".png") &&
            !previewImage.endsWith(".jpg") && !previewImage.endsWith(".jpeg"))) {
            errors["previewImage"] = "Image URL must end in .png, .jpg, or .jpeg";
        }
        if(image1 && (!image1.endsWith(".png") &&
            !image1.endsWith(".jpg") && !image1.endsWith(".jpeg"))) {
            errors["image1"] = "Image URL must end in .png, .jpg, or .jpeg";
        }
        if(image2 && (!image2.endsWith(".png") &&
            !image2.endsWith(".jpg") && !image2.endsWith(".jpeg"))) {
            errors["image2"] = "Image URL must end in .png, .jpg, or .jpeg";
        }
        if(image3 && (!image3.endsWith(".png") &&
            !image3.endsWith(".jpg") && !image3.endsWith(".jpeg"))) {
            errors["image3"] = "Image URL must end in .png, .jpg, or .jpeg";
        }
        if(image4 && (!image4.endsWith(".png") &&
            !image4.endsWith(".jpg") && !image4.endsWith(".jpeg"))) {
            errors["image4"] = "Image URL must end in .png, .jpg, or .jpeg";
        }
        setErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price, previewImage, image1, image2, image3, image4]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {address, city, state, country, lat, lng, name, description, price, ownerId: user.id};
        const images = [];

        if(previewImage) images.push({ url: previewImage, preview: true });
        if(image1) images.push({ url: image1, preview: false });
        if(image2) images.push({ url: image2, preview: false });
        if(image3) images.push({ url: image3, preview: false });
        if(image4) images.push({ url: image4, preview: false });

        setErrors({});
        const spot = await dispatch(spotActions.createNewSpot(newSpot))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

        for( let i = 0; i < images.length; i++){
            const img = images[i]
            const newImg = await dispatch(imageActions.newSpotImage(spot, img))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })
            imgArr.push(newImg)
        }

        if(spot && imgArr.length === images.length){
            reset();
            history.push(`/spots/${spot.id}`);
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
        setErrors({});
    };

    return (
        <div className="newSpotFormPage">
            <form onSubmit={handleSubmit} className="newSpotForm form">
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
                        {errors.lat && <div className="errors">{errors.lat}</div>}
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
                        {errors.lng && <div className="errors">{errors.lng}</div>}
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
                    <p>Mention the best features of your space, any special amenities
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
                <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type='text'
                        onChange={(e) => setPreviewImage(e.target.value)}
                        value={previewImage}
                        placeholder='Preview Image URL'
                        name='image'
                        className="input-box"
                    />
                    {errors.previewImage && <div className="errors">{errors.previewImage}</div>}
                    <input
                        type='text'
                        onChange={(e) => setImage1(e.target.value)}
                        value={image1}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {errors.image1 && <div className="errors">{errors.image1}</div>}
                    <input
                        type='text'
                        onChange={(e) => setImage2(e.target.value)}
                        value={image2}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {errors.image2 && <div className="errors">{errors.image2}</div>}
                    <input
                        type='text'
                        onChange={(e) => setImage3(e.target.value)}
                        value={image3}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {errors.image3 && <div className="errors">{errors.image3}</div>}
                    <input
                        type='text'
                        onChange={(e) => setImage4(e.target.value)}
                        value={image4}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {errors.image4 && <div className="errors">{errors.image4}</div>}
                </div>
            <button type='submit' className="createSpotButton" disabled={Object.values(errors).length > 0}>Create Spot</button>
            </form>
        </div>
    )
};

export default SpotForm;
