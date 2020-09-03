export const sortData = (data) => {
	const sortedData = [...data];

	return sortedData.sort((a, b) => {
		return b.cases - a.cases;
	});
};

// Draw circles on the map with interactive tooltip
// export const showDataOnMap = (data, caseType = "cases") => (
// 	data.map(country)
// );
