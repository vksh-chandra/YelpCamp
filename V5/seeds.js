var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
    	name: "Cloud's rest",
    	image:"https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    	description: "camp ground is great and you shuld stay there for few days almighty. this is awesom to stay there and cost is esy but you can not find toilet there but the nauture is welcoming you free charge yourself in open space. the river water sonnd will sooth you and the night will amaze you. i will surely say that you shold go there and stay for few days. you will thank me after that. this is what i need to say see you there"
    },
    {
    	name: "Camp Fire",
    	image:"https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    	description: "camp ground is great and you shuld stay there for few days almighty. this is awesom to stay there and cost is esy but you can not find toilet there but the nauture is welcoming you free charge yourself in open space. the river water sonnd will sooth you and the night will amaze you. i will surely say that you shold go there and stay for few days. you will thank me after that. this is what i need to say see you there"
    },
    {
    	name: "Near Nature",
    	image:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    	description: "camp ground is great and you shuld stay there for few days almighty. this is awesom to stay there and cost is esy but you can not find toilet there but the nauture is welcoming you free charge yourself in open space. the river water sonnd will sooth you and the night will amaze you. i will surely say that you shold go there and stay for few days. you will thank me after that. this is what i need to say see you there"
    }
]

function seedDB(){
    //Remove all campgrounds
	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("Removed Campground");

	 //add a few campgrounds
    data.forEach(function(seed){
    	Campground.create(seed,function(err, campground){
    		if(err){
    			console.log(err);
    		}else {
    			console.log("added few campgrounds");
    			//cfeate comment
    			Comment.create(
    				{
    					text:"This place is greate",
    					author: "Homer"
    		        }, function(err, comment){
    		        	if(err){
    		        		console.log(err);
    		        	} else{
    		        		campground.comments.push(comment);
    		        	    campground.save();
    		        	    console.log("Created new comment");
    		        	}
    		        	
    		        });
    		}
    	})
    });

    });

}


module.exports = seedDB;