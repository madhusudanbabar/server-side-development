var rect = require("./rect")

function solveRect(x, y) {
    console.log(`solving for x:y = ${x}:${y}`);
    if (x <=0 || y <=0) {
        console.log("the sides must be greater than zero");
        return
    }
    else{
        console.log(`perimeter is ${rect.perimeter(x, y)}`);
        console.log(`area is ${rect.area(x, y)}`);        
    }
}

solveRect(2, 5);
solveRect(9,5);
solveRect(0, 8);
solveRect(-6, -8);