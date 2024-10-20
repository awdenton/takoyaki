using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using Takoyaki;

public partial class GameBoard : Node2D
{
	private PackedScene _playingCardScene;
	private Marker2D _drawPile;

	private static List<PlayingCard> _deck = new();

	public GameBoard()
	{
		_playingCardScene = ResourceLoader.Load<PackedScene>("res://PlayingCard.tscn");
	}

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		_drawPile = GetNode<Marker2D>("DrawPile");
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
