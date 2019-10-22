// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
const myInput = document.getElementById("myInput");
const myUL = document.getElementById("myUL");


// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement("li");
  li.innerHTML =
  `
    <span class="mark hide">✔️ </span>
    <span class="text">${myInput.value}</span>
    <span class="remove">\u00D7</span>
  `;
  if (myInput.value === '')
    alert("You must write something!");
 else
      myUL.appendChild(li);

  li.addEventListener("click", checkList);
  li.querySelector('.remove').addEventListener('click', removeLI);
  document.getElementById("myInput").value = "";
}

function checkList (e)
{
  if(e.target.tagName === "SPAN" && (e.target.classList[0] === "text" || e.target.classList[0] === "mark") )
  {
    e.target.parentElement.children[0].classList.toggle("hide");
    e.target.classList.toggle("checked-text");
  }
  else if (e.target.tagName === "LI"){
    e.target.children[0].classList.toggle("hide");
    e.target.children[1].classList.toggle("checked-text");
  }
}

function removeLI(e) {
  myUL.removeChild(this.parentElement);
}
