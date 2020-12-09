import { Box, Heading, Image } from '@chakra-ui/react';
import './App.css';
import EditPhrases from './EditPhrases';
import logo from './logo.png';

function App() {
	return (
		<Box className="App">
			<Box d="flex" w="100%" p={3} bg="blue.800" direction="row" justifyContent="flex-start" alignItems="center">
				<Image mr={9} align="flex-start" width="60px" src={logo} />
				<Heading color="white" fontWeight="light" letterSpacing={4}>
					Circular Actuator of Fortune
				</Heading>
			</Box>
			<EditPhrases />
		</Box>
	);
}

export default App;
