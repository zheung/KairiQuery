module.exports = {
	filter: (cells) => {
		return !/^#/.test(cells[0]);
	}
};