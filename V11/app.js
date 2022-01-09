var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground"),
methodOverride  = require("method-override"),
    flash       = require("connect-flash"),
    Comment     = require("./models/comment"),
    passport    = require("passport"),
    LocalStrategy= require("passport-local"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//requring routes 
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp_v10",{useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again rusty win cutest dog",
	resave: false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
	next();
})

app.use(authRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000,function(){
	console.log("The YelpCamp Has started");
});