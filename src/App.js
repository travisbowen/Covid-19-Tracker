import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	MenuItem,
	FormControl,
	Select,
} from "@material-ui/core/";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");

	// Runs only once because array is empty in use effect
	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = (event) => {
		setCountry(event.target.value);
	};

	return (
		<div className='app'>
			<div className='app__left'>
				<div className='app__header'>
					{/* Header */}
					{/* Title + dropdown */}
					<h1>COVID-19 TRACKER</h1>
					<FormControl className='app__dropdown'>
						<Select
							variant='outlined'
							value={country}
							onChange={onCountryChange}>
							<MenuItem value={"worldwide"}>Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className='app__stats'>
					{/* InfoBoxes */}
					<InfoBox title='Coronavirus Cases' total={1000} cases={1000} />
					<InfoBox title='Recovered' total={1000} cases={1000} />
					<InfoBox title='Deaths' total={1000} cases={1000} />
				</div>

				{/* Map */}
				<Map />
			</div>
			<Card className='app__right'>
				<CardContent>
					{/* Table */}
					<h3>Live Cases by Country</h3>
					{/* Graph */}
					<h3>Worldwide New Cases</h3>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
