var grid = [];

var current;

var stack = [];

var widthOfCells = 15 ;var flag = 0;


function setup() {
  
    createCanvas(800 , 600);
    frameRate(1000);
    
    for(var j = 0; j < floor(height / widthOfCells); j++){
      for(var i = 0; i < floor(width / widthOfCells); i++){
        
        var c = new Cell(i , j);
        grid.push(c);
      }
    }
    
    current = grid[0];
   
}

function draw() {
    background(127);
    
    for(let i = 0; i < grid.length; i++){
       grid[i].show();
    }
    
    current.visited = true;
    
    var next = current.getNeighbours();
    
    if(next){
      next.visited = true;
      
      stack.push(current);
      
      removeWalls(current , next);
      current = next;
    }
    else if(stack.length > 0){
      current = stack.pop();
    }
    
    if(stack.length == 0){
      save('myCanvas.jpg');
      noLoop();
    } 
  
}

function index(i, j){
    if(i < 0 || j < 0 || i > floor(width / widthOfCells) - 1 || j > floor(height / widthOfCells) - 1){
      return -1;
    }
    else{
      return i + j * floor(width / widthOfCells);
    }
  }
  
function Cell(i , j)
{
  this.i = i;
  this.j = j;
 
  this.visited = false;
  this.marked = new Array(true , true, true , true); 
  
  
  var x = i * widthOfCells;
  var y = j * widthOfCells;
  
  this.getNeighbours = function(){
    var neighbours = [];
    {
      var top = grid[index(i , j - 1)];
      var left = grid[index(i - 1, j)];
      var bottom = grid[index(i , j + 1)];
      var right = grid[index(i + 1 , j)];
      
      
      if(top && !top.visited){
        neighbours.push(top);
      }
      
      if(left && !left.visited){
        neighbours.push(left);
      }
      
      if(bottom && !bottom.visited){
        neighbours.push(bottom);
      }
      
      if(right && !right.visited){
        neighbours.push(right);
      }
      
      if(neighbours.length > 0){
        var r = floor(random(0 , neighbours.length));
        return neighbours[r];
      }
      else{
        return undefined;
      }
    }
  }
 
  this.show = function(){
    
    stroke(0);
     
    //top
    if(this.marked[0]){
      line(x , y , x + widthOfCells , y);
    }
    //left
    if(this.marked[1]){
      line(x , y , x , y + widthOfCells);
    }
    //right
    if(this.marked[2]){
      line(x + widthOfCells , y , x + widthOfCells , y + widthOfCells);
    }
    //buttom
    if(this.marked[3]){
      line(x , y + widthOfCells , x + widthOfCells , y + widthOfCells);
    }
    
    if(this.visited){
      noStroke();
      rect(x , y , widthOfCells , widthOfCells);
      fill(255 , 0 , 0 , 100);
    }
    
  }
  
}

function removeWalls(a , b){
    if(a.i - b.i == 1){
      a.marked[1] = false;
      b.marked[2] = false;
    }
    else if(a.i - b.i == -1){
      a.marked[2] = false;
      b.marked[1] = false;
    }
      
    if(a.j - b.j == 1){
      a.marked[0] = false;
      b.marked[3] = false;
    }
    else if(a.j - b.j == -1){
      a.marked[3] = false;
      b.marked[0] = false;
    }
}
