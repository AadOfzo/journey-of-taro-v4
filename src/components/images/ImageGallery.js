import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            setImages(response); // Assuming response is directly the array of images
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const getImageSrc = (image) => {
        return `data:${image.mimeType};base64,${image.imageData}`;
    };

    return (
        <div className="image-gallery">
            <h2>Image Gallery</h2>
            <div className="gallery">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img
                            src={getImageSrc(image)}
                            alt={image.imageAltName || image.imageName}
                            className="gallery-image"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <div className="image-info">
                            {/*<h4>{image.imageName}</h4>*/}
                            {/* Add additional information as needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
