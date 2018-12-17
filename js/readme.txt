Readme file for Assignment 9 - SCRABBLE for GUI Programming I
By Michael Kusmirek

Basic Functionality:
- letter tiles are randomly selected to form player's initial hand.
There are 100 tiles in total, and each time a letter of a certain tile is drawn,
the amount of that letter in the deck is decremented.

- Letter tiles can be dragged and dropped onto the scrabble board, in order to move tiles back from the board,
players need to click the "Reset Tiles" button. Tiles can only be placed in a row, horizontally or vertically.

- Program identifies the letters being dropped onto the board, and keeps track of the current word being formed,
displayed underneath the rack each time a tile is dropped onto the board.

- The entire scrabble board (15x15) is displayed, and all bonus tiles (Double/Triple Word/Letter Score) are functional.

- Score is tallied as each letter tile is placed, taking into account bonus tiles and the value of each letter tile.

Additional Functionality:
- you can continue to play words after successfully submitting them, until you have no letter tiles left (You start with 100)

- if you can not form words with the tiles you have, you may click "New Tiles", to get a completely new set of 7 tiles.

- the board is cleared each round, the rack is redealt, ensuring players always have 7 tiles in their deck.

**If you played the word "WORD", and still had the tiles "G,U,I" in your deck, you would be given 4 new tiles for the next round,
so you could get something like, "G, U, I, A, B, C, D", given that ABCD have tiles remaining.**

- total score is displayed, and is kept between rounds. To start over, click the "Restart Game" button.

Extra Credit:

- The full scrabble board is implemented, all 15 rows with 15 spaces in each.

- Each word is validated using a dictionary, only words in the dictionary will be accepted.
