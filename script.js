/* Your code here */
const input = document.querySelector("#input");
const list = document.querySelector("#list")
document.querySelector("#Add").addEventListener("click", addtext);
var task = [[], []]
if (localStorage.task == null)
  localStorage.setItem('task', JSON.stringify(task));
task = JSON.parse(localStorage.getItem('task'));
show()
input.addEventListener("keyup", function (event) {
  if (event.key === 13) {
    event.preventDefault();
    document.querySelector("#Add").click();
  }
});

function donetask(index) {
  return function curried_func(x) {
    task[1].push(task[0][index])
    task[0].splice(index, 1);
    show()
  }
}
function deletetask(index) {
  return function curried_func(x) {
    task[0].splice(index, 1);
    show()
  }
}

function addtext() {
  if (input.value == "") {
    alert("Task cannot be empty")
  } else {
    const commingtask = input.value
    task[0].push(commingtask)
    show()
  }
}
function show() {
  localStorage.setItem('task', JSON.stringify(task));
  list.innerHTML = ""
  document.querySelectorAll('button').disabled = true
  for (let index = task[0].length-1; index >= 0; index--) {
    const newtask = document.createElement("li")
    const done = document.createElement("button")
    const del = document.createElement("button")
    const div = document.createElement("div")
    const taskdiv = document.createElement("div")
    const buttondiv = document.createElement("div")
    div.classList.add("flex");
    div.classList.add("justify-between");
    done.classList.add("done")
    done.innerText = "DONE"
    del.classList.add("del")
    del.innerText = "DELETE"
    newtask.innerHTML = task[0][index]
    newtask.classList.add("pt-4")
    newtask.classList.add("text-4xl")
    div.classList.add("border-b-4")
    div.classList.add("border-green-400")
    done.addEventListener("click", donetask(index))
    del.addEventListener("click", deletetask(index))
    taskdiv.append(newtask)
    buttondiv.append(done)
    buttondiv.append(del)
    div.append(taskdiv)
    div.append(buttondiv)
    list.append(div)
  }
  for (let index = task[1].length - 1; index >= 0; index--) {
    const div = document.createElement("div")
    const donetask = document.createElement("li")
    const p = document.createElement('p')
    p.classList.add("line-through")
    p.classList.add("text-xl")
    p.innerHTML = task[1][index]
    div.classList.add("border-b-2")
    div.classList.add("border-green-600")
    donetask.append(p)
    div.classList.add("py-2")
    div.append(donetask)
    list.append(div)
  }
}


