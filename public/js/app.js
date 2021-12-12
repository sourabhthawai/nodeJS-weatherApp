// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });


const weatherForm = document.querySelector('form');
const searchItem= document.querySelector('input');
const messageOne= document.querySelector('#message-1');
const messageTwo= document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
e.preventDefault();
messageOne.textContent='loading....';
messageTwo.textContent='';
const location= searchItem.value;
console.log(location);

//if(location){
fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error){
            console.log(data.error);
            messageOne.textContent= data.error;
            messageTwo.textContent= '';
        }  
        else{
        messageOne.textContent= data[0].forecast;
        console.log(data[0].address);
        console.log(data[0].forecast);
    }
    }).catch((error)=>{
        console.log(e);
    });
});
//}

})