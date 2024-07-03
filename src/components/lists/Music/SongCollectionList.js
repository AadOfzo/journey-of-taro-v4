import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SongContainer, SongListContainer, ImageContainer, Image } from './styles.SongCollectionList';
import ImageForm from "../../forms/imageForm/ImageForm";

function SongCollectionList() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            console.log('Response from backend:', response.data);
            setCollections(response.data);
        } catch (error) {
            console.error('Error fetching collections!', error);
        }
    };

    const renderImage = (collection) => {
        if (collection.imageUrl) {
            return <Image src={collection.imageUrl} alt="Collection Image" />;
        } else {
            return <ImageForm onImageUploaded={(uploadedImage) => handleImageUploaded(uploadedImage, collection.id)} />;
        }
    };

    const handleImageUploaded = (uploadedImage, collectionId) => {
        // Update the collection with the new image URL
        setCollections(prevCollections =>
            prevCollections.map(collection =>
                collection.id === collectionId ? { ...collection, imageUrl: uploadedImage } : collection
            )
        );
    };

    const toggleSongDetails = (id) => {
        setCollections(prevCollections => {
            return prevCollections.map(collection => {
                if (collection.id === id) {
                    return { ...collection, expanded: !collection.expanded };
                } else {
                    return collection;
                }
            });
        });
    };

    return (
        <SongContainer>
            <h2>Song Collections</h2>
            {collections.map((collection) => (
                <div key={collection.id}>
                    <SongListContainer>
                        <h3 onClick={() => toggleSongDetails(collection.id)}>{collection.songCollectionTitle}</h3>
                        {collection.expanded && (
                            <>
                                <ul>
                                    <ImageContainer>
                                        {renderImage(collection)}
                                    </ImageContainer>
                                </ul>
                                <ul>
                                    {collection.songIds.map((song) => (
                                        <li key={song.id}>{song.songTitle}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </SongListContainer>
                </div>
            ))}
        </SongContainer>
    );
}

export default SongCollectionList;
