module.exports = {
	mode: 'jit',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {backgroundImage: {
			'header-back': "url('../public/fondo-header.jpg')",
		  },},
	},
	plugins: [],
};
