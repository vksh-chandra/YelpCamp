var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds= [
        {name: "salmon Creek",image:" joe.jpg" },
        {name:"Granite Hill", image: " https://www.google.com/url?sa=i&url=https%3A%2F%2Finvinciblengo.org%2Fevents%2Fmanali-summer-adventure-camp-himachal-pradesh&psig=AOvVaw0wgzlt6Sq3beIn6ajC-Udn&ust=1580557306688000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMC9if3grecCFQAAAAAdAAAAABAK"},
        {name: "Mountain Goat Rest",image:"https://www.google.com/imgres?imgurl=https%3A%2F%2Finvinciblengo.org%2Fphotos%2Fevent%2Fslider%2Fmount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg&imgrefurl=https%3A%2F%2Finvinciblengo.org%2Fevents%2Fmount-abu-trekking-camp-aravalli-hills-rajasthan&tbnid=kbCaSC5XiU2t4M&vet=12ahUKEwjDqOL34K3nAhVvLLcAHeGmAqYQMygEegUIARCNAg..i&docid=Ic0hb9yVdkSrcM&w=1440&h=810&q=camp%20images&ved=2ahUKEwjDqOL34K3nAhVvLLcAHeGmAqYQMygEegUIARCNAg " }
    ]

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image}
	campgrounds.push(newCampground);
	//redirect back to campground page
	res.redirect("/campgrounds");

});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
})


app.listen(3000,function(){
	console.log("The YelpCamp Has started");
});