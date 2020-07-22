let languages = document.querySelector(".languages").children;

function setActiveLanguage() {
  let selectedLanguage = document.getElementsByTagName("html")[0].lang;
  for (let i = 0; i < languages.length; i++) {
    console.log(languages[i]);
    if (languages[i].innerHTML.toLowerCase() === selectedLanguage) {
      languages[i].classList.add("active-lng");
    } else if (languages[i].classList.contains("active-lng")) {
      languages[i].classList.remove("active-lng");
    }
  }
}

setActiveLanguage();

for (let i = 0; i < languages.length; i++) {
  languages[i].onclick = setActiveLanguage;
}
