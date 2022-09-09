<?php
    include '../includes/session_check.php';
    include '../includes/playtest_deck.php';
?>
<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Playtest a Yu-Gi-Oh! Deck on YGOPRODeck.">

    <link rel="icon" href="https://images.ygoprodeck.com/images/assets/cropped-applogo_high-1-32x32.png" sizes="32x32" />
    <link rel="icon" href="https://images.ygoprodeck.com/images/assets/cropped-applogo_high-1-192x192.png" sizes="192x192" />

    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Playtest a Yu-Gi-Oh! Deck - ygoprodeck.com" />
    <meta property="og:description" content="Playtest a Yu-Gi-Oh! Deck on YGOPRODeck." />
    <meta property="og:url" content="https://ygoprodeck.com/decks/playtest/" />
    <meta property="og:site_name" content="YGOPRODeck" />
    <meta property="fb:app_id" content="396939581398014" />
    <meta property="og:image" content="https://images.ygoprodeck.com/images/assets/OpenGraph_Summary.png" />
    <meta property="og:image:secure_url" content="https://images.ygoprodeck.com/images/assets/OpenGraph_Summary.png" />
    <meta property="og:image:width" content="240" />
    <meta property="og:image:height" content="240" />   
    <link rel="canonical" href="https://ygoprodeck.com/decks/playtest/" />
    
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="Playtest a Yu-Gi-Oh! Deck on YGOPRODeck." />
    <meta name="twitter:title" content="Playtest a Yu-Gi-Oh! Deck - ygoprodeck.com" />
    <meta name="twitter:image" content="https://images.ygoprodeck.com/images/assets/OpenGraph_Summary.png" />
    
    <title>Playtest a Yu-Gi-Oh! Deck - YGOPRODeck</title>

<!-- Header -->
<?php include '../includes/header.php' ?>
<link rel="stylesheet" href="/decks/css/playtest.css?v=1.00">
<script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script> <!-- InteractJS is used for the Drag/Drop functionality https://interactjs.io/ -->
<script type="text/javascript" src="/js/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="/js/bootstrap.bundle.min.js"></script>
<!-- End Header Include -->

