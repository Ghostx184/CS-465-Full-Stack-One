const fs = require('fs');
const room = JSON.parse(fs.readFileSync('./data/rooms.json','utf8'));


/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', {title: 'room Getaways', room });
   };
   module.exports = {
    room
   };
   