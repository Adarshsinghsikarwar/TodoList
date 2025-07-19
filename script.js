const userNameTextfield = document.getElementById("username");
const addUserBtn = document.getElementById("addUser");
// const recordData = document.getElementById("records");
const recordData = document.querySelector("#records");

let userArray = [];
//data store
let edit_id = null;

//step: 1
addUserBtn.onclick = () => {
    let name = userNameTextfield.value
    // alert(name);
    if (edit_id != null){
        //update 
        userArray.splice(edit_id, 1 , {
            username: name,
        });
        edit_id = null;

    } else {

        userArray.push({ username: name });
    }
    // console.log(userArray);
    savedata(userArray);
    userNameTextfield.value = '';
}
//step: 2
function savedata(a){ 
    // console.log(a);
    let strdata = JSON.stringify(a);
    // console.log(strdata);
    localStorage.setItem("username", strdata);
    displayData();
}

//step: 3
let data =localStorage.getItem('username');
// console.log(data);

if(data != null) {

    userArray = JSON.parse(data);  // string to object
}
// console.log(userArray);

function displayData()
{
    let data1="";
    userArray.forEach((item,index)=>{
        // console.log(item);

        data1 += `
        <tr>
            <td>${index + 1} </td>
            <td>${item.username} </td>
            <td>
                <a href="#" onclick='EditInfo(${index})'>Edit</a>
                <a href="#" onclick='DeleteInfo(${index})'>Delete</a>

            </td>
    
        </tr>
        `;
        
        
    });
    // console.log(data1);
    recordData.innerHTML =data1
}
displayData();


function EditInfo(id){

    // alert(id);
    edit_id =id;
    userNameTextfield.value =userArray[id].username;
}

function DeleteInfo(id){

    // alert(id);
    userArray.splice(id, 1);
    savedata(userArray);
}