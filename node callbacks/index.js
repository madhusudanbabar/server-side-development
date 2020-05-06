var cb = require("./cb")

cb(0, 9, (err,res)=>{
    if (err) {
        console.log(err.message);
    }
    else{
        console.log(`area is ${res.perimeter()}`);
    }
})

console.log("this is the last line");
