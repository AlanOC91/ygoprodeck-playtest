function drawCard(){
    
    if(deckcount > 0){
        //Get the next item available from the deck array
        var item = main_deck[0]; 
        var index = 0; //Use index 0 for the next card
        main_deck.splice(index, 1); 
        jQuery('#play-hand').append('<div class="card-draggable draggable"><img class="playarea-card" data-name="'+item+'" src="https://images.ygoprodeck.com/images/cards/'+item+'.jpg" data-identifier="'+item+'"></div>');
        deckDeincrement();
        handIncrement();
        assignCardContextMenu();
        rebindClick();
        switchContext('overview');
    }
}

function viewDeck(){
    
    switchContext('overview');
    jQuery('.decksize').html(deckcount);
    var deckhtml = '';
    main_deck.forEach(function(item) {
        deckhtml += '<div class="card-draggable draggable insidedeck"><img class="deck-list-card playarea-card" data-name="'+item+'" src="https://images.ygoprodeck.com/images/cards/'+item+'.jpg" data-identifier="'+item+'"></div>';
    });
    jQuery('.deck-list').html(deckhtml);
    jQuery('#viewDeck').modal('toggle');
    assignDeckGYContextMenu();
    rebindClick();
}

function ViewExtraDeck(){
    
    switchContext('overview');
    jQuery('#extra-deck').html('');
    if(extra_deck.length > 0){
        var deckhtml = '';
        extra_deck.forEach(function(item) {
            deckhtml += '<div class="card-draggable draggable insideextradeck"><img class="deck-list-card playarea-card" data-name="'+item+'" src="https://images.ygoprodeck.com/images/cards/'+item+'.jpg" data-identifier="'+item+'"></div>';
        });
        jQuery('.extra-deck-list').html(deckhtml);
        jQuery('#viewExtraDeck').modal('toggle');
    }
    assignDeckGYContextMenu();
    rebindClick();
}

function viewGY(){
    
    switchContext('overview');
    jQuery('.gysize').html(graveyard);
    var deckhtml = '';
    gyarray.forEach(function(item) {
        deckhtml += '<div class="card-draggable draggable insidegy"><img class="deck-list-card playarea-card" data-name="'+item+'" src="https://images.ygoprodeck.com/images/cards/'+item+'.jpg" data-identifier="'+item+'"></div>';
    });    
    jQuery('.deck-list-gy').html(deckhtml);
    jQuery('#viewGY').modal('toggle');
}

function deckDeincrement(){
    deckcount = deckcount - 1;
    jQuery('.decksize').html(deckcount);
}

function extraDeckDeincrement(){
    extradeckcount = extradeckcount - 1;
    jQuery('.extradecksize').html(extradeckcount);    
}

function handIncrement(){
    handsize = handsize + 1;
    jQuery('.handsize').html(handsize);    
}

function handDeincrement(){
    handsize = handsize - 1;
    jQuery('.handsize').html(handsize);    
}

function GYIncrement(){
    graveyard = graveyard + 1;
    jQuery('.gysize').html(graveyard);        
}

function GYDeincrement(){
    graveyard = graveyard - 1;
    jQuery('.gysize').html(graveyard);  

    if(graveyard == 0){
        jQuery('#graveyard').html('');
    }    
    
}

function shuffleDeck(string){
    shuffle(main_deck);
    
    if(string == 'notify'){
     	jQuery('#notifyToast .toast-body').html("Main Deck has been Shuffled.");
     	jQuery('#notifyToast').toast('show');         
    }
}

function sendToGY(){
    gyarray.push(jQuery(cardtarget).attr("data-identifier"));
    jQuery(cardtarget).removeClass('rotate-90').addClass('insidegy').prependTo("#graveyard");
    GYIncrement();
    
    //Remove from Deck if Card was sent from Deck to GY
    if(jQuery(cardtarget).hasClass('insidedeck')){
        //Main Deck Handle
        main_deck.splice(jQuery.inArray(jQuery(cardtarget).attr("data-identifier"), main_deck), 1 );
        deckDeincrement();    
        jQuery(cardtarget).removeClass('insidedeck')
    }else if(jQuery(cardtarget).hasClass('insideextradeck')){
        //Extra Deck Handle
        extra_deck.splice(jQuery.inArray(jQuery(cardtarget).attr("data-identifier"), extra_deck), 1 );
        extraDeckDeincrement();    
        jQuery(cardtarget).removeClass('insideextradeck')       
    }
    switchContext('overview');
}

