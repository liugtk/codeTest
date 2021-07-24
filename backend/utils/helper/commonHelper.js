
module.exports = {
    isTimeBetween9to17
}
// todo: consider the timezone case
function isTimeBetween9to17() {
    var d = new Date();
    var n = d.getHours();
    if (n >= 9 && n < 17) {
        return true
    }
    else {
        return false
    }
}