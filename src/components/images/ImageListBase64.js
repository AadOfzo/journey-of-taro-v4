import React, { useState, useEffect } from "react";
import ApiService from "../../configs/utilities/axios/ApiService";
import ImageForm from "../forms/imageForm/ImageForm";
import {
    Container,
    PreviewImage,
    ImageListOuterContainer,
    ImageListInnerContainer,
    ImageListTitle,
    ImageLabel,
    ImageListItem,
    ImageName,
    ImageDeleteButton,
} from "../forms/imageForm/styles.ImageForm";

const ImageListBase64 = () => {
    const [images, setImages] = useState([]); // Initialize with an empty array

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            if (response && Array.isArray(response)) {
                setImages(response);
            } else {
                console.error('Unexpected response format:', response);
                setImages([]);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]); // Optionally set to an empty array on error
        }
    };

    const handleDelete = async (userId) => {
        try {
            await ApiService.deleteImage(userId);
            fetchImages(); // Refresh the image list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageUploaded = () => {
        fetchImages(); // Refresh the image list when a new image is uploaded
    };

    const getImageSrc = (image) => {
        let mimeType;
        const extension = image.imageName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpeg':
            case 'jpg':
                mimeType = 'image/jpeg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            default:
                mimeType = 'application/octet-stream';
                break;
        }
        return `data:${mimeType};base64,${image.imageData}`;
    };

    return (
        <Container>
            <ImageForm onImageUploaded={handleImageUploaded} /> {/* Include ImageForm and pass the callback */}
            <ImageListOuterContainer>
                <ImageListTitle>Image List</ImageListTitle>
                <ImageListInnerContainer>
                    {images.length > 0 ? (
                        images.map((image) => (
                            <ImageListItem key={image.imageId}>
                                <ImageLabel>
                                    <PreviewImage src={getImageSrc(image)} alt={image.imageAltName || image.imageName} />
                                    <ImageName>{image.imageName}</ImageName>
                                </ImageLabel>
                                <ImageDeleteButton onClick={() => handleDelete(image.imageId)}>Delete</ImageDeleteButton>
                            </ImageListItem>
                        ))
                    ) : (
                        <p>No images found</p>
                    )}
                </ImageListInnerContainer>
            </ImageListOuterContainer>
        </Container>
    );
};

export default ImageListBase64;