function sendToField(){
    //Remove from Deck if Card was sent from Deck to Field
    if(jQuery(cardtarget).hasClass('insidedeck')){
        //Main Deck Handle
        main_deck.splice(jQuery.inArray(jQuery(cardtarget).attr("data-identifier"), main_deck), 1 );
        deckDeincrement();    
        jQuery('#zone-playarea').append('<div class="card-draggable draggable removed-from-hand" style=""><img class="playarea-card" data-name="'+jQuery(cardtarget).attr("data-identifier")+'" src="https://images.ygoprodeck.com/images/cards/'+jQuery(cardtarget).attr("data-identifier")+'.jpg" data-identifier="'+jQuery(cardtarget).attr("data-identifier")+'"></div>');
        jQuery(cardtarget).parent().remove();
    }else if(jQuery(cardtarget).hasClass('insideextradeck')){
        //Extra Deck Handle
        extra_deck.splice(jQuery.inArray(jQuery(cardtarget).attr("data-identifier"), main_deck), 1 );
        extraDeckDeincrement();    
        jQuery('#zone-playarea').append('<div class="card-draggable draggable removed-from-hand" style=""><img class="playarea-card" data-name="'+jQuery(cardtarget).attr("data-identifier")+'" src="https://images.ygoprodeck.com/images/cards/'+jQuery(cardtarget).attr("data-identifier")+'.jpg" data-identifier="'+jQuery(cardtarget).attr("data-identifier")+'"></div>');
        jQuery(cardtarget).parent().remove();        
    }    
}

function sendToDeck(){
    
}

function returnToHand(){
    var cardid = jQuery(cardtarget).attr("data-identifier");
    if(jQuery(cardtarget).parent().hasClass('insideextradeck') || jQuery(cardtarget).parent().hasClass('extradeckcard')){
        //Extra Deck Handle
     	jQuery('#notifyToast .toast-body').html("Extra Deck Cards cannot be sent to the Hand.");
     	jQuery('#notifyToast').toast('show');         
    }else if(jQuery(cardtarget).parent().hasClass('insidedeck')){
        //Main Deck Handle
        main_deck.splice(jQuery.inArray(cardid, main_deck), 1 );
        deckDeincrement();    
        jQuery('#play-hand').append('<div class="card-draggable draggable"><img class="playarea-card" data-name="'+cardid+'" src="https://images.ygoprodeck.com/images/cards/'+cardid+'.jpg" data-identifier="'+cardid+'"></div>');
        jQuery(cardtarget).parent().remove();    
        handIncrement();    
    }else if(jQuery(cardtarget).parent().hasClass('removed-from-hand')){
        //Field Handle
        jQuery(cardtarget).remove();
        jQuery('#play-hand').append('<div class="card-draggable draggable"><img class="playarea-card" data-name="'+cardid+'" src="https://images.ygoprodeck.com/images/cards/'+cardid+'.jpg" data-identifier="'+cardid+'"></div>');
        handIncrement();        
    }
    switchContext('overview');
}

function rotateCard(){
    jQuery(cardtarget).toggleClass('rotate-90');
}

function viewCard(){
    var id = jQuery(cardtarget).attr("data-identifier");
    window.open('https://ygoprodeck.com/card/?search='+id, '_blank').focus();
}

function viewCardDecks(){
    var id = jQuery(cardtarget).attr("data-identifier");
    window.open('https://ygoprodeck.com/deck-search/?&cardcode='+id+'&offset=0', '_blank').focus();    
}

function resetAll(){
    switchContext('overview');
    main_deck = main_deck_og.slice();
    extra_deck = extra_deck_og.slice();
    deckcount = main_deck.length;
    extradeckcount = extra_deck.length;
    shuffleDeck();
    handsize = 0;
    jQuery('.handsize').html(handsize);        
    jQuery('.decksize').html(deckcount);
    jQuery('.extradecksize').html(extradeckcount);  
    jQuery('.card-draggable').remove();
    
    //Reset GY Stats
    jQuery('#graveyard').html('');
    graveyard = 0;
    gyarray = [];
    jQuery('.gysize').html(graveyard);    
    
    i = 0;
    while (i < 5) {
      drawCard();
      i++;
    }    
    
}

