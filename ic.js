let rows=3, columns=3;
let currTile, blankTile;
let Turns=0;

let  tileOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"]; 

window.onload = function(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){
            let tile = document.createElement("img");
            tile.id = i.toString() + "-" + j.toString();
            tile.src = tileOrder.shift() + "ic.jpg";
        
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile=this;
}
function dragOver(Tile){
    Tile.preventDefault();
}
function dragEnter(Tile){
    Tile.preventDefault();
}
function dragLeave(Tile){
    Tile.preventDefault();
}
function dragDrop(){
    blankTile=this;
}
function dragEnd(){  
    if(!blankTile.src.includes("3ic.jpg")){
        return ;
    }

    let currCords = currTile.id.split('-');
    let r=parseInt(currCords[0]);
    let c=parseInt(currCords[1]);
    
    let blankCords = blankTile.id.split('-');
    let r1=parseInt(blankCords[0]);
    let c1=parseInt(blankCords[1]);
    
    let moveLeft = (r==r1 && c1==c-1);
    let moveRight= (r==r1 && c1==c+1);
    let moveUp= (c==c1 && r1==r+1);
    let moveDown= (c==c1 && r1==r-1);
    
    let isAdjacent=(moveDown || moveLeft || moveRight || moveUp);
    
    if(isAdjacent){
       let currImg = currTile.src;
       let blankImg = blankTile.src;

       currTile.src = blankImg;
       blankTile.src = currImg;
       Turns++;
       document.getElementById("turns").innerText = Turns;
    }
}
