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

async function addPost(){

let fish =
document.getElementById("fishName").value;

let weight =
document.getElementById("weight").value;

let story =
document.getElementById("story").value;

let imageFile =
document.getElementById("image").files[0];


let imageUrl = "";

// Upload picture if one was chosen
if(imageFile){

let fileName =
Date.now() + "-" + imageFile.name;


let { data: uploadData, error: uploadError } =
await supabase.storage
.from("fish-images")
.upload(fileName, imageFile);


if(uploadError){
alert("Photo upload failed");
console.log(uploadError);
return;
}


let { data } =
supabase.storage
.from("fish-images")
.getPublicUrl(fileName);


imageUrl = data.publicUrl;

}


// Save catch post

let { error } =
await supabase
.from("catches")
.insert([{

fish_name: fish,

weight: Number(weight),

story: story,

image_url: imageUrl

}]);


if(error){

console.log(error);
alert("Post failed");

return;

}


alert("Catch posted! 🎣");


document.getElementById("fishName").value="";
document.getElementById("weight").value="";
document.getElementById("story").value="";
document.getElementById("image").value="";

}







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
