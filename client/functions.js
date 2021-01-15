function namePosition(clientName){
    // if(typeof config.players[clientName] !== 'undefined'){  
    //     let pos = config.players[clientName];              
    //     if(clientName === self){
    //         return {
    //             x:pos.x,
    //             y:pos.y + 170
    //         };
    //     }else{
    //         return {
    //             x:pos.x,
    //             y:pos.y + 120
    //         };
    //     }
    // }
    var pl = config.players = [clientName];  
    
    return config;
}

function gameStateResponse(response){
    client = response.client;

    clients = response.clients;
    
    game.events = response.game.events;
    game.winner = response.game.winner;
    game.ready = response.game.ready;

    if(!config.initialized && response.game.cards.length > 0){
        config.initialized = true;
        //initDeck(response.game.cards);
    
    }else if(config.initialized && response.game.events.length > 0){
        if(!config.playersInitialized){
            config.playersInitialized = true;
            //initClientsConfig(state.clients);
        }              
        //processEvents();
    }
    updateState(response.game.cards);
    //updateDiscardDeck();

    console.log(client);
}

function updateState(cards){
    for(let i=0; i<game.cards.length; i++){
        if(typeof cards[i] === 'undefined')continue;
        game.cards[i].moveId = cards[i].moveId;    

        if(cards[i].owner !== game.cards[i].owner){
            //this.cardSetOwner(game.cards[i], cards[i].owner);
            console.log(game.cards);
        }

        game.cards[i].owner = cards[i].owner;
        game.cards[i].type = cards[i].type;    
        game.cards[i].nextMoveValid = cards[i].nextMoveValid;                    
    }
}