function switchContext(string){
    context = string;
    jQuery('.context-status').html(string);
}

//Sets the distance the pointer must be moved before an draggable action
//This is used so that right clicking and accidentally slightly moving the mouse won't trigger drag event
//interact.pointerMoveTolerance(40); //Currently this has a bug with "cloning" the card.

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

//Code for Dragging Images
interact('.draggable').draggable({
    onstart: function(event){
        if(event.button == 2){
            return false;
        }
        rebindClick();
    },
    onmove: function(event) {
        if(event.button == 2){
            return false;
        }
    },    
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: document.getElementById('zone-playarea'),
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
}).on('move', function (event) { 
    var interaction = event.interaction;
    if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.hasAttribute('clonable') != 'false') {
        //Bug sometimes not moving into this!!
        original = event.currentTarget;
        var clone = event.currentTarget.cloneNode(true);
        var x = clone.offsetLeft;
        var y = clone.offsetTop;
        clone.setAttribute('clonable','false');
        clone.setAttribute('extra_delete','false');
        clone.style.position = "absolute";
        clone.style.left = original.offsetLeft+"px";
        clone.style.top = original.offsetTop+"px";
        original.parentElement.appendChild(clone);
        interaction.start({ name: 'drag' },event.interactable,clone);
    }
});

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    //draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },
  ondrop: function (event) {
    //event.relatedTarget.textContent = 'Dropped'
    if (jQuery(event.relatedTarget).hasClass("insidedeck")) {
        //This card is removed from inside the deck
        jQuery(original).removeClass("insidedeck").appendTo("#zone-playarea");
        jQuery(original).find(">:first-child").removeClass("deck-list-card");
        //Remove from main_deck array and deincrement deck count
        main_deck.splice(jQuery.inArray(jQuery(original).find(">:first-child").attr("data-identifier"), main_deck), 1 );
        deckDeincrement();
        if (jQuery('#viewDeck').is(':visible')) {
            jQuery('#viewDeck').modal('toggle');
        }        
    }else if(jQuery(event.relatedTarget).hasClass("insideextradeck")){
        //This card is removed from inside the extra deck
        jQuery(original).removeClass("insideextradeck").addClass("extradeckcard").appendTo("#zone-playarea");
        jQuery(original).find(">:first-child").removeClass("deck-list-card");
        //Remove from extra_deck array
        extra_deck.splice(jQuery.inArray(jQuery(original).find(">:first-child").attr("data-identifier"), extra_deck), 1 );
        extraDeckDeincrement();
        if (jQuery('#viewExtraDeck').is(':visible')) {
            jQuery('#viewExtraDeck').modal('toggle');
        }     
        rebindClick();
    }else if(jQuery(event.relatedTarget).hasClass("insidegy")){
        //This card is removed from the GY
        jQuery(original).removeClass("insidegy").addClass("removed-from-hand").appendTo("#zone-playarea");
        jQuery(original).find(">:first-child").removeClass("deck-list-card");
        //Remove from GY array
        gyarray.splice(jQuery.inArray(jQuery(original).find(">:first-child").attr("data-identifier"), gyarray), 1 );
        jQuery("#graveyard img[data-identifier='" + jQuery(original).find(">:first-child").attr("data-identifier") +"']").remove();
        GYDeincrement();
        if (jQuery('#viewGY').is(':visible')) {
            jQuery('#viewGY').modal('toggle');
        }        
    }else{
        //This card is removed from inside the Hand
        jQuery(original).remove();  //Remove original element after cloned
        if (!jQuery(event.relatedTarget).hasClass("removed-from-hand")) {
            //Deincrement Hand Count
            handDeincrement();
        }         
    }     
    
    if(jQuery(event.relatedTarget.tagName == 'DIV')){
        //Target the child image for the card target
        cardtarget = jQuery(event.relatedTarget).find(">:first-child"); 
    }else{
        //Target the current related target
        cardtarget = jQuery(event.relatedTarget);     
    }
    event.relatedTarget.classList.add('removed-from-hand');
    assignCardContextMenu();
    switchContext('card');
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function assignCardContextMenu(){
    //This is used to assign right click context menu to cards when they are dropped into the playzone
    jQuery('.playarea-card').on('contextmenu', function(e) {
      switchContext('card');
      cardtarget = e.currentTarget;
      if (cardtarget.matches('#graveyard, #graveyard *')) {
        return false; //This is used to prevent the context menu showing when the card is in the GY
      }
      var top = e.pageY - 100;
      var left = e.pageX;
      jQuery("#card-context-menu").css({
        display: "block",
        top: top,
        left: left,
        position: "fixed"
      }).addClass("show");
      return false; //blocks default Webbrowser right click menu
    }).on("click", function() {
      jQuery("#card-context-menu").removeClass("show").hide();
    });    
}

function assignDeckGYContextMenu(){
    //This is used to assign right click context menu to cards when they are dropped into the playzone
    jQuery('.insidedeck, .insideextradeck').on('contextmenu', function(e) {
      if(jQuery(e.currentTarget).hasClass('insideextradeck')){
          jQuery(e.currentTarget).find(">:first-child").addClass('insideextradeck');
      }else{
          jQuery(e.currentTarget).find(">:first-child").addClass('insidedeck');
      } 
      jQuery(e.currentTarget).find(">:first-child").removeClass("deck-list-card").addClass("removed-from-hand");
      cardtarget = jQuery(e.currentTarget).find(">:first-child");
      var top = e.pageY - 100;
      var left = e.pageX;
      jQuery("#deckgy-context-menu").css({
        display: "block",
        top: top,
        left: left,
        position: "fixed"
      }).addClass("show");
      return false; //blocks default Webbrowser right click menu
    }).on("click", function() {
      jQuery("#deckgy-context-menu").removeClass("show").hide();
    });    
}

jQuery('.background-card').on('contextmenu', function(e) {
  switchContext('overview');    
  var top = e.pageY - 100;
  var left = e.pageX;
  jQuery("#context-menu").css({
    display: "block",
    top: top,
    left: left,
    position: "fixed"
  }).addClass("show");
  return false; //blocks default Webbrowser right click menu
}).on("click", function() {
  jQuery("#context-menu").removeClass("show").hide();
});

jQuery("#context-menu a, #card-context-menu a, #deckgy-context-menu a").on("click", function() {
  jQuery(this).parent().removeClass("show").hide();
});

function rebindClick(){
    jQuery(".playarea-card, .insidedeck, .insideextradeck").on("click", function(e) {

        switchContext('card');
        
        if(jQuery(e.currentTarget).hasClass('insidedeck')){
            //Left click cards in the main deck
            jQuery(e.currentTarget).find(">:first-child").addClass('insidedeck').removeClass("deck-list-card").addClass("removed-from-hand");
            cardtarget = jQuery(e.currentTarget).find(">:first-child");
        }else if(jQuery(e.currentTarget).hasClass('insideextradeck')){
            //Left click cards in the extra deck
            jQuery(e.currentTarget).find(">:first-child").addClass('insideextradeck').removeClass("deck-list-card").addClass("removed-from-hand");
            cardtarget = jQuery(e.currentTarget).find(">:first-child");        
        }else{
            cardtarget = e.currentTarget;
        }
    
    });
}

jQuery("#zone-playarea").on("click", function(e) {
    //switchContext('overview');
});

document.addEventListener('click', function(e){
  let inside = (e.target.closest('#context-menu'));
  if(!inside){
    jQuery('#context-menu').removeClass("show").hide();
  }
});

//HOTKEYS
document.onkeyup = function () {
    var e = e || window.event; // for IE to cover IEs window event-object
    if (context == 'card') { //Card Hotkeys
    switch (e.key) {
          case "h":
            //Return to Hand
            returnToHand();
            jQuery('.dropdown-menu-tool').removeClass("show").hide();
            break;
          case "r":
            //Rotate Card
            rotateCard();
            jQuery('.dropdown-menu-tool').removeClass("show").hide();
            break;
          case "g":
            //Send to GY
            sendToGY();
            jQuery('.dropdown-menu-tool').removeClass("show").hide();
            break;     
          case "c":
            //View Card
            viewCard();
            jQuery('.dropdown-menu-tool').removeClass("show").hide();
            break;             
          default:
            //statements to execute
            break;
        }        
    }else{ //Overview Hotkeys
        switch (e.key) {
          case "f":
            //Draw Card
            drawCard();
            break;
          case "g":
            //View Graveyard
            viewGY();
            break;   
          case "e":
            //View Extra Deck
            ViewExtraDeck();
            break;  
          case "d":
            //View Deck
            viewDeck();
            break;        
          default:
            //statements to execute
            break;
        }
    }
}