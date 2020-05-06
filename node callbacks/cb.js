module.exports = (x, y, callback) =>{
    if (x <= 0 || y <= 0) {
        setTimeout(() => {
            callback(new Error("dimensions must be greater than zero", null))
        }, 2000)
    }
    else {
        setTimeout(() => {
            callback(null, 
                {
                    perimeter: () => (x*y)
                })
        }, 2000)
    }
}

