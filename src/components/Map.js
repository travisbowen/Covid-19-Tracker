import React from "react";
import GoogleMapReact from "google-map-react";

const defaultProps = {
	center: {
		lat: 59.95,
		lng: 30.33,
	},
	zoom: 3,
};

function Map() {
	return (
		<div className='app__map' style={{ height: "100vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyCCdIOocUfrTA7y8r4d1H0ABHbcnnsOzqo" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}></GoogleMapReact>
		</div>
	);
}

export default Map;
