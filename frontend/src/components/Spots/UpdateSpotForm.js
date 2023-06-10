import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as imageActions from "../../store/images";
import "./SpotForm.css";

const UpdateSpotForm = () => {
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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const imgArr = [];
    let spot;

    useEffect(()=> {
        dispatch(spotActions.loadSpotById(spotId))
        .then((spotObj)=>{
            setCountry(spotObj.country);
            setAddress(spotObj.address);
            setCity(spotObj.city);
            setState(spotObj.state);
            setLat(spotObj.lat);
            setLng(spotObj.lng);
            setName(spotObj.name);
            setDescription(spotObj.description);
            setPrice(spotObj.price);
            setPreviewImage(spotObj.previewImage)
        })
    },[dispatch, spotId, spot?.country, spot?.address, spot?.city, spot?.state, spot?.lat, spot?.lng, spot?.name, spot?.description, spot?.price, spot?.previewImage]);

    spot = spotsObj[spotId];

    useEffect(() => {
            const errors = {};
            if(!country) errors["country"] = "Country is required";
            if(!address) errors["address"] = "Address is required";
            if(!city) errors["city"] = "City is required";
            if(!state) errors["state"] = "State is required";
            if(!name) errors["name"] = "Name is required";
            if(!price) errors["price"] = "Price is required";
            if(!lat) errors["lat"] = "Latitude is required";
            if(!lng) errors["lng"] = "Longitude is required";
            if(!description) errors["description"] = "Description is required";
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
    }, [address, city, state, country, lat, lng, name, description, price, previewImage, image1, image2, image3, image4, hasSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const updatedSpot = {address, city, state, country, lat, lng, name, description, price, ownerId: user.id, id: +spotId};
        const images = [];
        if(previewImage) images.push({ url: previewImage, preview: true });
        if(image1) images.push({ url: image1, preview: false });
        if(image2) images.push({ url: image2, preview: false });
        if(image3) images.push({ url: image3, preview: false });
        if(image4) images.push({ url: image4, preview: false });

        if(Object.values(errors).length === 0){
            const spot = await dispatch(spotActions.updateASpot(updatedSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });

            if(images.length > 0){
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
            }

            if(spot && imgArr.length === images.length){
                reset();
                history.push(`/spots/${spot.id}`);
                setErrors({});
            };
        }
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
            <h2 className="newSpotForm">Update Your Spot</h2>
                {hasSubmitted && errors.length > 0 && errors.map(el => (
                    <span key={el} className="errors">{el}</span>
                ))}

                    <h3>Where's your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                <div className="section1">
                    <label className="country">Country
                    {hasSubmitted && errors.country && <span className="errors">{errors.country}</span>}
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
                    <label className="address">Street Address
                    {hasSubmitted && errors.address && <span className="errors">{errors.address}</span>}
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
                    <div className="cityState">
                        <label>City
                        {hasSubmitted && errors.city && <span className="errors">{errors.city}</span>}
                            <div>
                                <input
                                    type='text'
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    placeholder='City'
                                    name='city'
                                    className="input-box"
                                />
                            </div>
                        </label>
                        <div className="cityState comma">,</div>
                        <label>State
                        {hasSubmitted && errors.state && <span className="errors">{errors.state}</span>}
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
                    </div>
                    <div className="latLng">
                        <label>Latitude
                            {hasSubmitted && errors.lat && <span className="errors">{errors.lat}</span>}
                            <div>
                                <input
                                    type='text'
                                    onChange={(e) => setLat(e.target.value)}
                                    value={lat}
                                    placeholder='Latitude'
                                    name='latitude'
                                    className="input-box"
                                />
                            </div>
                        </label>
                        <div className="latLng comma">,</div>
                        <label>Longitude
                            {hasSubmitted && errors.lng && <span className="errors">{errors.lng}</span>}
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
                </div>

                <div className="section"></div>
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
                        {hasSubmitted && errors.description && <span className="errors">{errors.description}</span>}
                <div className="section"></div>
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
                    {hasSubmitted && errors.name && <span className="errors">{errors.name}</span>}
                <div className="section"></div>
                <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div className="priceInput">
                        <div className="comma">$</div>
                            <input
                                type='text'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                placeholder='Price per night (USD)'
                                name='price'
                                className="input-box"
                            />
                        {hasSubmitted && errors.price && <span className="errors">{errors.price}</span>}
                    </div>
                <div className="section"></div>
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
                    {hasSubmitted && errors.previewImage && <span className="errors">{errors.previewImage}</span>}
                    <input
                        type='text'
                        onChange={(e) => setImage1(e.target.value)}
                        value={image1}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {hasSubmitted && errors.image1 && <span className="errors">{errors.image1}</span>}
                    <input
                        type='text'
                        onChange={(e) => setImage2(e.target.value)}
                        value={image2}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {hasSubmitted && errors.image2 && <span className="errors">{errors.image2}</span>}
                    <input
                        type='text'
                        onChange={(e) => setImage3(e.target.value)}
                        value={image3}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {hasSubmitted && errors.image3 && <span className="errors">{errors.image3}</span>}
                    <input
                        type='text'
                        onChange={(e) => setImage4(e.target.value)}
                        value={image4}
                        placeholder='Image URL'
                        name='image'
                        className="input-box"
                    />
                    {hasSubmitted && errors.image4 && <span className="errors">{errors.image4}</span>}
            <div className="section"></div>
            <button type='submit'>Update Your Spot</button>
            </form>
        </div>
    )
};

export default UpdateSpotForm;
