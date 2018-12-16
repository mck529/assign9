
var scores = [
    {"letter": "A", "value": 1, "amount": 9},
    {"letter": "B", "value": 3, "amount": 2},
    {"letter": "C", "value": 3, "amount": 2},
    {"letter": "D", "value": 2, "amount": 4},
    {"letter": "E", "value": 1, "amount": 12},
    {"letter": "F", "value": 4, "amount": 2},
    {"letter": "G", "value": 2, "amount": 3},
    {"letter": "H", "value": 4, "amount": 2},
    {"letter": "I", "value": 1, "amount": 9},
    {"letter": "J", "value": 8, "amount": 1},
    {"letter": "K", "value": 5, "amount": 1},
    {"letter": "L", "value": 1, "amount": 4},
    {"letter": "M", "value": 3, "amount": 2},
    {"letter": "N", "value": 1, "amount": 5},
    {"letter": "O", "value": 1, "amount": 8},
    {"letter": "P", "value": 3, "amount": 2},
    {"letter": "Q", "value": 10, "amount": 1},
    {"letter": "R", "value": 1, "amount": 6},
    {"letter": "S", "value": 1, "amount": 4},
    {"letter": "T", "value": 1, "amount": 6},
    {"letter": "U", "value": 1, "amount": 4},
    {"letter": "V", "value": 4, "amount": 2},
    {"letter": "W", "value": 4, "amount": 2},
    {"letter": "X", "value": 8, "amount": 1},
    {"letter": "Y", "value": 4, "amount": 2},
    {"letter": "Z", "value": 10, "amount": 1},
    {"letter": "_", "value": 0, "amount": 2}
];

var word = [
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"},
  {"letter": "*", "tile_type": "EMP", "rowNum": "0", "spaceNum": "0"}
];
var wordCount = 0;

var lettersOnDeck = 0;
var tilesOnBoard = 0;
var totalScore = 0;

function printWord() {
  var temp = "";
  for(i = 0; i < wordCount; i++) {
    temp += word[i].letter;
  }
  return temp;
}

function resetRack() {
  var temp = "";
  $("#rack img").each(function(index) {
    temp += $(this).attr('id');
    $(this).remove();
  });
  reformRack(temp);
  wordCount = 0;
  clearWord();
}



function findWord( word ) {
  console.log(word);
    if (dict[word]) {
        return true;
    }
    return false;
}

function clearWord(){
  for(i = 0; i < word.length; i++) {
    word[i].letter = "*";
    word[i].tile_type = "EMP";
    word[i].rowNum = 0;
    word[i].spaceNum = 0;
  }
  $("#word").html("Current Word is: ");
  $("#score").html("Current Round Score is: 0");
}

function reformRack(letters) {
  var letter, tileSrc;
  console.log(letters);
  for (var i = 0; i < letters.length; i++) {
    letter = letters[i];
    tileSrc = "<img id=\"" + letter + "\" class=\"rack_blocks\" src=\"img/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg\">";
    $("#rack").append(tileSrc);
    lettersOnDeck++;
  }
  setDragAndDrop();
}

function submitWord() {
  var temp = printWord().toLowerCase();
  if(findWord(temp)) {
    $("#message").html("Your word is correct! Your score has been updated.");
  } else {
    $("#message").html("Your word is invalid. Please try again.");
    resetRack();
  }

}


function generateTitle() {
  var title = "SCRABBLE";
  for (var i = 0; i <= title.length - 1; i++) {
    tileSrc = "<img id=\"t" + title[i] + "\" class=\"title_blocks\" src=\"img/Scrabble_Tiles/Scrabble_Tile_" + title[i] + ".jpg\">";
    $("#title").append(tileSrc);;
  }
}

function selectTile() {
    var validLetter = true;
    while (validLetter) {
      random = Math.floor((Math.random() * 26));
      if(scores[random].amount != 0) {
        validLetter = false;
      }
    }
    return random;
}

function generateRack() {
  var letter, random, tileSrc;
  var numNewTiles = 7 - lettersOnDeck;
  for (var i = 1; i <= numNewTiles; i++) {
    random = selectTile();
    letter = scores[random].letter;
    scores[random].amount--;
    console.log("Selected letter tile: " + scores[random].letter + " Only " + scores[random].amount + " remain.");
    tileSrc = "<img id=\"" + letter + "\" class=\"rack_blocks\" src=\"img/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg\">";
    $("#rack").append(tileSrc);
    lettersOnDeck++;
  }
  setDragAndDrop();
}

function subFromRack(){
  lettersOnDeck--;
  console.log("Current letters on rack: " + lettersOnDeck);
}

function addToRack(){
  lettersOnDeck++;
  console.log("Current letters on rack: " + lettersOnDeck);
}

function updateWord(){
  $("#word").html(printWord());
  updateScore(false);
  console.log("Updated word.");
}

function updateScore(checking){
  var roundScore = 0;
  var doubleWord = 0;
  var tripleWord = 0;

  for (var i = 0; i < word.length; i++) {
    for (var j = 0; j < scores.length; j++) {
      if (word[i] != "" && (word[i].letter == scores[j].letter)) {
        switch(word[i].tile_type) {
          case "DWS":
            doubleWord += 2;
            roundScore += scores[j].value;
            break;
          case "DLS":
            roundScore += (2 * scores[j].value);
            break;
          case "TWS":
            tripleWord += 3;
            roundScore += scores[j].value;
            break;
          case "TLS":
            roundScore += (3 * scores[j].value);
            break;
          case "EMP":
            roundScore += scores[j].value;
            break;
          case "SRT":
            roundScore += scores[j].value;
            break;
        }
      }
    }
  }
  if(doubleWord) {
    roundScore = roundScore * doubleWord;
  }
  if(tripleWord) {
    roundScore = roundScore * tripleWord;
  }
  if(!checking) {
    $("#score").html("Current Word Score: " + roundScore);
  } else {
    return roundScore;
  }
}


function setDragAndDrop () {
  $("#rack").droppable({accept: '.rack_blocks', drop: addToRack});
  $(".rack_blocks").draggable({snap: ".board_blocks", snapMode: "inner", revert: "invalid"});
  $(".board_blocks").droppable({accept: '.rack_blocks', drop: Drop, out: Drag});

  function Drag(event, ui) {

    if(ui.draggable.attr('id') == word[$(this).attr("id")]) {
      console.log("I am here");
      word[$(this).attr("id")] = "";
    }
    updateWord(word);
  }

  function Drop(event, ui) {
    subFromRack();
    ui.draggable.draggable({revert: "invalid"});
    var letter = ui.draggable.prop('id');
    var spaceNum = $(this).attr('id');
    var tile_type = $(this).attr('class').substring(13,16);
    var rowNum = $(this).parent().parent().attr('id');
    var valid = true;
    if(wordCount != 0) {
      valid = checkTileSpace(event, ui, parseInt(spaceNum), parseInt(rowNum));
    }
    if(valid){
      word[wordCount].letter = letter;
      word[wordCount].tile_type = tile_type;
      word[wordCount].spaceNum = parseInt(spaceNum);
      word[wordCount].rowNum = parseInt(rowNum);
      ui.draggable
      console.log("You placed letter tile " + letter);
      console.log("On a " + tile_type + " tile on space " + spaceNum + " in row " + rowNum);
      wordCount++;
      ui.draggable.draggable({disabled: true});
      updateWord(word);
    } else {
      ui.draggable.draggable({revert: "valid"});
    }

  }

  function checkTileSpace(event, ui, currSpace, currRow) {
    var check = true;
    var prevSpace = word[wordCount - 1].spaceNum;
    var prevRow = word[wordCount - 1].rowNum;
    var spaceDiff = Math.abs(currSpace - prevSpace);
    var rowDiff = Math.abs(currRow - prevRow);
    if (spaceDiff == 0) {
      if (rowDiff != 1) {
        check = false;
      }
    } else if (rowDiff == 0) {
      if (spaceDiff != 1) {
        check = false;
      }
    } else {
      check = false;
    }
    return check;
  }
}

var tile_types = [
    {"type": "EMP"}, // 0
    {"type": "TLS"}, // 1
    {"type": "TWS"}, // 2
    {"type": "DLS"}, // 3
    {"type": "DWS"}, // 4
    {"type": "SRT"}  // 5
];

function formRowType(rowType, rowNum) {
  var tile_type = tile_types[0].type;
  var temp = "";
  for (var i = 1; i <= 15; i++) {
    if (i == 1) {
      temp += "<tr id = \"" + rowNum + "\"><td>";
    }
    switch(rowType) {
      case 1:
        if (i == 1 || i == 8 || i == 15) {
          tile_type = tile_types[2].type;
        }
        if (i == 4 || i == 12) {
          tile_type = tile_types[3].type;
        }
        break;
      case 2:
        if (i == 2 || i == 14) {
          tile_type = tile_types[4].type;
        }
        if (i == 6 || i == 10) {
          tile_type = tile_types[1].type;
        }
        break;
      case 3:
        if (i == 3 || i == 13) {
          tile_type = tile_types[4].type;
        }
        if (i == 7 || i == 9) {
          tile_type = tile_types[3].type;
        }
        break;
      case 4:
        if (i == 1 || i == 8 || i == 15) {
          tile_type = tile_types[3].type;
        }
        if (i == 4 || i == 12) {
          tile_type = tile_types[4].type;
        }
        break;
      case 5:
        if (i == 5 || i == 11) {
          tile_type = tile_types[4].type;
        }
        break;
      case 6:
        if (i == 2 || i == 6 || i == 10 || i == 14) {
          tile_type = tile_types[1].type;
        }
        break;
      case 7:
        if (i == 3 || i == 7 || i == 9 || i == 13) {
          tile_type = tile_types[3].type;
        }
        break;
      case 8:
        if (i == 1 || i == 15) {
          tile_type = tile_types[2].type;
        }
        if (i == 4 || i == 12) {
          tile_type = tile_types[3].type;
        }
        if (i == 8) {
          tile_type = tile_types[5].type;
        }
        break;
    }
    temp += "<img id=\"" + i + "\" class=\"board_blocks " + tile_type + "\"" + "src=\"img/Board_Tiles/" + tile_type + ".jpg\">";

    tile_type = tile_types[0].type;
  }
  temp += "</td></tr>";
  return temp;
}

function generateBoard() {
  var temp = "<table id=\"boardTable\">";
  temp += formRowType(1, 1);
  temp += formRowType(2, 2);
  temp += formRowType(3, 3);
  temp += formRowType(4, 4);
  temp += formRowType(5, 5);
  temp += formRowType(6, 6);
  temp += formRowType(7, 7);
  temp += formRowType(8, 8);
  temp += formRowType(7, 9);
  temp += formRowType(6, 10);
  temp += formRowType(5, 11);
  temp += formRowType(4, 12);
  temp += formRowType(3, 13);
  temp += formRowType(2, 14);
  temp += formRowType(1, 15);
  temp += "</table>";
  $("#board").append(temp);
}
var dict = {};

$(document).ready(function(){
  generateTitle();
  generateRack();
  generateBoard();
  setDragAndDrop();



  $.get( "dict/dictionary.txt", function( txt ) {
      var words = txt.split( "\n" );
      for ( var i = 0; i < words.length; i++ ) {
          dict[words[i]] = true;

      }
  });
});
