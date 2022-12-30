import Task from "./Classes/Task.js";
import TaskManager from "./Classes/TaskManager.js";
let missions = new TaskManager();
// missions.taskArr = JSON.parse(sessionStorage.getItem("Task"));
// console.log(missions.taskArr);
if (localStorage.getItem("Task")) {
  for (let task of JSON.parse(localStorage.getItem("Task")).taskArr) {
    let mission = new Task(task.description);
    missions.addTask(mission);
    mission.complete = task.complete;
  }
}
document.querySelector("#completed").innerHTML = "";
for (let item of missions.taskArr) {
  if (item.complete == true) {
    document.querySelector(
      "#completed"
    ).innerHTML += `<div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}" class="borderChange" onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <img width="15px" height="15px" src="https://cdn-icons-png.flaticon.com/512/6164/6164403.png"  style="cursor:not-allowed;"/>
        <i class="fa-solid fa-pen-to-square text-primary" title="Click Enter to change the Task description" onclick="editTask(${item.get(
          "id"
        )})"  style="cursor:not-allowed;"></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
  }
}
document.querySelector("#active").innerHTML = "";
for (let item of missions.taskArr) {
  if (item.complete == false) {
    document.querySelector("#active").innerHTML += ` 
      <div class="taskItem" id="${item.get("id")}" >
        <div id="changeTheTask_${item.get(
          "id"
        )}"  onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <i class="fa-sharp fa-solid fa-check text-success" onclick="doneMission(${item.get(
          "id"
        )})"></i>
        <i class="fa-solid fa-pen-to-square text-primary" title="Click Enter to change the Task description" onclick="editTask(${item.get(
          "id"
        )})" ></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
  }
}
// missions.addTask(new Task("Eat with my friend"));
// missions.addTask(new Task("Do my Home Work"));

// document.getElementById("getMission").addEventListener("oninput", (e) => {
// console.log(e.target.value);
// });
window.onPrint = function onPrint(e) {
  let input = e.value;
  if (input.length > 0 || input != "") {
    document.getElementsByTagName("button")[0].disabled = false;
  } else {
    document.getElementsByTagName("button")[0].disabled = true;
  }
};

window.addNewMis = function addNewMis() {
  let elem = document.getElementById("getMission").value;
  missions.addTask(new Task(elem));
  // console.log(missions.taskArr.length);
  document.querySelector(
    "#active"
  ).innerHTML = `<ul class="list-group container-sm">`;
  for (let item of missions.taskArr) {
    if (item.complete == false) {
      document.querySelector("#active").innerHTML += `
      <div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}"  onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <i class="fa-sharp fa-solid fa-check text-success" onclick="doneMission(${item.get(
          "id"
        )})"></i>
        <i class="fa-solid fa-pen-to-square text-primary" title="Click Enter to change the Task description" onclick="editTask(${item.get(
          "id"
        )})" ></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>
      `;
    }
  }
  document.querySelector("#active").innerHTML += `</ul>`;
  elem = " ";
  storageTasks();
};

window.removeTask = function removeTask(id) {
  // console.log(id);
  if (confirm("Are you sure?")) {
    document.getElementById(id).remove();
    missions.deleteTask(id);
    storageTasks();
  }
};

window.editTask = (id) => {
  let element = document.querySelector(`#changeTheTask_${id}`);
  element.setAttribute("contenteditable", "true");
  //element.style.border = "black dotted 1px";
  element.classList.add("new-border");
};

window.addToArr = (event, id) => {
  if (event.code == "Enter") {
    for (let task of missions.taskArr) {
      if (task.id == id) {
        task.description = document.getElementById(
          `changeTheTask_${id}`
        ).innerText;
        break;
      }
    }
    document.querySelector("#active").innerHTML = "";
    for (let item of missions.taskArr) {
      if (item.complete == false) {
        document.querySelector("#active").innerHTML += `
      <div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}" class="borderChange" onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <i class="fa-sharp fa-solid fa-check text-success" onclick="doneMission(${item.get(
          "id"
        )})"></i>
        <i class="fa-solid fa-pen-to-square text-primary" title="Click Enter to change the Task description" onclick="editTask(${item.get(
          "id"
        )})" ></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
      }
    }
    //  Completed
    document.querySelector("#completed").innerHTML = "";
    for (let item of missions.taskArr) {
      if (item.complete == true) {
        document.querySelector(
          "#completed"
        ).innerHTML += `<div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}" onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <img width="15px" height="15px" src="https://cdn-icons-png.flaticon.com/512/6164/6164403.png" class=""/>
        <i class="fa-solid fa-pen-to-square text-primary" onclick="editTask(${item.get(
          "id"
        )})" ></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
      }
    }
  }
  storageTasks();
};

window.doneMission = function doneMission(id) {
  missions.completeTask(id);
  document.querySelector("#completed").innerHTML = "";
  for (let item of missions.taskArr) {
    if (item.complete == true) {
      document.querySelector(
        "#completed"
      ).innerHTML += `<div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}" onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <img width="15px" height="15px" src="https://cdn-icons-png.flaticon.com/512/6164/6164403.png"  style="cursor:not-allowed;"/>
        <i class="fa-solid fa-pen-to-square text-primary" onclick="editTask(${item.get(
          "id"
        )})"  style="cursor:not-allowed;"></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
    }
  }
  document.querySelector("#active").innerHTML = "";
  for (let item of missions.taskArr) {
    if (item.complete == false) {
      document.querySelector("#active").innerHTML += `
      <div class="taskItem" id="${item.get("id")}">
        <div id="changeTheTask_${item.get(
          "id"
        )}" class="" onkeypress="addToArr(event,${item.get("id")})">
        ${item.description}
        </div>
        <div class="icons">
        <i class="fa-sharp fa-solid fa-check text-success" onclick="doneMission(${item.get(
          "id"
        )})"></i>
        <i class="fa-solid fa-pen-to-square text-primary" onclick="editTask(${item.get(
          "id"
        )})" ></i>
        <i class="fa-regular fa-trash-can text-danger" onclick="removeTask(${item.get(
          "id"
        )})"></i>
        </div>
      </div>`;
    }
  }
  storageTasks();
};

function storageTasks() {
  localStorage.setItem("Task", JSON.stringify(missions));
}
