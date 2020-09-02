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
import Table from "./components/Table";
import { sortData } from "./utils/utils";
import LineGraph from "./components/LineGraph";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	// Runs only once to get default world wide covid info
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

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
					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		setCountry(event.target.value);
		const url =
			country === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${country}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
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
					<InfoBox
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title='Recovered'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title='Deaths'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>

				{/* Map */}
				<Map />
			</div>
			<Card className='app__right'>
				<CardContent>
					{/* Table */}
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					{/* Graph */}
					<h3>Worldwide New Cases</h3>
					<LineGraph casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
