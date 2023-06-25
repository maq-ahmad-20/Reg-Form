

 
var form = document.getElementById('form');

document.addEventListener('submit' , (e)=>{
      e.preventDefault();
    
      var inputs = document.getElementsByTagName('input');
     
       for(let i=0;i<inputs.length;i++){
        
        if(inputs[i].id !="submit"){
        var value = inputs[i].value;
        var key = "userInput - "+inputs[i].id;
        console.log(value);
        localStorage.setItem(key,value);
       }
    }  
});