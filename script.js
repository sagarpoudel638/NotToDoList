let taskList = [];
const WEEKLYHOUR = 7*24;
function showToast() {
  const toastEl = document.getElementById('taskLimitToast');
  const toast = new bootstrap.Toast(toastEl); 
  toast.show(); 
}
const addTask = (myForm) => {
  const formData = new FormData(myForm);

  const task = formData.get("task");
  const hour = parseInt(formData.get("hours"));
  const type = formData.get("btnradio");

  const id = getRandomId();

  const taskObj = {
    id,
    task,
    hour,
    type,
  };
  
  if (WEEKLYHOUR >= (parseInt(getTotalHours()))+hour){
  taskList.push(taskObj);
  displayList();
  myForm.reset();
  }
  else{
    showToast();
    console.log("weekly Hour exceeded")
  }
};

const displayList = () => {
  const goodlistElement = document.getElementById("goodlist");
  let goodlistElementcontent = "";
  let badlistElementcontent = "";
  let goodListIndex = 0;
  taskList.map((item) => {
    if (item.type === "good") {
      goodListIndex = goodListIndex + 1;
      goodlistElementcontent += `<tr>
                    <th scope="row">${goodListIndex}</th>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td>
                      <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button type="button" class="btn btn-success" onclick="switchTask('${item.id}')">
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>`;
    }
  });
  goodlistElement.innerHTML = goodlistElementcontent;
  const totalHours = getTotalHours();
  const totalHoursElement = document.getElementById("totalHours");
  totalHoursElement.innerText = totalHours;
  // bad list
  const badListElement = document.getElementById("badlist");
  let badListIndex = 0;
  taskList.map((item) => {
    if (item.type === "bad") {
      badListIndex = badListIndex + 1;
      badlistElementcontent += `<tr>
                    <th scope="row">${badListIndex}</th>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td>
                      <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button type="button" class="btn btn-warning" onclick="switchTask('${item.id}')">
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>
                    </td>
                  </tr>`;
    }
  });
  badListElement.innerHTML = badlistElementcontent;
  const badHours = getBadHours();
  const badHoursElement = document.getElementById("badHours");
  badHoursElement.innerText = badHours;
  localStorage.setItem("taskList", JSON.stringify(taskList));
};

const getTotalHours = () => {
  const totalHours = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);
  return totalHours;
};

const getBadHours = () => {
  const badHours = taskList.reduce((acc, item) => {
    return item.type === "bad" ? acc + item.hour : acc;
  }, 0);
  return badHours;
};

const deleteTask = (id) => {
  taskList = taskList.filter((task) => {
    return task.id !== id;
  });

  displayList();
};
const getRandomId = () => {
  let stringGenerator =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let randomString = "";
  let randomStringLength = 6;

  for (let i = 0; i < randomStringLength; i++) {
    let randomIndex = Math.floor(Math.random() * stringGenerator.length);
    randomString = randomString + stringGenerator[randomIndex];
  }
  return randomString;
};

const switchTask = (id) => {
  task = taskList.find((task) => task.id == id);
  task.type = task.type == "good" ? "bad" : "good";
  displayList();
};

const displayDataFromLocalStorage = () => {
  taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  displayList();
};

displayDataFromLocalStorage();
