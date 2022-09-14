import {BreadthFirstSearch} from './bfs.js'
import {DepthFirstSearch} from './dfs.js'
import {Astar} from './a-star.js'


let boxes =  undefined
let startIndex = null
let endIndex = null
let wall = []
let wallElements = []
let data = new Array(2)
let SIZE = 0
let SPEED = 0

function disableButtonControl(DFSButton,resetButton,wallButton,
    BFSButton,viSpeedSlider,gridSlider,DijkstraButton){
        DFSButton.setAttribute("disabled","disabled")
        resetButton.setAttribute("disabled","disabled")
        wallButton.setAttribute("disabled","disabled")
        BFSButton.setAttribute("disabled","disabled")
        viSpeedSlider.setAttribute("disabled","disabled")
        gridSlider.setAttribute("disabled","disabled")
        DijkstraButton.setAttribute("disabled","disabled")
}
function updateGrid(gridSlider){
    grid.innerHTML = ''
    let wid = grid.offsetWidth - 2;
    let w = wid/gridSlider.value
    // let h = w
    // console.log(wid)
    for(let i = 0; i<gridSlider.value*gridSlider.value;i++){
        let box = document.createElement('div')
        box.id = i+1;
        box.className = "box"
        // console.log(box)
        box.style.width = (w-2 +"px")
        box.style.height = (w-2 +"px")
        grid.appendChild(box)
    }
    boxes = grid.childNodes
    startIndex = null
    endIndex = null
    boxes.forEach((child)=>{
        child.ondblclick = ()=> {
            // console.log(child.id)
            if(startIndex===null){
                startIndex = child.id
                child.classList.add("startNode")
                child.style.backgroundColor = "blue"
            } else if(endIndex===null){
                endIndex = child.id
                child.style.backgroundColor = "teal"
                child.classList.add("destinationNode")
            } else{
                //Do Nothinge;
            }
        }
    })
}

function start() {
    let gridSlider = document.getElementById('gridSize')
    // let testButton = document.getElementById('test')
    // testButton.onclick = () =>{
    //     console.log('Clicked')
    // }
    // console.log(gridSlider.value)
    let gridSizeVal = document.getElementById('gridSizeVal')
    // let grid = document.getElementById('grid')
    updateGrid(gridSlider)
    gridSizeVal.innerText = gridSlider.value
    SIZE = gridSlider.value
    gridSlider.onchange = () => (
        // console.log(gridSlider.value),
        gridSizeVal.innerText = gridSlider.value,
        SIZE = gridSlider.value,
        updateGrid(gridSlider)
    )
    let viSpeedSlider = document.getElementById('visSpeed')
    // console.log(viSpeedSlider.value)
    let visSpeedVal = document.getElementById('visSpeedVal')
    visSpeedVal.innerText = viSpeedSlider.value
    SPEED = viSpeedSlider.value
    viSpeedSlider.onchange = () => (
        // console.log(viSpeedSlider.value),
        visSpeedVal.innerText = viSpeedSlider.value,
        SPEED = viSpeedSlider.value
    )
    let wallButton = document.getElementById('wall')
    let BFSButton = document.getElementById('BFS')
    let DFSButton = document.getElementById('DFS')
    let resetButton = document.getElementById('reset')
    let DijkstraButton = document.getElementById('Dijkstra')
    let AstarButton = document.getElementById('a-star')
    wallButton.onclick = () => {
        let wallNum = Math.floor((gridSlider.value)*(gridSlider.value)*0.25)
        // console.log(wallNum)
        while(wallNum>0){
            // console.log(Math.floor(Math.random()*(gridSlider.value*gridSlider.value + 1)))
            let genId = Math.floor(Math.random()*(gridSlider.value*gridSlider.value + 1))
            // console.log(startIndex)
            // console.log(endIndex)
            if(genId == startIndex || genId ==  endIndex){
                // Do Nothing
            } else {
                let ele =  document.getElementById(genId)
                if(!ele)
                continue
                if(ele.classList.contains('wall'))continue
                ele.classList.add("wall")
                // if(ele.classList.contains)
                wallElements.push(ele)
                wall.push(ele.id)
                wallNum  = wallNum - 1
            }
        }
        // wallElements = document.getElementsByClassName('wall')
        // console.log(wallElements)
    }
    BFSButton.onclick = () => {
        connectArray(SIZE)
        // console.log(data)
        disableButtonControl(DFSButton,resetButton,wallButton,
            BFSButton,viSpeedSlider,gridSlider,DijkstraButton)
            BreadthFirstSearch(data,startIndex,endIndex,6-SPEED)
    }
    DFSButton.onclick = () => {
        connectArray(SIZE)
        // console.log(data)
        disableButtonControl(DFSButton,resetButton,wallButton,
            BFSButton,viSpeedSlider,gridSlider,DijkstraButton)
            DepthFirstSearch(data,startIndex,endIndex,6-SPEED)
    }
    DijkstraButton.onclick = () => {
        connectArray(SIZE)
        // console.log(data)
        disableButtonControl(DFSButton,resetButton,wallButton,
            BFSButton,viSpeedSlider,gridSlider,DijkstraButton)
            BreadthFirstSearch(data,startIndex,endIndex,6-SPEED)
    }
    AstarButton.onclick = () =>{
        connectArray(SIZE)
        // console.log(data)
        disableButtonControl(DFSButton,resetButton,wallButton,
            BFSButton,viSpeedSlider,gridSlider,DijkstraButton)
            Astar(data,startIndex,endIndex,6-SPEED)
    }
    // BFSButton.onclick(BreadthFirstSearch(data,startIndex,endIndex,6-SPEED))
    resetButton.onclick  = () => {
        updateGrid(gridSlider),
        data =  new Array(2),
        SPEED = viSpeedSlider.value
        wall = []
    }
}

function connectArray(SIZE){
    //preprocessing the data
    let uniqueId = 1;
    for(let i=0;i<SIZE;i++){
        data[i]  = new Array(2)
    }
    // console.log(wall)
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            if(wall.indexOf(uniqueId.toString())==-1){
                // console.log(uniqueId)
                data[i][j]  = new Spot(i,j,false,uniqueId++);
            } else{
                // console.log(uniqueId)
                data[i][j]  = new Spot(i,j,true ,uniqueId++);
            }
        }
    }
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          data[i][j].connectFrom(data);
        }
      }
    //   console.log(data)
}

function Spot(i,j,isWall,id){
    this.i = i
    this.j = j
    this.id = id
    this.isWall = isWall
    this.neighbors = []
    this.path = []
    this.visited = false
    this.distance = Infinity
    this.heuristic = 0
    this.function = this.distance + this.heuristic
    this.source = ""
    this.connectFrom = function(data) {
        var i  = this.i
        var j = this.j
        if(i>0 && !(data[i-1][j].isWall)){
            this.neighbors.push(data[i-1][j])
        }
        if(i<SIZE-1 && !(data[i+1][j].isWall)){
            this.neighbors.push(data[i+1][j])
        }
        if(j>0 && !(data[i][j-1].isWall)){
            this.neighbors.push(data[i][j-1])
        }
        if(j<SIZE-1 && !(data[i][j+1].isWall)){
            this.neighbors.push(data[i][j+1])
        }
    }
}

start()
