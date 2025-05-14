let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDsDXgzFvRcpBa-nd0iuK9honNZhGyCtRY"
let user={
    data:null,
}

async function generateResponse(aiChatBox){

let text = aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
        method: "POST",
        headers :{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents":[
                {"parts":[{"text":user.data}

                ]
            }]
        })
    }

    try{
        let response= await fetch(Api_Url,RequestOption)
        let data =await response.json()
       let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
      text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error);
    }
    
}




function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatResponse(message){
    user.data=message // for api message request 
    let html = `
    <img src="user.png" alt="" id="userImage" width="50">
    <div class="user-chat-area"> 
        ${user.data}
    </div> `
    prompt.value="" // after submiting and handling chat our prompt value will be change to null in the message box 


let userChatBox=createChatBox(html,"user-chat-box")    

chatContainer.appendChild(userChatBox)


// creating chat response for ai chat bot 

setTimeout(()=>{
let html=   `<img src="Aibot.png"alt="" id="aiImage" width="50">
    <div class="ai-chat-area">
     <img src="loadinggif.gif" alt="" class="load" width="50px">
    </div>`

let aiChatBox=createChatBox(html,"ai-chat-box")
chatContainer.appendChild(aiChatBox)

generateResponse(aiChatBox)
},600) // setting time for bot response 
}


prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
handlechatResponse(prompt.value)
    }
    

})