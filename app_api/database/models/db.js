const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = 'mongodb://' + host + '/travlr'
const readLine = require('readline');

console.log("dbURI=" + dbURI);

// avoid 'current Server Discover and Monitoring engine is deprecated'
mongoose.set('useUnifiedTopology', true);

const connect = () => {
setTimeout(() => mongoose.connect(dbURI, {
useNewUrlParser: true,
useCreateIndex: true
}), 1000);
}
const gracefulShutdown = (msg, callback) => {

};

mongoose.connection.on('connected', () => {            
  console.log(`Mongoose connected to ${dbURI}`);       
});                                                    
mongoose.connection.on('error', err => {               
  console.log(`Mongoose connection error:`, err);      
});                                                    
mongoose.connection.on('disconnected', () => {         
  console.log(`Mongoose disconnected`);                
});  

if (process.platform === 'win32'){
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit ("SIGINT");
  });
}

process.once('SIGUSR2', () => { 
});
process.on('SIGINT', () => {
});
process.on('SIGTERM', () => {
});
  
connect();

// bring in the Mongoose scheme
require('./models/travlr');
require('./controllers/users');
require('./controllers/user');