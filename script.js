// Dreamchaser Fishing App

const db = window.db;

let currentUser = null;
// Check login when app starts
window.onload = async function(){

const { data } = await db.auth.getUser();

if(data.user){

currentUser = data.user;

document.getElementById("loginPage").style.display = "none";
document.getElementById("app").style.display = "block";

loadPosts();

}

};


// Sign Up

async function signup(){

let username =
document.getElementById("signupUsername").value;

let email =
document.getElementById("signupEmail").value;

let password =
document.getElementById("signupPassword").value;


let { data, error } = await db.auth.signUp({
  email,
  password
});

if (error) {
  alert(error.message);
  return;
}

// Make sure a user was actually created
if (!data.user) {
  alert("Please check your email to confirm your account.");
  return;
}

await db
  .from("profiles")
  .insert([
    {
      id: data.user.id,
      username: username,
      bio: "New fisherman 🎣",
      profile_image: ""
    }
  ]);


alert("Welcome to Dreamchaser Fishing! 🎣");

}



// Login

async function login(){

let email =
document.getElementById("loginEmail").value;

let password =
document.getElementById("loginPassword").value;


let {data,error} =
await db.auth.signInWithPassword({

email,
password

});


if(error){

alert(error.message);
return;

}


currentUser = data.user;


document.getElementById("loginPage").style.display="none";

document.getElementById("app").style.display="block";


loadPosts();

}



// Create Post

async function addPost(){


let fish =
document.getElementById("fishName").value;


let weight =
document.getElementById("weight").value;


let story =
document.getElementById("story").value;



let {error} = await 
db.from("posts")
.insert([{

user_id: currentUser.id,

caption: story,

fish_type: fish,

weight: weight || null

}]);


if(error){

console.log(error);
alert("Post failed");

return;

}


alert("Catch posted! 🎣");


loadPosts();

}



// Load Feed

async function loadPosts(){


let {data,error} = await db
.from("posts")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.log(error);
return;

}


let feed =
document.getElementById("feed");


feed.innerHTML="";


data.forEach(post=>{


feed.innerHTML += `

<div class="post">

<h3>🎣 Angler</h3>

<h2>🐟 ${post.fish_type || "Fishing Post"}</h2>

<p>${post.caption || ""}</p>


<p>
⚖️ ${post.weight ? post.weight+" lbs" : ""}
</p>


<button>
❤️ Like
</button>


</div>

`;


});
  
} // CLOSE loadPosts HERE
  async function logout(){

await db.auth.signOut();

currentUser = null;

document.getElementById("app").style.display = "none";

document.getElementById("loginPage").style.display = "block";

}

// Switch to Signup page
function showSignup(){

document.getElementById("loginBox").style.display="none";

document.getElementById("signupBox").style.display="block";

}


// Switch to Login page
function showLogin(){

document.getElementById("signupBox").style.display="none";

document.getElementById("loginBox").style.display="block";

}

function hidePages(){

document.getElementById("feedPage").style.display="none";

document.getElementById("catchPage").style.display="none";

document.getElementById("chatPage").style.display="none";

document.getElementById("profilePage").style.display="none";

}


function showFeed(){

hidePages();

document.getElementById("feedPage").style.display="block";

}


function showCatch(){

hidePages();

document.getElementById("catchPage").style.display="block";

}


function showChat(){

hidePages();

document.getElementById("chatPage").style.display="block";

}


function showProfile(){

hidePages();

document.getElementById("profilePage").style.display="block";

}
