import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
	const [countries, setCountries] = useState([]);
	const [addedCountry, setAddedCountry] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then((res) => res.json())
			.then((data) => setCountries(data));
	}, []);

	const handleAddButton = (country) => {
		const newAddedCountry = [...addedCountry, country];
		setAddedCountry(newAddedCountry);
	};
	let totalArea = 0;
	for (let i = 0; i < countries.length; i++) {
		totalArea = totalArea + countries[i].area;
	}
	return (
		<div className="main-div">
			<div>
				<h1>
					All Country. Total: {countries.length} ---{" "}
					<small> TotalArea: {totalArea} </small> ---
					<small>Country Added: {addedCountry.length}</small>
				</h1>
				<div className="country-data country-title">
					<b>Name</b>
					<b>Capital</b>
					<b>Area</b>
					<b>Language</b>
					<b>More </b>
				</div>
				{countries.map((country) => (
					<Country
						country={country}
						handleAddButton={handleAddButton}
						key={country.alpha3Code}
					></Country>
				))}
			</div>

			<div>
				<AddedCountryInfo
					totalCountry={countries.length}
					addedCountry={addedCountry}
				></AddedCountryInfo>
			</div>
		</div>
	);
};

const Country = (props) => {
	const { name, capital, area, languages } = props.country;
	const handleAddButton = props.handleAddButton;
	return (
		<div className="country-div">
			<div className="App">
				<div className="country-data">
					<li> {name}</li>
					<li> {capital} </li>
					<li>
						{" "}
						{area} km<sup>2</sup>{" "}
					</li>
					<li> {languages[0].name} </li>
					<button
						onClick={() => {
							handleAddButton(props.country);
						}}
						className="add-btn"
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

const AddedCountryInfo = (props) => {
	const addedCountry = props.addedCountry;
	const totalAddedCountryArea = addedCountry.reduce(
		(totalAddedCountryArea, addedCountry) =>
			totalAddedCountryArea + addedCountry.area,
		0
	);

	const totalPopulation = addedCountry.reduce(
		(totalPopulation, addedCountry) =>
			totalPopulation + addedCountry.population,
		0
	);
	return (
		<div className="added-country">
			<h3>Added Total Country</h3>
			<div className="flex-box-addedCountry">
				<small>Total Country: </small>
				<small> {props.totalCountry} </small>

				<small>Added Country: </small>

				<small> {props.addedCountry.length} </small>
				<small>Total Country area: </small>
				<small> {totalAddedCountryArea} </small>
				<small>Total Population:</small>
				<small>{totalPopulation}</small>
			</div>
		</div>
	);
};

export default App;
