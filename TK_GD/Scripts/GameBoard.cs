using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using Takoyaki;

public partial class GameBoard : Node2D
{
	private static List<PlayingCard> _deck = new(52);
	
	private Marker2D _cardSpawn;
	private Marker2D _cardDespawn;
	private Marker2D _drawPile;
	private Marker2D _discardPile;

	// Called when the node enters the scene tree for the first time.
	public override void _EnterTree()
	{
		_cardSpawn = GetNode<Marker2D>("CardSpawn");
		_cardDespawn = GetNode<Marker2D>("CardDespawn");
		_drawPile = GetNode<Marker2D>("DrawPile");
		_discardPile = GetNode<Marker2D>("DiscardPile");
		
		foreach (CardSuits suit in Enum.GetValues(typeof(CardSuits)))
		{
			foreach (var value in Constants.CardRanks)
			{
				var newCard = new PlayingCard(_deck.Count + 1, suit, value);
				newCard.Position = _drawPile.Position;

				_deck.Add(newCard);
			}
		}
	}

	private void NewGame()
	{
		if (_deck.Any()) _deck.ForEach(c => c.QueueFree());
		_deck.Clear();
		_deck = GenerateNewDeck();
	}

	private List<PlayingCard> GenerateNewDeck()
	{
		var newDeck = new List<PlayingCard>();
		var cardId = 1;
		foreach (CardSuits suit in Enum.GetValues(typeof(CardSuits)))
		{
			foreach (var value in Constants.CardRanks)
			{
				var newCard = new PlayingCard(cardId++, suit, value);
				newCard.Position = _drawPile.Position;

				newDeck.Add(newCard);
			}
		}
		return newDeck.OrderBy(_ => new Guid()).ToList();
	}
}
