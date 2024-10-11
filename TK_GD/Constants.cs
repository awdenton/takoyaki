namespace Takoyaki
{
    public enum CardSuits
    {
        Diamonds,
        Clubs,
        Hearts,
        Spades
    }

    public static class Constants
    {
        internal const int UiScale = 2;
        internal const int CardWidth = 35;
        internal const int CardHeight = 47;

        internal static readonly int[] CardRanks = new int[] { 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1 };
    }
}
