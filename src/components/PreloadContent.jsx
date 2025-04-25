import { useEffect, useState } from 'react';

const PreloadContent = () => {
    const [heroBgImage, setHeroBgImage] = useState("");
    const [heroBgImageMobile, setHeroBgImageMobile] = useState("");    

    useEffect(() => {
        const apiPath = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/homedata`;
        fetch(apiPath)
            .then(response => response.json())
            .then(data => {
                setHeroBgImage(data.hero_background_image);
                setHeroBgImageMobile(data.hero_background_image_mobile);                
            })
            .catch(error => console.log(error));
    }, []);
    
    // Preloading hero images (desktop and mobile)
    useEffect(() => {
        const links = [];

        if (heroBgImage) {
            const linkDesktop = document.createElement('link');
            linkDesktop.rel = 'preload';
            linkDesktop.as = 'image';
            linkDesktop.href = heroBgImage;
            document.head.appendChild(linkDesktop);
            links.push(linkDesktop);
        }

        if (heroBgImageMobile) {
            const linkMobile = document.createElement('link');
            linkMobile.rel = 'preload';
            linkMobile.as = 'image';
            linkMobile.href = heroBgImageMobile;
            document.head.appendChild(linkMobile);
            links.push(linkMobile);
        }

        // Cleanup function to remove the preload links when the component unmounts
        return () => links.forEach(link => document.head.removeChild(link));
    }, [heroBgImage, heroBgImageMobile]);
    
    
    // Preconnecting to origins
    useEffect(() => {
        const wordpresBaseUrl = process.env.REACT_APP_SERVER_URL;
        const reactBaseUrl = process.env.REACT_APP_URL;
        const links = [];
    
        if (wordpresBaseUrl) {
            const wpLink = document.createElement('link');
            wpLink.rel = 'preconnect';
            wpLink.href = wordpresBaseUrl;
            wpLink.crossOrigin = 'anonymous'; // Include this for cross-origin requests
            document.head.appendChild(wpLink);
            links.push(wpLink);
        }
    
        if (reactBaseUrl) {
            const reactLink = document.createElement('link');
            reactLink.rel = 'preconnect';
            reactLink.href = reactBaseUrl;
            reactLink.crossOrigin = 'anonymous'; // Include this for cross-origin requests
            document.head.appendChild(reactLink);
            links.push(reactLink);
        }
    
        // Cleanup function
        return () => links.forEach(link => document.head.removeChild(link));
    }, []); // This effect does not depend on dynamic values

    return null; // This component doesn't render anything
};

export default PreloadContent;
