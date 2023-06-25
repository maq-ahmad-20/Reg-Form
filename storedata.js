

 
// var form = document.getElementById('form');

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



 
 function setObj(arr){
     return{
        "userName" : arr[0],
        "userEmail" : arr[1],
        "userPhoneNo" : arr[2],
        "userdate" : arr[3],
        "usertime": arr[4]
     
     }
 }

document.addEventListener('submit' , (e)=>{
          e.preventDefault();
        
          var inputs = document.getElementsByTagName('input');
         
           let arrInput = [];
           for(let i=0;i<inputs.length;i++){
            arrInput[i] = inputs[i].value;
           }
         
          var object = JSON.stringify(setObj(arrInput));
          localStorage.setItem("submitObject" , object);
          
          
    });
