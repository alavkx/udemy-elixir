defmodule CardsTest do
  use ExUnit.Case
  doctest Cards

  test "create_deck makes 20 cards" do
    deck_length = length(Cards.create_deck)
    assert deck_length == 20
  end

  test "shuffling a deck randomizes it" do
    deck = Cards.create_deck
    shuffle1 = Cards.shuffle(deck)
    shuffle2 = Cards.shuffle(deck)
    shuffle3 = Cards.shuffle(deck)
    assert deck != shuffle1 || deck != shuffle2 || deck != shuffle3
  end
end
