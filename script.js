let username = localStorage.getItem("username") || "";

let posts = JSON.parse(localStorage.getItem("posts")) || [];


window.onload = function(){

if(username){
document.getElementById("profile").innerHTML =
"🎣 Welcome " + username;
}

showPosts();

updateTrophy();

}



function saveProfile(){

username =
document.getElementById("username").value;

localStorage.setItem("username", username);


document.getElementById("profile").innerHTML =
"🎣 Welcome " + username;

}




function addPost(){

let fish =
document.getElementById("fishName").value;

let weight =
document.getElementById("weight").value;

let story =
document.getElementById("story").value;


let post = {

user: username,

fish: fish,

weight: Number(weight),

story: story,

likes: 0,

comments: []

};


posts.unshift(post);


localStorage.setItem(
"posts",
JSON.stringify(posts)
);


showPosts();

updateTrophy();

}




function showPosts(){

let feed =
document.getElementById("feed");


feed.innerHTML="";


posts.forEach((post,index)=>{


feed.innerHTML += `

<div class="post">

<h3>👤 ${post.user}</h3>

<h2>🐟 ${post.fish}</h2>

<p>⚖️ ${post.weight} lbs</p>

<p>${post.story}</p>


<button onclick="like(${index})">

❤️ Like ${post.likes}

</button>


<br><br>


<input id="comment${index}"
placeholder="Comment">


<button onclick="addComment(${index})">

💬 Comment

</button>


<div>

${post.comments.map(c =>
"<p>💬 "+c+"</p>"
).join("")}

</div>


</div>

`;

});


}




function like(index){

posts[index].likes++;

save();

}




function addComment(index){

let box =
document.getElementById(
"comment"+index
);


posts[index].comments.push(
box.value
);


save();

}




function save(){

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

showPosts();

}




function updateTrophy(){

let biggest = 0;
let fish = "";


posts.forEach(post=>{

if(post.weight > biggest){

biggest = post.weight;

fish = post.fish;

}

});


let trophy =
document.getElementById(
"trophy"
);


if(trophy){

trophy.innerHTML =
"🏆 Biggest Catch: "
+ biggest +
" lbs " +
fish;

}

}