<div class="board">
    <div id="zone-playarea" class="dropzone"></div>
    <div id="deck-info-bottom" class="footer fixed-bottom text-center p-2" style="background-color:#b2591a;color:white;">
        <div class="row w-100">
            <div class="col-9">
                <div class="mb-1 ml-3 text-left">Hand (<span class="handsize">0</span>)</div>
                <div id="play-hand"></div>
            </div>
            <div class="col text-center">
                <div class="row w-100">
                    <div class="col">
                        <div id="deck-size" class="mb-1">Deck: (<span class="decksize"></span>)</div>
                        <img src="https://images.ygoprodeck.com/images/assets/CardBack.jpg" class="background-card" onclick="drawCard();" title="Draw Card">
                        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-tool" id="context-menu">
                          <a class="dropdown-item" href="#" onclick="viewDeck()"><div class="d-flex"><div class="mr-auto">View Deck</div><div><small class="text-muted">D</small></div></div></a>
                          <a class="dropdown-item" href="#" onclick="drawCard()"><div class="d-flex"><div class="mr-auto">Draw Card</div><div><small class="text-muted">F</small></div></div></a>
                          <a class="dropdown-item" href="#" onclick="shuffleDeck('notify')">Shuffle Deck</a>
                        </div>   
                        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-tool" id="card-context-menu">
                          <a class="dropdown-item" href="#" onclick="rotateCard()"><div class="d-flex"><div class="mr-auto">Rotate</div><div><small class="text-muted">R</small></div></div></a>
                          <a class="dropdown-item" href="#" onclick="sendToGY()"><div class="d-flex"><div class="mr-auto">Send to GY</div><div><small class="text-muted">G</small></div></div></a>
                          <a class="dropdown-item" href="#" onclick="returnToHand()"><div class="d-flex"><div class="mr-auto">Return to Hand</div><div><small class="text-muted">H</small></div></div></a>
                          <li class="divider bg-tool-line"></li>
                          <a class="dropdown-item" href="#" onclick="viewCard()"><div class="d-flex"><div class="mr-auto">View Card</div><div><small class="text-muted">C</small></div></div></a>
                          <a class="dropdown-item" href="#" onclick="viewCardDecks()">View Decks /w Card</a>
                        </div>
                    </div>
                    <div class="col">
                        <div id="deck-size" class="mb-1">Graveyard (<span class="gysize">0</span>)</div>
                        <div id="graveyard" class="dropzone" onclick="viewGY()" title="View Graveyard"></div>
                    </div>                    
                    <div class="col">
                        <div><button type="button" class="btn btn-secondary mb-2" onclick="ViewExtraDeck();">Extra Deck</button></div>
                        <div><button type="button" class="btn btn-secondary mb-2" onclick="resetAll();">Reset</button></div>
                        <div><button type="button" class="btn btn-secondary" onclick="jQuery('#show-beta').modal('toggle');">Info</button></div>
                        <div><small>Context: <span class="context-status">Overview</span></small></div>
                    </div>                    
                </div>
            </div>
        </div>
        
    </div> 
    
    <!-- Main Deck Modal -->
    <div class="modal fade" id="viewDeck" tabindex="-1" role="dialog" aria-labelledby="viewDeck" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewdeckmodal">View Current Deck <small><span class="decksize"></span> Cards</small></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <div class="deck-list"></div>
          </div>
        </div>
      </div>
    </div>    
    
    <!-- Extra Deck Modal -->
    <div class="modal fade" id="viewExtraDeck" tabindex="-1" role="dialog" aria-labelledby="viewExtraDeck" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewdeckmodal">View Extra Deck <small><span class="extradecksize"></span> Cards</small></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <div class="extra-deck-list"></div>
          </div>
        </div>
      </div>
    </div>      
 
    <!-- Deck/GY Conext Menu -->
    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-tool" id="deckgy-context-menu">
      <a class="dropdown-item" href="#" onclick="sendToField()">Send to Field</a>
      <a class="dropdown-item" href="#" onclick="sendToGY()"><div class="d-flex"><div class="mr-auto">Send to GY</div><div><small class="text-muted">G</small></div></div></a>
      <a class="dropdown-item" href="#" onclick="returnToHand()"><div class="d-flex"><div class="mr-auto">Return to Hand</div><div><small class="text-muted">H</small></div></div></a>
      <li class="divider bg-tool-line"></li>
      <a class="dropdown-item" href="#" onclick="viewCard()"><div class="d-flex"><div class="mr-auto">View Card</div><div><small class="text-muted">C</small></div></div></a>
      <a class="dropdown-item" href="#" onclick="viewCardDecks()">View Decks /w Card</a>
    </div>  
    
    <!-- GY Modal -->
    <div class="modal fade" id="viewGY" tabindex="-1" role="dialog" aria-labelledby="viewGY" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewgymodal">View GY <small><span class="gysize"></span> Cards</small></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <div class="deck-list-gy"></div>
          </div>
        </div>
      </div>
    </div>   
    
    <!-- Modal -->
    <div class="modal fade" id="show-beta" tabindex="-1" role="dialog" aria-labelledby="show-beta" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewbetamodal">YGOPRODeck Playtest Tool <strong>Beta</strong></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <p><small class="text-muted">Early Beta Version - <a href="https://github.com/AlanOC91/ygoprodeck-playtest" target="_blank">Issues/Contribute</a></small></p>
                <p>This tool will allow you to playtest YGOPRODeck decks in a single-player fashion.</p>
                <p>It allows you to draw and place cards, view your deck, extra deck, GY and more. In essence, it allows you to get a feel for how your deck will work in the opening turns.</p>
                <p>It does <strong>not</strong> have any card scripts for effects nor will it ever.</p>
                <p>You can <i class="fa-solid fa-computer-mouse"></i> <strong>Right Click</strong> on Cards, Deck, GY and more to open a special context control menu.</p>
                <p>This tool has been tested on <strong>Chrome</strong> and <strong>Firefox</strong> and is recommended you use a minimum resoluton of <strong>1366 x 768</strong> although a resolution of <strong>1920 x 1080</strong> is preferred.</p>
                <p>This tool is not suitable on a mobile device.</p>
                
                <div class="container text-center">
                  <div>Hotkeys <i class="fa-solid fa-keyboard"></i></div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="mb-2">Overview Context</div>
                      <div class="d-flex justify-content-between pl-5 pr-5">Draw Card <small class="font-weight-bold">F</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">View Deck <small class="font-weight-bold">D</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">View Extra Deck <small class="font-weight-bold">E</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">View Graveyard <small class="font-weight-bold">G</small></div>
                    </div>
                    <div class="col-sm">
                      <div class="mb-2">Card Context</div>
                      <div class="d-flex justify-content-between pl-5 pr-5">Return to Hand <small class="font-weight-bold">H</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">Rotate Card <small class="font-weight-bold">R</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">Send to GY <small class="font-weight-bold">G</small></div>
                      <div class="d-flex justify-content-between pl-5 pr-5">View Card <small class="font-weight-bold">C</small></div>                      
                    </div>
                  </div>
                </div>                
                
          </div>
        </div>
      </div>
    </div>       
    
