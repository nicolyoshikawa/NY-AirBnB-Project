import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SpotImages = () => {
    // const [previewImage, setPreviewImage] = useState("");
    // const [image1, setImage1] = useState("");
    // const [image2, setImage2] = useState("");
    // const [image3, setImage3] = useState("");
    // const [image4, setImage4] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const errors = {};
        if(!previewImage) errors["previewImage"] = "Preview image is required";
        if(previewImage) errors["previewImage"] = "Image URL must end in .png, .jpg, or .jpeg";
        if(image1) errors["image1"] = "Image URL must end in .png, .jpg, or .jpeg";
        if(image2) errors["image2"] = "Image URL must end in .png, .jpg, or .jpeg";
        if(image3) errors["image3"] = "Image URL must end in .png, .jpg, or .jpeg";
        if(image4) errors["image4"] = "Image URL must end in .png, .jpg, or .jpeg";
        setErrors(errors);
    }, [previewImage, image1, image2, image3, image4]);
    return(
        <>
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
        </>
    )
};

export default SpotImages;
