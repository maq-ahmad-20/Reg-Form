




// document.addEventListener('submit' , (e)=>{
//       e.preventDefault();

//       var inputs = document.getElementsByTagName('input');

//        for(let i=0;i<inputs.length;i++){

//         if(inputs[i].id !="submit"){
//         var value = inputs[i].value;
//         var key = "userInput - "+inputs[i].id;
//         console.log(value);
//         localStorage.setItem(key,value);

//        }
//     }  
// });


const crudURL = 'https://crudcrud.com/api/0d8748e2969a45a2b68b6c36b644008f';

function setObj(arr) {
    return {
        "userName": arr[0],
        "userEmail": arr[1],
        "userPhoneNo": arr[2],
        "userdate": arr[3],
        "usertime": arr[4]

    }
}

// document.addEventListener('submit' , (e)=>{
//           e.preventDefault();

//           var inputs = document.getElementsByTagName('input');

//            let arrInput = [];
//            for(let i=0;i<inputs.length;i++){
//             arrInput[i] = inputs[i].value;
//            }

//           var object = JSON.stringify(setObj(arrInput));
//           localStorage.setItem("submitObject" , object);


//     });


var bookeduser = document.getElementById('get-booked-user');
var form = document.getElementById('sign-up-form');


// to not override the storage


form.addEventListener('submit', (e) => {
    e.preventDefault();
    var arrInput = [];

    var inputs = document.getElementsByTagName('input');


    for (let i = 0; i < inputs.length; i++) {
        arrInput[i] = inputs[i].value;
    }


    // var object = JSON.stringify(setObj(arrInput));
    // localStorage.setItem(arrInput[1] , object);


    axios.post(`${crudURL}/appointmentData`, setObj(arrInput))
        .then((response) => {
            // console.log(response.data._id);

            arrInput.push(response.data._id); //  previous we used mail as key to local storage but in crud we using id which created so we can access this id while doing edit and delete

            addUserToScreen(arrInput);

        }).catch((err) => {
            let p = document.createElement('p');
            p.appendChild(document.createTextNode("Some thing went wrong"));
            bookeduser.appendChild(p)
            console.log(err);
        })




});

function addUserToScreen(arrInput) {


    let arrlastId = arrInput.pop();


    var div = document.createElement('div');
    div.className = 'after-submit-display';

    var h4 = document.createElement('h4')
    h4.style.display = 'inline';

    h4.appendChild(document.createTextNode("User signed up : " + arrInput[1]));
    div.appendChild(h4);




    var button = document.createElement('button');
    button.className = 'delete-button';
    button.id = arrInput[1]; // keeping id of button as same as key to local storage and crud
    button.setAttribute("crudId", arrlastId) // crud id we used to delete data from crud 


    button.appendChild(document.createTextNode("Delete User"));
    button.style.margin = '0 auto auto 20px';
    button.style.display = 'inline';


    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    //add id 
    editButton.setAttribute("deleteButtonID", arrInput[1]);
    editButton.appendChild(document.createTextNode("Edit User"));
    editButton.display = 'inline';

    div.appendChild(button);
    div.appendChild(editButton);
    bookeduser.appendChild(div);



    document.getElementById('name').setAttribute("value", "");
    document.getElementById('phone').setAttribute("value", "");
    form.reset();

}



// delete and update user

bookeduser.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.target.previousElementSibling.textContent); printing h4 tag text previous to button tag
    //console.log(e.target);


    if (e.target.textContent === "Delete User") {
        var buttonid = e.target.id;
        let crudId = e.target.getAttribute('crudId');
        //console.log(crudId);
        // var removebutton = document.getElementById(buttonid);



        //console.log(removebutton.parentElement);
        // var key = e.target.previousElementSibling.textContent; get text of h4  as button  prev sibbling is h4 
        //localStorage.removeItem(buttonid); // passing key as buton id because i have added arr[1] in local and arr[1] as id to the button

        // delete the data from crud and aslo in webpage
        axios.delete(`${crudURL}/appointmentData/${crudId}`)
            .then((res) => {
                document.getElementById(buttonid).parentElement.remove();// deleting the html data using buttonid because the crud id vanishes after delete hapens
            }).catch((err) => {
                console.log(err);
            })


    } else if (e.target.textContent === "Edit User") {


        // local storage edit functionality
        // var ButtonId = e.target.getAttribute("deleteButtonID");

        // var storedObject = localStorage.getItem(ButtonId);
        // console.log(storedObject);

        // var enteredFeild = JSON.parse(storedObject);

        // var deleteData = document.getElementById(ButtonId);
        // localStorage.removeItem(ButtonId);
        // deleteData.parentElement.remove();

        // document.getElementById('name').setAttribute("value", enteredFeild.userName);
        // document.getElementById('phone').setAttribute("value", enteredFeild.userPhoneNo);

    }
});


// to retrive data after screen refresh

window.addEventListener('DOMContentLoaded', () => {

    axios.get(`${crudURL}/appointmentData`)
        .then((res) => {
            //console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                var crudObj = res.data[i];

                addUserToScreen([crudObj.userName, crudObj.userEmail, crudObj._id]);
            }

        }).catch((err) => {
            console.log(err);
        })

})




