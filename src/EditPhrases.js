import { Heading, Box, Button, Input, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import WordGame from './WordGame';
import { phraseArray } from './phrases';

function EditPhrase() {
	const [ phrases, setPhrases ] = useState(phraseArray);
	const [ showEdit, setShowEdit ] = useState(false);

	const handleChange = (e) => {
		let newPhrases = [ ...phrases ];
		newPhrases[e.target.id][e.target.name] = e.target.value;
		setPhrases(newPhrases);
		window.localStorage.setItem('phraseArray', JSON.stringify(newPhrases));
	};

	const addPhrase = () => {
		let newPhrases = [ ...phrases ];
		newPhrases.push({});
		setPhrases(newPhrases);
	};

	useEffect(() => {
		const localPhrases = window.localStorage.getItem('phraseArray');
		if (localPhrases) setPhrases(JSON.parse(localPhrases));
	}, []);

	return (
		<Box bg="white" m={7} borderRadius="md" className="EditPhrases">
			<WordGame phraseArray={phrases} />

			<Box
				m="auto"
				w="95%"
				borderRadius="md"
				bg="gray.50"
				flexWrap="wrap"
				d={showEdit ? 'flex' : 'none'}
				className="PhraseForm"
			>
				{phrases.map((p, i) => (
					<Box
						bg="blue.100"
						w="400px"
						border="1px"
						borderRadius="md"
						p={4}
						key={i}
						id={i}
						mt={4}
						mx="auto"
						mb={8}
					>
						<Text fontWeight="bold">Phrase {i}: </Text>
						<Input mb={1} onChange={handleChange} id={i} name="phrase" value={p.phrase} />
						<Text fontWeight="bold">Theme {i}: </Text>
						<Input onChange={handleChange} id={i} name="theme" value={p.theme} />
					</Box>
				))}
				<Box w="100%">
					<Button m={2} onClick={addPhrase} colorScheme="blue">
						+
					</Button>
				</Box>
			</Box>
			<Button mt={2} onClick={() => setShowEdit(!showEdit)}>
				Edit Phrases
			</Button>
		</Box>
	);
}

export default EditPhrase;
