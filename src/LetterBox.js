import { Heading, Box } from '@chakra-ui/react';

function LetterBox(props) {
	const { letter, show } = props;
	console.log('render');
	return (
		<Box
			textTransform="uppercase"
			m={1}
			bg={letter === ' ' ? 'none' : 'teal.300'}
			borderRadius="md"
			w="80px"
			h="80px"
			border={letter === ' ' ? '0px' : '2px'}
			className="WordGame"
			d="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Heading display={show || 'none'}>{letter}</Heading>
		</Box>
	);
}

export default LetterBox;
