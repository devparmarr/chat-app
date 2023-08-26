const joinBtn = document.getElementById("join-btn");
const usernameInput= document.getElementById("username-input");
const navMenusItems = document.querySelector(".navMenus ul");
const loginPage = document.querySelector(".login-page");
const navMenus = document.querySelector(".navMenus");
const chatContainer = document.querySelector('.chatRoom-container');
const messageInput= document.getElementById("send-message-input");
const sendBtn= document.getElementById("send-message-btn");
const messagesContainer = document.querySelector('.messages-container');


let socket=io();

let userName= '';

joinBtn.addEventListener('click',event =>{
    event.preventDefault();
    userName = usernameInput.value;
    if(userName !== ''){
        loginPage.style.display='none';
        navMenusItems.style.display='none';
        navMenus.innerText=`Welcome ${userName}!`;
        chatContainer.style.display='flex';
        
    }
});


sendBtn.addEventListener('click',event =>{
    event.preventDefault();
    let data={
        id : socket.id,
        message: messageInput.value,
        username: userName
    }
    socket.emit('chat message',data);
    console.log(data)
    appendMessage(data,'send')
})

socket.on('chat message',(data)=>{
    if(data.id !== socket.id){
        appendMessage(data,'recieved')
    }
})


function appendMessage(data,type){
    let msgDiv = document.createElement('div');
    msgDiv.innerText= `${data.message}`;
    if(type==='send'){
        msgDiv.setAttribute('class','message send');
    }else{
        msgDiv.setAttribute('class','message recieved');
    }
    messagesContainer.append(msgDiv);
    messageInput.value='';
}
