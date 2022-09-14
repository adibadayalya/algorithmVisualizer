var Data;
var visited = [];
var spotted = false
let wallButton = document.getElementById('wall')
let BFSButton = document.getElementById('BFS')
let DFSButton = document.getElementById('DFS')
let resetButton = document.getElementById('reset')
let viSpeedSlider = document.getElementById('visSpeed')
let gridSlider = document.getElementById('gridSize')
let DijkstraButton = document.getElementById('Dijkstra')

//Implementing BFS Traversal
export function DepthFirstSearch(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
    visited = [];
    //console.log(Data[0][0]);
    let found = false;
    // console.log(startNode)
    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                found = true;
                break;
            }
            if(found){
                break;
            }
        }
    }
    // console.log(startNode)
    graphTraversal(startNode,endNode);
    dfsanimate(visited,endNode,SPEED);
}
//Recursion
function graphTraversal(node,stop){
    //console.log(node);
    if(spotted){
        //pass
    }else{
        node.visited = true;
        // console.log(node);
        visited.push(node.id);
        for (let i = 0; i < node.neighbors.length; i++) {
            if(!node.neighbors[i].visited){
                graphTraversal(node.neighbors[i]);
            }  
        }
        if(node.id==stop){
            spotted = true;
        }
    }
}

//Animate
function dfsanimate(data,stop,speed){
    //console.log(data);
    //console.log(stop);
    let notFound = true;
    for(var i=0;i<data.length;i++){
        let x = data[i]
        let ele = document.getElementById(x)
        // console.log(x)
        // console.log(data[i])
        if(x!=stop){
            setTimeout(() => {
                ele.classList.add('animate')
            }, (i+1)*20*speed);
        } else{
            notFound = false
            setTimeout(() => {
                alert("Element Found! \nNode visited after searching "+(i-1)+" nodes.")
                DFSButton.removeAttribute("disabled")
                resetButton.removeAttribute("disabled")
                wallButton.removeAttribute("disabled")
                BFSButton.removeAttribute("disabled")
                viSpeedSlider.removeAttribute("disabled")
                gridSlider.removeAttribute("disabled")
                DijkstraButton.removeAttribute("disabled")
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
    button.disabled = false
}
