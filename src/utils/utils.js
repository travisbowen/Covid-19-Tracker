export const sortData = (data) => {
	const sortedData = [...data];

	return sortedData.sort((a, b) => {
		return b.cases - a.cases;
	});
};
