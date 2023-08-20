import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidht = Dimensions.get('window').width;

const getStyles = (theme) =>
  StyleSheet.create({

    container: {
    	flex: 1,
    	backgroundColor: theme.backgroundColor,
    	alignItems: 'center',
    	justifyContent: 'flex-start',
    	paddingTop: 0,
    },

	toggleSwitch: {
		// width: 10, // Adjust width as needed
		// height: 10, // Adjust height as needed
	},

	iconToggleContainer: {
		flexDirection: 'row', // Arrange items horizontally
		alignItems: 'center', // Center items vertically
		justifyContent: 'center', // Center items horizontally
		// position: 'absolute',
		marginTop: 20, // Add some space between the header and icon/toggle
		// bottom: 10,
		left: 180,
	},

	header: {
		backgroundColor: '#8a2be2', // Violet background color
		paddingTop: 20, // Add some top padding for spacing
		width: '100%', // Take full width
	},

    title: {
    	fontSize: 50,
    	fontWeight: 'bold',
    	marginBottom: 20,
    	textAlign: 'center',
    	color: 'white', // Apply theme text color here
    },

	text: {
    	fontSize: 20,
    	fontWeight: 'bold',
    	marginTop: 100,
    	textAlign: 'center',
		marginTop: windowHeight * 0.25,
    	color: theme.textColor, // Apply theme text color here
    },

	portInput: {
		textAlign: 'center',
		marginTop: 3,
		marginBottom: 30,
		color: theme.textColor,
		height: 40,
		borderWidth: 2,            // Ajoute une bordure
		borderColor: theme.textColor,     // Couleur de la bordure
		borderRadius: 200,          // Bordure arrondie
		padding: 10,              // Espace interne pour le texte
	  },

    button: {
		width: windowWidht * 0.5,
    	paddingVertical: 10,
    	paddingHorizontal: 20,
    	borderRadius: 200,
    	backgroundColor: theme.buttonColor,
    },
	
    buttonText: {
		textAlign: 'center',
    	fontSize: 50,
    	color: 'white', // Apply theme text color here
    },

	author: {
		fontSize: 20,
		position: 'absolute',
		bottom: 10,
		right: 10,
		color: theme.textColor,
	},
  });

export default getStyles;
