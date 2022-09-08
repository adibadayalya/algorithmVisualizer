boxes =  null
startIndex = null
endIndex = null
function updateGrid(gridSlider){
    grid.innerHTML = ''
    wid = grid.offsetWidth - 2;
    w = wid/gridSlider.value
    h = w
    // console.log(wid)
    for(i = 0; i<gridSlider.value*gridSlider.value;i++){
        box = document.createElement('div')
        box.id = i+1;
        box.className = "box"
        // console.log(box)
        box.style.width = (w-2 +"px")
        box.style.height = (w-2 +"px")
        grid.appendChild(box)
    }
    boxes = grid.childNodes
    boxes.forEach((child)=>{
        child.ondblclick = ()=> {
            // console.log(child.id)
            if(startIndex===null){
                startIndex = child.id
                child.style.backgroundColor = "black"
            } else if(endIndex===null){
                endIndex = child.id
                child.style.backgroundColor = "black"
            } else{
                //Do Nothing
            }
        }
    })
}

function start() {
    gridSlider = document.getElementById('gridSize')
    // console.log(gridSlider.value)
    gridSizeVal = document.getElementById('gridSizeVal')
    grid = document.getElementById('grid')
    updateGrid(gridSlider)
    gridSizeVal.innerText = gridSlider.value
    gridSlider.onchange = () => (
        // console.log(gridSlider.value),
        gridSizeVal.innerText = gridSlider.value,
        updateGrid(gridSlider)
    )
    viSpeedSlider = document.getElementById('visSpeed')
    // console.log(viSpeedSlider.value)
    visSpeedVal = document.getElementById('visSpeedVal')
    visSpeedVal.innerText = viSpeedSlider.value
    viSpeedSlider.onchange = () => (
        // console.log(viSpeedSlider.value),
        visSpeedVal.innerText = viSpeedSlider.value
    )
    wallButton = document.getElementById('wall')
    wallButton.onclick = () => {
        wallNum = Math.floor((gridSlider.value)*(gridSlider.value)*0.3)
        // console.log(wallNum)
        while(wallNum>0){
            // console.log(Math.floor(Math.random()*(gridSlider.value*gridSlider.value + 1)))
            genId = Math.floor(Math.random()*(gridSlider.value*gridSlider.value + 1))
            // console.log(startIndex)
            // console.log(endIndex)
            if(genId == startIndex || genId ==  endIndex){
                // Do Nothing
            } else {
                ele =  document.getElementById(genId)
                if(ele)ele.style.backgroundColor = "lightblue"
                wallNum  = wallNum - 1
            }
        }
    }
    resetButton = document.getElementById('reset');
    resetButton.onclick  = () => {
        updateGrid(gridSlider)
    }
}

start()
