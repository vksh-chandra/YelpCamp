var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");

//INDEX - shows the list of all campgrounds
router.get("/",function(req,res){
	//GET all the campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log("err");
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});

		}
	});
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req,res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id : req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, image:image, description:desc, author: author}
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
router.get("/new",function(req,res){
	res.render("campgrounds/new.ejs");
})

//SHOW - Shows more info about one campground
router.get("/:id",isLoggedIn, function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;