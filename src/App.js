import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [recipientInput, setRecipientInput] = useState('');
  const defaultMessage = "Happy Father's Day to you and may you enjoy your day";

  useEffect(() => {
    fetch("https://api.jsonserve.com/DRp4Om")
      .then(response => response.json())
      .then(data => {
        setCards(data.cards);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const handleAddCard = () => {
    // Generate a unique ID for the new card
    const newCardId = Date.now();

    // Create a new card object with recipient and message
    const newCard = {
      id: newCardId,
      recipient: recipientInput,
      message: defaultMessage,
      sender: "Me to You", 
    };

    // Update the state with the new card
    setCards(prevCards => [...prevCards, newCard]);

    // Clear the input field
    setRecipientInput('');
  };

  const handleDeleteCard = id => {
    // Filter out the card with the given ID
    const updatedCards = cards.filter(card => card.id !== id);

    // Update the state with the updated card list
    setCards(updatedCards);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="spin.png" className="App-logo" alt="logo" />
        <p>
          HAPPY FATHERS DAY.
        </p>
        <p>To all the fathers in this World</p>
        <a
          className="App-link"
          href="https://youtu.be/n8n-PDVYgu4"
          target="_blank"
          rel="noopener noreferrer"
        >
          courtesy of your day (click here please !!!)
          
        </a><br></br>
        <div className="card-form">
          <input
            type="text"
            id="recipientInput"
            placeholder="Enter recipient name"
            value={recipientInput}
            onChange={e => setRecipientInput(e.target.value)}
          />
          <button id="addButton" onClick={handleAddCard}>Add Card</button>
        </div>
        <div className="card-container">
          {cards.map(card => (
            <div key={card.id} className="card">
              <h2>{card.recipient}</h2>
              <p>{card.message}</p>
              <p>From: {card.sender}</p>
              <div className="card-actions">
                <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
