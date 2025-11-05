/************** BANDEAU COOKIES ***************/

let boutonCookies = document.querySelector("#cookiesAccept button");
let cookiesAccept = document.querySelector("#cookiesAccept");

boutonCookies.addEventListener("click", function () {
  cookiesAccept.classList.add("active");
  localStorage.setItem("cookieAccept", "1");
});

let accepterCookies = localStorage.getItem("cookieAccept");

if (accepterCookies == 1) {
  cookiesAccept.classList.add("active");
} else {
  cookiesAccept.classList.remove("active");
}

/************ NAV : MENU BURGER *************/

let ul = document.querySelector("nav ul");
let burger = document.querySelector("#burger");

burger.addEventListener("click", function () {
  ul.classList.toggle("active");
  this.classList.toggle("active");
});

/************ FORMULAIRE RDV *************/

// ANIMATION DES LABELS

let inputs = document.querySelectorAll("#formulaire-rdv input");
let labels = document.querySelectorAll("#formulaire-rdv label");

let login = document.querySelector("#login");
let password = document.querySelector("#pass");

for (let i = 0; i < inputs.length; i += 1) {
  inputs[i].addEventListener("focus", function () {
    labels[i].classList.add("active");
    inputs[i].classList.add("active");
  });
  inputs[i].addEventListener("blur", function () {
    if (this.value == "") {
      labels[i].classList.remove("active");
      inputs[i].classList.remove("active");
    }
  });
}

// LOGIN 4 CARACTERES POUR DEBLOQUER ETAPE + STOCKAGE MEMOIRE LOGIN

let suivant = document.querySelector("#suivant");
let cookielogin = document.querySelector("#cookie-login");

if (login) {
  login.addEventListener("input", function () {
    localStorage.setItem("userLogin", this.value);
    cookielogin.textContent = this.value;
    /*let userLogin = localStorage.getItem("userLogin");
  if (userLogin) {
    login.value = userLogin;
    cookielogin.textContent = userLogin;
  }*/
    if (this.value.length < 4) {
      suivant.disabled = true;
      suivant.classList.remove("active");
    } else {
      suivant.disabled = false;
      suivant.classList.add("active");
    }
  });
}

// SUIVANT : PASSER A L'ETAPE PASSWORD + MODIFIER LOGIN

let etapeLogin = document.querySelector("#etape-login");
let etapePassword = document.querySelector("#etape-password");
let modifierLogin = document.querySelector("#modifier-login");

if (suivant) {
  suivant.addEventListener("click", function () {
    etapeLogin.style.display = "none";
    etapePassword.style.display = "block";
  });
}
if (modifierLogin) {
  modifierLogin.addEventListener("click", function () {
    etapeLogin.style.display = "block";
    etapePassword.style.display = "none";
  });
}

// PASSWORD 4 CARACTERES POUR DEBLOQUER FORMULAIRE

let submit = document.querySelector("#submit");

if (password) {
  password.addEventListener("input", function () {
    if (this.value.length < 4) {
      submit.disabled = true;
      submit.classList.remove("active");
    } else {
      submit.disabled = false;
      submit.classList.add("active");
    }
  });
}

// AFFICHER LE MOT DE PASSE

let voirPass = document.querySelector("#voirPass");
let voirPassi = document.querySelector("#voirPass i");
let mdptexte = document.querySelector("#voirPass #texte-mdp");

if (voirPass) {
  voirPass.addEventListener("click", function () {
    if (
      voirPassi.classList[1] == "fa-caret-right" &&
      password.value.length >= 1
    ) {
      voirPassi.classList.replace("fa-caret-right", "fa-caret-up");
      mdptexte.textContent = `Cacher le mot de passe`;
      password.type = "text";
    } else {
      voirPassi.classList.replace("fa-caret-up", "fa-caret-right");
      mdptexte.textContent = `Afficher le mot de passe`;
      password.type = "password";
    }
  });
}

// ANIMATION & AFFICHAGE FENETRE MODALE : MOT DE PASSE OUBLIE ?

let openmodale = document.querySelector("#openmodale");
let closemodale = document.querySelector("#closemodale");
let pop = document.querySelector("#pop");
let contentmodale = document.querySelector("#content-modale");

if (openmodale) {
  openmodale.addEventListener("click", function () {
    pop.classList.add("active");
    contentmodale.classList.add("animate__zoomInUp");
    contentmodale.classList.remove("animate__backOutDown");
  });
}
if (closemodale) {
  closemodale.addEventListener("click", function () {
    contentmodale.classList.remove("animate__zoomInUp");
    contentmodale.classList.add("animate__backOutDown");
    setTimeout(function () {
      pop.classList.remove("active");
    }, 1000);
  });
}

// FENETRE MODALE : VERIF EMAIL POUR DEBLOQUER FORMULAIRE

let emailmdp = document.querySelector("#email-mdp");
let submitmdp = document.querySelector("#submit-mdp");
let erreurmail = document.querySelector("#erreur-mail");

if (emailmdp) {
  emailmdp.addEventListener("change", function () {
    let regex = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,8}$/i;
    let verifEmail = regex.test(emailmdp.value);
    if (verifEmail) {
      submitmdp.disabled = false;
      submitmdp.classList.add("active");
      emailmdp.style.backgroundColor = "rgba(172, 243, 131, 1)";
      erreurmail.textContent = "";
    } else {
      submitmdp.disabled = true;
      submitmdp.classList.remove("active");
      emailmdp.style.backgroundColor = "rgba(247, 108, 108, 1)";
      erreurmail.textContent = "L'adresse email n'est pas correcte";
    }
  });
}

/************** CREATION COMPTE **************/

// GENERER MDP ALEATOIRE

let creaPass = document.querySelector("#pass-creation");
let genererPass = document.querySelector("#mdp-aleatoire");

if (genererPass) {
  genererPass.addEventListener("click", function () {
    genererPassword();
  });
}

let genererPassword = () => {
  let caractere =
    "#&$_^()*~!?-.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let passAleatoire = "";
  const LONGUEUR = 14;

  for (let i = 0; i < LONGUEUR; i += 1) {
    let aleatoire = Math.round(Math.random() * caractere.length);
    passAleatoire += caractere.substring(aleatoire, aleatoire + 1);
  }
  creaPass.value = passAleatoire;
};

// VERIF CHAMPS REMPLIS POUR VALIDATION FORMULAIRE

let form = document.querySelector("#section-creer-compte form");
let creaLogin = document.querySelector("#login-creation");
let creaEmail = document.querySelector("#email-creation");
let creaInfo = document.querySelector("#info-form");

if (form) {
  form.addEventListener("submit", function (e) {
    if (valideChamp()) {
    } else {
      e.preventDefault();
    }
  });
}

let valideChamp = () => {
  if (!creaLogin.value) {
    creaInfo.innerText = "Merci de créer un Login";
    return false;
  } else if (!creaPass.value) {
    creaInfo.innerText = "Merci de créer un Password";
    return false;
  } else if (!creaEmail.value) {
    creaInfo.innerText = "Merci d'entrer votre Email";
    return false;
  }
  let regexEmail = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i;
  if (!regexEmail.test(creaEmail.value)) {
    creaInfo.innerText = "L'adresse Email ne semble pas correcte !";
    return false;
  } else {
    return true;
  }
};
