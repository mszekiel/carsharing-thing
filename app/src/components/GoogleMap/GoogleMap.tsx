import React from 'react'
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

import mapStyle from './MapStyle.json';

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
`;

const Map = styled.div`
    height: 100%;
    width: 100%;
    transition: 0.3s ease-in-out;
`;

const Blackout = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.7);
`;

const GoogleMapComponent = () => {
    return (
        <Container>
            <Blackout />
            <Map>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_TOKEN || '' }}
                    center={{ lat: 48.1327809, lng: 11.6244042 }}
                    defaultZoom={14}
                    onChange={console.log}
                    yesIWantToUseGoogleMapApiInternals
                    options={{
                        styles: mapStyle,
                        disableDefaultUI: true
                    }}
                >
                </GoogleMapReact>
            </Map>
        </Container>
    )
}

export default GoogleMapComponent;
