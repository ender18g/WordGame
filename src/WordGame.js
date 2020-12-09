import { Heading, Box, Button, Input, Text } from '@chakra-ui/react';
import LetterBox from './LetterBox';
import { useState, useEffect } from 'react';
import logo from './logo.png';
import './WordGame.css';

function WordGame(props) {
	const { phraseArray } = props;
	const [ phraseID, setPhraseID ] = useState(0);
	const [ currentPhraseObj, setCurrentPhraseObj ] = useState({
		chars: 'welcome'.split(''),
		revealed: new Array(10).fill(false)
	});
	const [ timerID, setTimerID ] = useState(false);
	const [ delta, setDelta ] = useState(1000);

	useEffect(
		() => {
			setCurrentPhraseObj({
				chars: phraseArray[phraseID].phrase.split(''),
				theme: phraseArray[phraseID].theme,
				revealed: new Array(phraseArray[phraseID].phrase.length).fill(false),
				totalChars: phraseArray[phraseID].phrase.length
			});
		},
		[ phraseID, phraseArray ]
	);

	const randNum = (len) => {
		return Math.floor(Math.random() * len);
	};

	const stopReveal = () => {
		clearInterval(timerID);
		setTimerID(false);
		return false;
	};

	const singleReveal = () => {
		let newObj = { ...currentPhraseObj };
		const my_num = randNum(currentPhraseObj.totalChars);
		newObj.revealed[my_num] = true;
		setCurrentPhraseObj(newObj);
	};

	const continuousReveal = () => {
		if (timerID) {
			return stopReveal();
		}
		const newTimerID = setInterval(() => {
			singleReveal();
		}, delta);
		setTimerID(newTimerID);
	};

	const handleChange = (e) => {
		stopReveal();
		setDelta(e.target.value);
	};

	console.log('current', currentPhraseObj);
	return (
		<Box bg="white" m={7} borderRadius="md" className="WordGame">
			<Box alignContent="flex-start" d="flex" justifyContent="center" flexWrap="wrap">
				{currentPhraseObj.chars.map((l, i) => {
					if (l === ' ') {
						return <div className="break" />;
					} else {
						return <LetterBox show={currentPhraseObj.revealed[i]} key={i} letter={l} />;
					}
				})}
			</Box>
			<Heading fontSize="xl" mb={8} mt={3}>
				{currentPhraseObj.theme}
			</Heading>
			<Button
				onClick={() => {
					stopReveal();
					if (phraseID > 0) setPhraseID(phraseID - 1);
				}}
				m={3}
			>
				Previous Puzzle
			</Button>

			<Button width="200px" colorScheme={timerID ? 'red' : 'blue'} onClick={continuousReveal} m={3}>
				{timerID ? 'Stop' : 'Start Reveal'}
			</Button>

			<Button
				onClick={() => {
					stopReveal();
					if (phraseID < phraseArray.length - 1) setPhraseID(phraseID + 1);
				}}
				m={3}
			>
				Next Puzzle
			</Button>
			<Box>
				<Text fontWeight="bold">Reveal Delay (ms):</Text>
				<Input width="100px" onChange={handleChange} step={100} value={delta} min={100} max={5000} />
			</Box>
		</Box>
	);
}

export default WordGame;
