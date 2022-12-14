function taquin() {
    let ratioImage=getComputedStyle(document.documentElement).getPropertyValue('--ratioImage');
    /*Sélection de toutes les div identifiées pièces, dans un tableau "lesPieces", on range leurs réfèrences*/
    let lesPieces = document.getElementsByClassName("piece");
    /*Find the invisible piece:*/
    pieceInvisible = document.querySelector("#pieceInvisible");
    /*Get his style :*/
    stylePieceInvisible = getComputedStyle(pieceInvisible);
    /*Create an Array of an playable order of pieces */
    let shuffleArray=[9,11,2,14,15,1,3,8,16,7,4,12,5,13,6,10];
    /*Loop on taquin's pieces*/
    for (let i = 0; i < lesPieces.length; i++) {
        let largeurPiece=100;
        let hauteurPiece=largeurPiece*ratioImage;
        let chaquePiece = lesPieces[i];
        /*Background image position for each piece*/
        chaquePiece.style.backgroundPositionX=`${-(i%4)*largeurPiece}px`;
        chaquePiece.style.backgroundPositionY=`${-Math.floor(i/4)*hauteurPiece}px`;
        /*Background is ok for each piece */
        chaquePiece.style.order =shuffleArray[i];
        /*Listenner on each piece */
        chaquePiece.addEventListener("click", joue);
    };
};
function joue(evt) {
    //Get the style of the clicked piece
    let sonStyle = getComputedStyle(evt.target);
    //Check if this piece is cliquable
    if (pieceCliquable(stylePieceInvisible.order, sonStyle.order)) {
        //If true, the order of the invisible piece become the order of the clicked piece
        let temporaryOrder = pieceInvisible.style.order;
        pieceInvisible.style.order = sonStyle.order;
        evt.target.style.order = temporaryOrder;
        console.log('La pièce invisible qui est en position ' + stylePieceInvisible.order + ' prend la position de la piece cliquée ' + sonStyle.order);
        console.log("Index de pièce cliquée"+aGetPiecesOrder().indexOf(Number(temporaryOrder)));
		setIntervall(temporaryOrder)
    } 
   if( testIssue()){
    //Test issue tell if the taquin is in order
    //If thats true end of the gagme.
        endOfGame();
   };
};
function pieceCliquable(pieceInvisible, pieceAtester, largueurTaquin = 4) {
    pieceInvisible = Number(pieceInvisible);
    pieceAtester = Number(pieceAtester);
    //Cliquable est définit comme true quand l'ordre de la piece testée est égale à l'ordre de la pièce invisible,-1 ou +1 ou -4 ou +4 sauf quand le reste de la division de l'orde de la piece invisible par la largeur du taquin est égal à 1 ou à 0
    let jouable = (pieceAtester == (pieceInvisible - 1) && (pieceInvisible % largueurTaquin != 1)) // Vérifie si déplaçable vers la gauche
        ||
        (pieceAtester == (pieceInvisible + 1) && (pieceInvisible % largueurTaquin != 0)) // Vérifie si déplaçable vers la droite
        ||
        (pieceAtester == (pieceInvisible + largueurTaquin)) // Vérifie si déplaçable vers le bas
        ||
        (pieceAtester == (pieceInvisible - largueurTaquin)); // Vérifie si déplaçable vers le haut
    return jouable;
}

function aGetPiecesOrder() {
    //Tidy the flex order of taquin's pieces in an array. Return this array
    let lesPieces = document.getElementsByClassName("piece");
    let orderArray=[];
    stylePieceInvisible = getComputedStyle(pieceInvisible);
    for (let i = 0; i < lesPieces.length; i++) {
        let chaquePiece = lesPieces[i];
        let sonStyle = getComputedStyle(chaquePiece);
        let sonOrdre=Number(sonStyle.order);
        orderArray.push(sonOrdre);
		console.log(orderArray)
    };
    return orderArray
};

function testIssue(){
    let nbrPiecesOrdonnees=0;
    let lesPieces = document.getElementsByClassName("piece");
    let nbrPieces= lesPieces.length;
    for(let i=0; i<nbrPieces;i++){
        let chaquePiece=lesPieces[i];
        let sonStyle=getComputedStyle(chaquePiece);
        if(sonStyle.order==i+1){
            nbrPiecesOrdonnees+=1;
        }
        if(nbrPiecesOrdonnees>14){
            return true;
        }
    }   
}
var displayedNumero=false;
function displayPiecesNumber(){
    let pieces=document.getElementsByClassName("piece");
    if(displayedNumero===false){
        for (i=0; i<pieces.length; i++){
            let piece=pieces[i]
            //Display the number of the piece
            piece.textContent=i+1;
        }
        displayedNumero=true;
    }else{
        for (i=0; i<pieces.length; i++){
            let piece=pieces[i]
            piece.textContent=" ";
        }
        displayedNumero=false;
    }
}
function endOfGame(){
    let lesPieces = document.getElementsByClassName("piece");
    /*The invisible piece is not any more*/
    document.getElementById("pieceInvisible").style.visibility ="visible";
	document.getElementById("pieceInvisible").style.backgroundColor = "blue";;
        /*Boucle sur les  */
        for (let i = 0; i < lesPieces.length; i++) {
            /*Kill Listenner on each piece */
            let chaquePiece = lesPieces[i];
            chaquePiece.removeEventListener("click", joue);
        };
		stopOnTimeNextPiece()
		playThere(0)
}