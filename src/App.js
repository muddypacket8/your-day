import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8002/cards")
      .then(response => response.json())
      .then(data => {
        setCards(data.cards);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="spin.png" className="App-logo" alt="logo" />
        <p>
          HAPPY FATHERS DAY.
        </p>
        <a
          className="App-link"
          href="https://youtu.be/n8n-PDVYgu4"
          target="_blank"
          rel="noopener noreferrer"
        >
          courtesy of you day
        </a>
        {cards && cards.map(card => (
          <div key={card.id} className="card">
            <h2>{card.recipient}</h2>
            <p>{card.message}</p>
            <p>From: {card.sender}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

document.getElementById('searchButton').addEventListener('click', function() {
  const recipientName = document.getElementById('recipientInput').value;

  fetch("http://localhost:8002")
    .then(response => response.json())
    .then(data => {
      const cards = data.cards;

      // Find the card with matching recipient name
      const matchingCard = cards.find(card => card.recipient === recipientName);

      if (matchingCard) {
        // Display the recipient's name
        alert('Recipient Name: ' + matchingCard.recipient);
      } else {
        alert('No matching recipient found!');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

export default App;
