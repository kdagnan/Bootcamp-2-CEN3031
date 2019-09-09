/* Add all the required libraries*/

/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

Listing = require("./ListingSchema.js"); 
mongoose = require("mongoose");
config = require('./config.js');

mongoose.connect(config.db.uri, { useNewUrlParser: true }).then(success => {
  console.log("Successfully Connected to Database");
});

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.findOne({"name": "Library West"}, function(err, listing){
    if(!err){
      console.log("Found Library West: " + JSON.stringify(listing));
    }else{
      console.error("Error: "+ JSON.stringify(err));
    }
  });

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOne({ code:"CABL" }, function (err, listing){
    if(err){
      console.error("Error: "+ JSON.stringify(err));
    }else{
      console.log("Deleting..." + JSON.stringify(listing));
    }
  }).remove(function (err){
    if(!err){
      console.log("Successfully Deleted");
    }
  });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  Listing.findOne({name: "Phelps Laboratory"}, function(err, listing){ 
    if(err){
     console.error("Error Finding: "+ JSON.stringify(err));
    }
    
  }).update({ address: "1953 Museum Rd, Gainesville, FL 32603"}, function(err){
    if(err){
      console.error("Error Updating: "+JSON.stringify(err));
    }
  }).then(function(){
    Listing.findOne({name: "Phelps Laboratory"}, function(err, listing){ 
      if(err){
       console.error("Error Finding: "+ JSON.stringify(err));
      }else{
        console.log("Updated: "+ listing);
      }
      
    })
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find(function(err, listings){
    if(!err){
      console.log("All Listings: "+ JSON.stringify(listings));
    }else{
      console.error("Error Received: " + err);
    }
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();