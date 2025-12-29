const socket = io("http://localhost:5000");

function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str , "text/html");
    return doc.body.firstChild;
}

function initNamespaceConnection(endpoint){
    const namespaceSocket = io(`http://localhost:5000/${endpoint}`);
    namespaceSocket.on("connect" , () => {
        namespaceSocket.on("roomList" , (rooms) => {
            const roomElement = document.querySelector("#contacts ul");
            roomElement.innerHTML = "";
            for(const room of rooms) {
                const html = stringToHTML(`
                    <li class="contact">
                        <div class="wrap">
                            <div class="meta">
                                <p class="name">${room.description}</p>
                                <p class="preview">${room.description}</p>
                            </div>
                        </div>
                    </li>
                `)
                roomElement.appendChild(html)
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

})