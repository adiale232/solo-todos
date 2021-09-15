const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

//const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');


// settings
app.set('port', process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// middlewares
app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
//app.use(indexRoutes);
app.use('/todos', todosRoutes); 


// static files
app.use(express.static(path.join(__dirname, 'dist')));


// start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});