</div> 

<!-- Toast Notification -->
<div class="toast" id="notifyToast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000" style="right: 10%;top:10%;position: fixed;z-index: 9999;">
  <div class="toast-header">
    <i class="fa-solid fa-gear"></i>
    <strong class="mr-auto" style="margin-left:5px;"> YGOPRODeck</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
  </div>
</div>
<!-- End Toast Notification --> 

<script type="text/javascript" src="https://ygoprodeck.com/decktool/js/common.js?v=3.04"></script> 
<link rel="stylesheet" href="https://ygoprodeck.com/decktool/css/tooltip.css?v=3.00">
<script type="text/javascript" src="https://ygoprodeck.com/decktool/js/tooltip.js?v=3.02"></script> 
 
<script>
var handsize = 0;
var graveyard = 0;
var deckcount = 0;
var extradeckcount = 0;
var cardtarget = "";
var maindeckjs = '<?php echo json_encode($maindeck); ?>';
var extradeckjs = '<?php echo json_encode($extradeck); ?>';
var main_deck = JSON.parse(maindeckjs);
var main_deck_og = JSON.parse(maindeckjs);
var extra_deck = JSON.parse(extradeckjs);
var extra_deck_og = JSON.parse(extradeckjs);
var original = '';
var gyarray = [];
var editmode = <?php echo $editmode; ?>;
var context = 'overview';

jQuery( document ).ready(function() {
    
    if(parseInt(editmode) == 0){
        //Deck loaded in cannot be playtested. Either due to it being private or incompatible.
        alert("This deck cannot be used in the playtest tool. It is either private or incompatible.");
        history.back(); //Back to previous page
    }else{
        shuffle(main_deck);
        deckcount = main_deck.length;
        
        if(extra_deck !== null){
            extra_deck = extra_deck_og.slice();
            extradeckcount = extra_deck.length;
        }else{
            extra_deck = [];
            extradeckcount = 0;    
        }
        
        jQuery('.extradecksize').html(extradeckcount);   
        
        jQuery('#show-beta').modal('toggle');
       
        jQuery('.decksize').html(deckcount);
       
        i = 0;
        while (i < 5) {
          drawCard();
          i++;
        }        
    }
    
});
</script> 
<script type="text/javascript" src="/decks/js/playtest.js?v=1.03"></script>
