const image = document.querySelector("#back");

console.log(image);

image.addEventListener("load", () => {
  image.classList.add("loaded");
  console.log("hello");
});
