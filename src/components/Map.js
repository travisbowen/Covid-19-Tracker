import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";

function Map({ center, zoom, countries }) {
	return (
		<div className='map'>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyCCdIOocUfrTA7y8r4d1H0ABHbcnnsOzqo" }}
				center={center}
				zoom={zoom}></GoogleMapReact>
		</div>
	);
}

export default Map;
