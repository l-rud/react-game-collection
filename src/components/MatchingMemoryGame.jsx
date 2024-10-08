import { useState, useEffect } from 'react';
import './MatchingMemoryGame.css';

const cardImages = [
    { src: '/bear.png', id: 1 },
    { src: '/alligator.png', id: 2 },
    { src: '/bat.png', id: 3 },
    { src: '/cat.png', id: 4 },
    { src: '/dog.png', id: 5 },
    { src: '/fish.png', id: 6 },
    { src: '/iguana.png', id: 7 },
    { src: '/lion.png', id: 8 },
    { src: '/monkey.png', id: 9 },
    { src: '/panda.png', id: 10 },
    { src: '/raccoon.png', id: 11 },
    { src: '/octopus.png', id: 12 },
    { src: '/snake.png', id: 13 },
    { src: '/whale.png', id: 14 },
].flatMap(image => [image, { ...image }]); // To create pairs

const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
};

const MatchingMemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedIndices, setMatchedIndices] = useState([]);

    useEffect(() => {
        const shuffledCards = shuffleCards(cardImages);
        setCards(shuffledCards);
    }, []);
    
    // When a player clicks on a card handleCardClick function takes an argument (index of the clicked card in the cards array) then checks conditions: 
    // 1) that the player can only flip 2 cards at a time; 
    // 2) whether the clicked card is already flipped; 
    // 3)whether the clicked card has already been matched. 
    // If all conditions are met, the setFlippedIndices is called with a new array that includes all the previously flipped indexes plus the new one. 
    //React recognizes this as a state change and re-renders the component:

    const handleCardClick = (index) => {
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
            setFlippedIndices([...flippedIndices, index]);
        }
    };
    //If 2 cards are flipped and match by id, useEffect adds the id to matchedIndices:
    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex].id === cards[secondIndex].id) {
                setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
            }
            setTimeout(() => {
                setFlippedIndices([]);
            }, 1000); // allowing players to see the flipped cards for 1 second
        }
    }, [flippedIndices, cards, matchedIndices]);

    return (
        <div className="game">
            {/* <h1>Matching Memory Game</h1> */}
            <div className="card-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${flippedIndices.includes(index) || matchedIndices.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        {flippedIndices.includes(index) || matchedIndices.includes(index) ? (
                            <img src={card.src} alt={`Card ${card.id}`} />
                        ) : (
                            <div className="card-back">?</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchingMemoryGame;