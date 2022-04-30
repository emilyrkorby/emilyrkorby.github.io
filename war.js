// TO DOs:
// Add server-side functionality

// initiate game
var handsPlayed = 0;
var warText = ['I', 'DE-', '-CLARE', 'WAR'];
var inPlay = true;
var player1Cards = [];
var player2Cards = [];
var playedCards = [];
var playedCards1 = []
var playedCards2 = []
var previousPlayed = [];
dealCards(shuffle(createDeck()));
$("#" + "card1Count").text(player1Cards.length);
$("#" + "card2Count").text(player2Cards.length);


$(".btn").click(function() {
  $("#" + "subtitle").removeClass("hide");
  $("." + "card").removeClass("cardStart");
  $("." + "playerName").removeClass("hide");
  $("." + "card").addClass("cardPlayed");
  $("." + "cardCounter").removeClass("hide");
  playCard();
  console.log('here d 1 ' + player1Cards.length + ' 2 ' + player2Cards.length)
});

document.addEventListener("keydown", function() {
  if (!inPlay) {
    $("body").removeClass("gameOver");
    $("h1").removeClass("gameOver");
    $("h1").text('WAR');
    $("#" + "subtitle").text('Click "Battle" to begin');
    // $("#" + "subtitle").addClass("hide");
    $("." + "cards").removeClass("remove");
    $("." + "card").removeClass("cardPlayed");
    $("." + "card").addClass("cardStart");
    $("button").removeClass("remove");
    $("button").removeClass("hide");
    handsPlayed = 0;
    $("#" + "handsPlayed").text(handsPlayed);
    player1Cards = []
    player2Cards = []
    playerCards = dealCards(shuffle(createDeck()));
    inPlay = true;
  }
});


// Card objects
function Card(value, number, suit) {
  this.value = value;
  this.suit = suit;
  this.number = number;
  this.cardDisplay = function() {
    return number + " " + suit;
  }
}

// Sets up the deck
function createDeck() {
  const deckValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // '\u2665' = heart,'\u2660' = spade,'\u2666' = diamond,'\u2663' = club
  const deckSuit = ['\u2665', '\u2660', '\u2666', '\u2663'];
  var deck = [];
  let number = '';
  for (let j = 0; j < deckSuit.length; j++) {
    for (let i = 0; i < deckValue.length; i++) {
      switch (deckValue[i]) {
        case 11:
          number = 'Jack';
          break;
        case 12:
          number = 'Queen';
          break;
        case 13:
          number = 'King';
          break;
        case 14:
          number = 'Ace';
          break;
        default:
          number = deckValue[i].toString();
      }
      let card = new Card(deckValue[i], number, deckSuit[j]);
      deck.push(card);
    }
  }
  return deck;
}

// Shuffles the deck
function shuffle(deck) {
  let currentIndex = deck.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]
    ];
  }
  return deck;
}

// Deals the deck
function dealCards(shuffledDeck) {
  player1Cards = shuffledDeck.splice(0, shuffledDeck.length / 2)
  player2Cards = shuffledDeck
}

function showCard(card, playerHTMLID) {
  if (card.suit == '\u2665' || card.suit == '\u2666') {
    $("#" + playerHTMLID).addClass("redCard");
  } else {
    $("#" + playerHTMLID).removeClass("redCard");
  }
  $("#" + playerHTMLID).text(card.cardDisplay);
}

////////////// THIS NEEDS TO BE COMPLETED OR DELETED
function warPlayedCards(degreeOffset) {
  let playedCard = document.createElement("div");
  playedCard.classList.add('')
  let parent = document.getElementById(id = "warPlayedCards2");
  box.appendChild(el);
}

// Plays a card
function playCard() {
  handsPlayed++;
  $("#" + "handsPlayed").text(handsPlayed);
  playedCards = []
  previousPlayed = []
  playedCards[0] = player1Cards.shift()
  playedCards[1] = player2Cards.shift()
  if (playedCards[0].value > playedCards[1].value) {
    $("#" + "subtitle").text('You win with a ' + playedCards[0].number + ' over a ' + playedCards[1].number);
    showCard(playedCards[0], "card1")
    showCard(playedCards[1], "card2")
    if (Math.floor(Math.random() * 2) == 1) {
      player1Cards.push(playedCards.pop())
      player1Cards.push(playedCards.pop())
    } else {
      player1Cards.push(playedCards.shift())
      player1Cards.push(playedCards.shift())
    }
    $("#" + "card1Count").text(player1Cards.length);
    $("#" + "card2Count").text(player2Cards.length);

    if (player2Cards.length == 0) {
      gameOver('You', 'Your opponent')
      return
    }

  } else if (playedCards[0].value < playedCards[1].value) {
    $("#" + "subtitle").text('Your opponent wins with a ' + playedCards[1].number + ' over a ' + playedCards[0].number);

    showCard(playedCards[0], "card1")
    showCard(playedCards[1], "card2")

    if (Math.floor(Math.random() * 2) == 1) {
      player2Cards.push(playedCards.pop())
      player2Cards.push(playedCards.pop())
    } else {
      player2Cards.push(playedCards.shift())
      player2Cards.push(playedCards.shift())
    }

    $("#" + "card1Count").text(player1Cards.length);
    $("#" + "card2Count").text(player2Cards.length);

    if (player1Cards.length == 0) {
      gameOver('Your opponent', 'You')
      return
    }

  } else {
    showCard(playedCards[0], "card1")
    showCard(playedCards[1], "card2")
    $("#" + "card1Count").text(player1Cards.length);
    $("#" + "card2Count").text(player2Cards.length);
    previousPlayed = previousPlayed.concat(playedCards)
    console.log('here a 1 ' + player1Cards.length + ' 2 ' + player2Cards.length)
    // declareWar(player1Cards, player2Cards, previousPlayed);
    declareWar();
    console.log('here c 1 ' + player1Cards.length + ' 2 ' + player2Cards.length)
  }
}

// Declare War
function declareWar() {
  handsPlayed++;
  $("#" + "handsPlayed").text(handsPlayed);
  $("h1").text('WAR DECLARED!');
  $("." + "playType").removeClass("regularPlay");
  $("." + "playType").addClass("warPlay");
  $("button").addClass("hide");
  $("#" + "subtitle").addClass("hide");
  setTimeout(function() {
    playedCards1 = []
    playedCards2 = []
    if (player1Cards.length < 4) {
      $("." + "playType").removeClass("warPlay");
      $("." + "playType").addClass("regularPlay");
      $("#" + "subtitle").removeClass("hide");
      $("button").removeClass("hide");
      gameOver('Your opponent', 'You')
      return
    } else if (player2Cards.length < 4) {
      $("." + "playType").removeClass("warPlay");
      $("." + "playType").addClass("regularPlay");
      $("#" + "subtitle").removeClass("hide");
      $("button").addClass("remove");
      gameOver('You', 'Your opponent')
      return
    } else {
      // 4 cards from each player are 'flipped' and the 4th card value determines winner of all the cards
      $("h1" + "." + "playType").removeClass("warPlay");
      $("h1" + "." + "playType").addClass("warInterimPlay");
      $("." + "cardDeck").addClass("cardStart");
      $("h1").text(warText[0]);
      playedCards1 = playedCards1.concat(player1Cards.splice(0, 1))
      playedCards2 = playedCards2.concat(player2Cards.splice(0, 1))
      showCard(playedCards1[0], "card1");
      showCard(playedCards2[0], "card2")
      $("#" + "warCards1").removeClass("hide");
      $("#" + "warCards8").removeClass("hide");
      $("#" + "card1Count").text(player1Cards.length);
      $("#" + "card2Count").text(player2Cards.length);
      setTimeout(function() {
        $("h1").text(warText[1]);
        playedCards1 = playedCards1.concat(player1Cards.splice(0, 1))
        playedCards2 = playedCards2.concat(player2Cards.splice(0, 1))
        showCard(playedCards1[1], "card1");
        showCard(playedCards2[1], "card2")
        $("#" + "warCards2").removeClass("hide");
        $("#" + "warCards7").removeClass("hide");
        $("#" + "card1Count").text(player1Cards.length);
        $("#" + "card2Count").text(player2Cards.length);
        setTimeout(function() {
          $("h1").text(warText[2]);
          playedCards1 = playedCards1.concat(player1Cards.splice(0, 1))
          playedCards2 = playedCards2.concat(player2Cards.splice(0, 1))
          showCard(playedCards1[2], "card1");
          showCard(playedCards2[2], "card2")
          $("#" + "warCards3").removeClass("hide");
          $("#" + "warCards6").removeClass("hide");
          $("#" + "card1Count").text(player1Cards.length);
          $("#" + "card2Count").text(player2Cards.length);
          setTimeout(function() {
            $("h1").text(warText[3]);
            playedCards1 = playedCards1.concat(player1Cards.splice(0, 1))
            playedCards2 = playedCards2.concat(player2Cards.splice(0, 1))
            showCard(playedCards1[3], "card1");
            showCard(playedCards2[3], "card2")
            $("#" + "warCards4").removeClass("hide");
            $("#" + "warCards5").removeClass("hide");
            $("#" + "card1Count").text(player1Cards.length);
            $("#" + "card2Count").text(player2Cards.length);
            setTimeout(function() {
              $("button").removeClass("hide");
              $("#" + "subtitle").removeClass("hide");
              $("." + "playType").removeClass("warPlay");
              $("." + "cardDeck").removeClass("cardStart");
              $("." + "playType").addClass("regularPlay");
              $("h1" + "." + "playType").removeClass("warInterimPlay");
              $("h1" + "." + "playType").addClass("regularPlay");
              $("#" + "warCards1").addClass("hide");
              $("#" + "warCards2").addClass("hide");
              $("#" + "warCards3").addClass("hide");
              $("#" + "warCards4").addClass("hide");
              $("#" + "warCards5").addClass("hide");
              $("#" + "warCards6").addClass("hide");
              $("#" + "warCards7").addClass("hide");
              $("#" + "warCards8").addClass("hide");
              if (playedCards1[playedCards1.length - 1].value > playedCards2[playedCards2.length - 1].value) {
                $("#" + "subtitle").text('You win with a ' + playedCards1[playedCards1.length - 1].number + ' over a ' + playedCards2[playedCards2.length - 1].number);
                playedCards1 = playedCards1.concat(playedCards2)
                playedCards1 = playedCards1.concat(previousPlayed)
                playedCards1 = shuffle(playedCards1)
                player1Cards = player1Cards.concat(playedCards1)

              } else if (playedCards1[playedCards1.length - 1].value < playedCards2[playedCards2.length - 1].value) {
                $("#" + "subtitle").text('Your opponent wins with a ' + playedCards2[playedCards2.length - 1].number + ' over a ' + playedCards1[playedCards1.length - 1].number);
                playedCards2 = playedCards2.concat(playedCards1)
                playedCards2 = playedCards2.concat(previousPlayed)
                playedCards2 = shuffle(playedCards2)
                player2Cards = player2Cards.concat(playedCards2)
              } else {
                $("#" + "subtitle").text('Tie! War is Declared Again!');
                previousPlayed = previousPlayed.concat(playedCards1)
                previousPlayed = previousPlayed.concat(playedCards2)
                $("#" + "warCards1").addClass("hide");
                $("#" + "warCards2").addClass("hide");
                $("#" + "warCards3").addClass("hide");
                $("#" + "warCards4").addClass("hide");
                $("#" + "warCards5").addClass("hide");
                $("#" + "warCards6").addClass("hide");
                $("#" + "warCards7").addClass("hide");
                $("#" + "warCards8").addClass("hide");
                // declareWar(player1Cards, player2Cards, previousPlayed)
              }
              $("#" + "card1Count").text(player1Cards.length);
              $("#" + "card2Count").text(player2Cards.length);
              if (player2Cards.length == 0) {
                $("button").removeClass("hide");
                $("#" + "subtitle").removeClass("hide");
                $("." + "playType").removeClass("warPlay");
                $("." + "playType").addClass("regularPlay");
                $("h1" + "." + "playType").removeClass("warInterimPlay");
                $("h1" + "." + "playType").addClass("regularPlay");
                $("#" + "warCards1").addClass("hide");
                $("#" + "warCards2").addClass("hide");
                $("#" + "warCards3").addClass("hide");
                $("#" + "warCards4").addClass("hide");
                $("#" + "warCards5").addClass("hide");
                $("#" + "warCards6").addClass("hide");
                $("#" + "warCards7").addClass("hide");
                $("#" + "warCards8").addClass("hide");
                gameOver('You', 'Your opponent')
                return
              }
              if (player1Cards.length == 0) {
                $("button").removeClass("hide");
                $("#" + "subtitle").removeClass("hide");
                $("." + "playType").removeClass("warPlay");
                $("." + "playType").addClass("regularPlay");
                $("h1" + "." + "playType").removeClass("warInterimPlay");
                $("h1" + "." + "playType").addClass("regularPlay");
                gameOver('Your opponent', 'You')
                return
              }
              console.log('here b 1 ' + player1Cards.length + ' 2 ' + player2Cards.length)
              return
            }, 2 * 1000);
          }, 2 * 1000);
        }, 2 * 1000);
      }, 2 * 1000);
    }
  }, 2 * 1000);
}

// Ends Game
function gameOver(winner, loser) {
  $("." + "cards").addClass("remove");
  $("h1").addClass("gameOver");
  $("h1").text('GAME OVER');
  $("body").addClass("gameOver");
  $("." + "playerName").addClass("hide");
  $("." + "cardCounter").addClass("hide");
  $("button").addClass("remove");
  $("button").addClass("hide");
  $("." + "cardDeck").removeClass("cardStart");
  if (winner == "You") {
    $("#" + "subtitle").text(winner + ' win! ' + loser + ' does not have enough cards to battle. Press any key to go to war again.');
  } else {
    $("#" + "subtitle").text(winner + ' wins! ' + loser + ' do not have enough cards to battle. Press any key to go to war again.');
  }
  inPlay = false;
  $("#" + "card1").text(' ');
  $("#" + "card2").text(' ');
}
