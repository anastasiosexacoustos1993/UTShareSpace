// Require modules that we will need
var express = require('express');
// Object that represents express application
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer  = require('multer');

// Define storage specifications for images
var storage = multer.diskStorage({
	// Create destination that the image will go
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    // Generate random number to assign at images
    filename: function (req, file, cb) {
        cb(null, (Math.floor(Math.random() * 1000) + 1) + file.originalname);
    }
});

// Assign storage specifications
var upload = multer({ storage: storage });

// Specify static folder (public directory) of client
app.use(express.static(__dirname+'/client'));

// Middleware to initialize the bodyParser
app.use(bodyParser.json());

// post.js functionality assigned to Post
Post = require('./models/post')

// Connect to Mongoose
mongoose.connect('mongodb://localhost/sharespace');
// Database object
var db = mongoose.connection;

// Route for home page
app.get('/', function(req, res){
	res.send('Please use /api/posts for now')
});

// Get all the posts
app.get('/api/posts', function(req, res){
	Post.getPosts(function(err, posts){
		if (err){
			throw err;
		}
		res.json(posts);
	});
});

// Get specific post by its id
app.get('/api/posts/:_id', function(req, res){
	Post.getPostById(req.params._id, function(err, post){
		if (err){
			throw err;
		}
		res.json(post);
	});
});

// Create new post
app.post('/api/posts', function(req, res){
	// Allows us to have access to what comes into the form
	var post = req.body;
	Post.addPost(post, function(err, post){
		if (err){
			throw err;
		}
		res.json(post);
	});
});

// Updte existing post
app.put('/api/posts/:_id', function(req, res){
	// Get id
	var id = req.params._id;
	var post = req.body;
	Post.updatePost(id, post, {}, function(err, post){
		if (err){
			throw err;
		}
		res.json(post);
	});
});

// Delete post
app.delete('/api/posts/:_id', function(req, res){
	// Get id
	var id = req.params._id;
	Post.removePost(id, function(err, post){
		if (err){
			throw err;
		}
		res.json(post);
	});
});

// Upload image(s)
app.post('/api/multer',  upload.any(), function(req, res){
	res.json(req.files);
});

// Port to listen
app.listen(3000);
console.log('Running on port 3000');

