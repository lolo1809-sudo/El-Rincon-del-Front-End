const signinHero = document.querySelector(".hero.signin");
const signinForm = document.querySelector(".form.signin");
const signupHero = document.querySelector(".hero.signup");
const signupForm = document.querySelector(".form.signup");
const cardBg = document.querySelector(".card-bg");

const toggleView = () => {
  const signinActive = signinHero.classList.contains("active");

  // Mueve el fondo azul
  cardBg.classList.toggle("signin", !signinActive);

  // Alterna la clase active en el grupo de Sign In
  [signinHero, signinForm].forEach((el) => el.classList.toggle("active"));

  // Alterna la clase active en el grupo de Sign Up
  [signupHero, signupForm].forEach((el) => el.classList.toggle("active"));
};
