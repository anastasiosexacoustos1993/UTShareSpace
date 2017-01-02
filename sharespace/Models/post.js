// Require mongoose
var mongoose = require('mongoose');

// Posts Schema
var postSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	video_url:{
		type: String
	},
	code:{
		type: String
	},
	votes:{
		type: Number,
		default: 0
	},
	image_paths:{
		type: [String]
	},
	file_paths:{
		type: [String]
	},
	tag_list:{
		type: [String]
	}
// timestamps will create a createdAt and updatedAt variables within database
}, {timestamps: true}

);

// Make Post object accessible from other files (module.exports) such as app.js
var Post = module.exports = mongoose.model('Post', postSchema);

// Get posts function (getPosts)
module.exports.getPosts = function(callback, limit){
	Post.find(callback).limit(limit);
}

// Get post function (getPostById) by its id
module.exports.getPostById = function(id, callback){
	Post.findById(id, callback);
}

// Add post function (addPost)
module.exports.addPost = function(post, callback){
	Post.create(post, callback);
}

// Update post function (updatePost) by its id
module.exports.updatePost = function(id, post, options, callback){
	var query = {_id: id};
	var update = {
		title: post.title,
		description: post.description,
		video_url: post.video_url,
		code: post.code,
		votes: post.votes,
		tag_list: post.tag_list
	}
	Post.findOneAndUpdate(query, update, options, callback);
}

// Delete post function (deletePost) by its id
module.exports.removePost = function(id, callback){
	var query = {_id: id};
	Post.remove(query, callback);
}
