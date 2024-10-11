using Godot;
using System;
using Takoyaki;

public partial class PlayingCard : Area2D
{
    private Sprite2D _cardFront;
    private Sprite2D _cardBack;
    private AnimationPlayer _animPlayer;
    
    private int _cardId;
    private CardSuits _cardSuit;
    private int _cardRank;
    private bool _canFlip = true;
    
    public PlayingCard(int cardId, CardSuits suit, int rank)
    {
        _cardId = cardId;
        _cardSuit = suit;
        _cardRank = rank;
        
        GetNode<Sprite2D>("CardFront").RegionRect = GetCardFrontRegionRect(_cardId);
        Scale = new Vector2(Constants.UiScale, Constants.UiScale);
    }

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        InputEvent += OnInputEvent;

        _cardFront = GetNode<Sprite2D>("CardFront");
        _cardBack = GetNode<Sprite2D>("CardBack");
        _cardBack.Hide();

        _animPlayer = GetNode<AnimationPlayer>("FlipAnimationPlayer");
    }

    private void OnInputEvent(Node viewport, InputEvent @event, long shapeIdx)
    {
        if (!_canFlip) return;
        if (@event is InputEventMouseButton mouseEvent && mouseEvent.IsReleased())
        {
            _animPlayer.Play("flip");
        }
    }

    private void FlipFrontBackVisibility()
    {
        _cardFront.Visible = !_cardFront.Visible;
        _cardBack.Visible = !_cardBack.Visible;
    }

    private static Rect2 GetCardFrontRegionRect(int cardId)
    {
        var hOff = cardId % 13 == 0 ? 13 : cardId % 13;
        var vOff = (int)Math.Floor((cardId - 1) / 13M);

        return new Rect2(hOff * Constants.CardWidth, vOff * Constants.CardHeight, new Vector2(Constants.CardWidth, Constants.CardHeight));
    }
}
