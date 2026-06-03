let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if(task === ""){
        showToast("Vui lòng nhập công việc!");
        return;
    }

    tasks.push(task);

    saveTasks();

    renderTasks();

    input.value="";

    showToast("Đã thêm công việc");
}

function renderTasks(){

    let list = document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        list.innerHTML += `
        <li>
            <span class="task-text">${task}</span>

            <div class="actions">

                <button class="edit"
                        onclick="editTask(${index})">
                        Sửa
                </button>

                <button class="delete"
                        onclick="deleteTask(${index})">
                        Xóa
                </button>

            </div>
        </li>
        `;
    });
}

function deleteTask(index){

    if(confirm("Bạn muốn xóa công việc này?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

        showToast("Đã xóa");
    }
}

function editTask(index){

    let newTask = prompt(
        "Chỉnh sửa công việc:",
        tasks[index]
    );

    if(newTask !== null && newTask.trim() !== ""){

        tasks[index] = newTask;

        saveTasks();

        renderTasks();

        showToast("Đã cập nhật");
    }
}

function searchTask(){

    let keyword =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    let items =
    document.querySelectorAll("#taskList li");

    items.forEach(item=>{

        let text =
        item.innerText.toLowerCase();

        if(text.includes(keyword)){
            item.style.display="flex";
        }else{
            item.style.display="none";
        }
    });
}

function showToast(message){

    let toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}