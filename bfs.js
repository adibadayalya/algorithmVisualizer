var Data;
var Queue = [];
var visited = [];
let wallButton = document.getElementById('wall')
let BFSButton = document.getElementById('BFS')
let DFSButton = document.getElementById('DFS')
let resetButton = document.getElementById('reset')
let viSpeedSlider = document.getElementById('visSpeed')
let gridSlider = document.getElementById('gridSize')
let DijkstraButton = document.getElementById('Dijkstra')
//Implementing BFS Traversal
export function BreadthFirstSearch(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
    Queue = [];
    visited = [];
    // console.log(Data[0][0]);        
    let found = false;
    // console.log(arrayData)
    // console.log('cis')

    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                startNode.source = undefined
                found = true;
                break;
            }
            if(found){
                break;
            }
        }
    }
    // console.log(startNode)

    Queue.push(startNode);
    visited.push(startNode);
    //console.log(Queue);
    //console.log(visited);

    while(Queue.length != 0){
        let x = Queue.shift();
        //console.log(x);
        for (let i = 0; i < x.neighbors.length; i++) {
            if (checkVisitedNode(x.neighbors[i])){
                x.neighbors[i].source = x
                Queue.push(x.neighbors[i]);
                visited.push(x.neighbors[i]);
            }
        }
    }
    bfsAnimate(visited,endNode,SPEED)
}

//Check Visited Node
function checkVisitedNode(node){
    for (let i = 0; i < visited.length; i++) {
        if(node == visited[i]){
            return false;
        }   
    }
    return true;
}

function bfsAnimate(data, stop, speed){
    let notFound = true;
    for(var i=0;i<data.length;i++){
        let x = data[i].id
        let ele = document.getElementById(x)
        // console.log(data[i])
        if(x!=stop){
            setTimeout(() => {
                ele.classList.add('animate')
            }, (i+1)*20*speed);
        } else{
            notFound = false
            setTimeout(() => {
                DFSButton.removeAttribute("disabled")
                resetButton.removeAttribute("disabled")
                wallButton.removeAttribute("disabled")
                BFSButton.removeAttribute("disabled")
                viSpeedSlider.removeAttribute("disabled")
                gridSlider.removeAttribute("disabled")
                DijkstraButton.removeAttribute("disabled")
                let v = data[i]
                while(v!=undefined){
                    let element = document.getElementById(v.id)
                    element.classList.add('path')
                    v = v.source
                }
                alert("Element Found! \nNode visited after searching "+(i-1)+" nodes.")
            }, (i+3)*20*speed);
            break
        }
    }
    if(notFound){
        setTimeout(function(){
            alert("Element Can not be Reached")
            DFSButton.removeAttribute("disabled")
            resetButton.removeAttribute("disabled")
            wallButton.removeAttribute("disabled")
            BFSButton.removeAttribute("disabled")
            viSpeedSlider.removeAttribute("disabled")
            gridSlider.removeAttribute("disabled")
            DijkstraButton.removeAttribute("disabled")
        },(i+3)*20*speed);
    }
}