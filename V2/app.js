var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v2",{useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var mongoose = require("mongoose");

app.get("/",function(req,res){
	res.render("landing");
})

//INDEX - shows the list of all campgrounds
app.get("/campgrounds",function(req,res){
	//GET all the campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log("err");
		}else{
			res.render("index",{campgrounds:allCampgrounds});

		}
	});
});

//CREATE - add new campground to DB
app.post("/campgrounds",function(req,res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}
	// Create a new campground and save to DB
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campground page
         	res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
})

//SHOW - Shows more info about one campground
app.get("/campgrounds/:id",function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("shows", {campground: foundCampground});
		}
	});
});

app.listen(3000,function(){
	console.log("The YelpCamp Has started");
});