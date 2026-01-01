const socket = io("http://localhost:5000");
let namespaceSocket;

function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str , "text/html");
    return doc.body.firstChild;
}

function getRoomInfo(endpoint , roomName) {
    document.querySelector("#roomName h3").setAttribute("roomName" , roomName);
    document.querySelector("#roomName h3").setAttribute("endpoint" , endpoint);
    namespaceSocket.emit("joinRoom" , roomName);
    namespaceSocket.off("roomInfo");
    namespaceSocket.on("roomInfo" , (roomInfo) => {
        document.querySelector("#roomName h3").innerText = roomInfo.description;
    });
    namespaceSocket.on("countOfOnlineUsers" , (count) => {
        document.getElementById("onlineCount").innerText = count;
    })
}

function sendMessage() {
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName");
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint");
    let message = document.getElementById("messageInput").value;    
    if(message.trim() === ""){
        return alert("لطفا متن خود را وارد نمایید")
    }
    namespaceSocket.emit("newMessage" , {
        message,
        roomName,
        endpoint
    })

    namespaceSocket.on("confirmMessage" , (data) => {
        console.log(data)
    })

    const li = stringToHTML(`
        <li class="sent">
            <img src="" alt="image"/>        
            <p>${message}</p>
        </li>
    `);
    document.querySelector(".messages ul").appendChild(li);
    document.querySelector(".message-input input#messageInput").value = "";
    const messagesElement = document.querySelector("div.messages");
    messagesElement.scrollTo(0 , messagesElement.scrollHeight);
}

function initNamespaceConnection(endpoint){
    if(namespaceSocket) namespaceSocket.close();
    namespaceSocket = io(`http://localhost:5000/${endpoint}`);
    namespaceSocket.on("connect" , () => {
        namespaceSocket.on("roomList" , (rooms) => {
            getRoomInfo(endpoint , rooms[0]?.name);
            const roomElement = document.querySelector("#contacts ul");
            roomElement.innerHTML = "";
            for(const room of rooms) {
                const html = stringToHTML(`
                    <li class="contact" roomName="${room.name}">
                        <div class="wrap">
                        <img src="${room.image}" height="40px/>
                            <div class="meta">
                                <p class="name">${room.name}</p>
                                <p class="preview">${room.description}</p>
                            </div>
                        </div>
                    </li>
                `)
                roomElement.appendChild(html);
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for(const room of roomNodes) {
                room.addEventListener("click" , () => {
                    const roomName = room.getAttribute("roomName");
                    getRoomInfo(endpoint , roomName);
                })
            }
        })
    })
}


socket.on("connect" , () => {
    socket.on("namespacesList" , (namespacesList) => {
        const namespacesElement = document.getElementById("namespaces");
        namespacesElement.innerHTML = "";
        initNamespaceConnection(namespacesList[0].endpoint)
        for(const namespaces of namespacesList) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.setAttribute("class" , "namespaceTitle");
            p.setAttribute("endpoint" , namespaces.endpoint);
            p.innerText = namespaces.title;
            li.appendChild(p);
            namespacesElement.appendChild(li);
        }
        
        //click on namespace
        const namespaceNodes = document.querySelectorAll("#namespaces li p.namespaceTitle");
        for(const namespace of namespaceNodes) {
            namespace.addEventListener("click" , () => {
                const endpoint = namespace.getAttribute("endpoint");
                initNamespaceConnection(endpoint);
            })
        }
    })
    window.addEventListener("keydown" , (e) => {
        if(e.code === "Enter") {
            sendMessage();
        }
    });

    document.querySelector("button.submit").addEventListener("click" , () => {
        sendMessage()
    })
});

