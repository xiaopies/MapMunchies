function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    document.getElementById('profileinfo').innerHTML = "<br><a>" + profile.getName() + "</a>" + "<a href='mailto:'" + profile.getEmail() + "'>" + profile.getEmail() + "</a><br><img style='margin-left: 32px;' src='" + profile.getImageUrl() + "'/>";
    document.getElementById('signin').style.display="none";
    document.getElementById('signout').style.display="block";
    // document.location = "index.html";
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.location = "login.html";
    });
  }
  
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }