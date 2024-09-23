const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/admin-panel')
    .then(() => console.log('Database Connected!')).catch((error) => {
        console.log("Error", error);
    })

