const socket = io("http://localhost:5000");

socket.on("connect" , () => {
    socket.on("namespacesList" , (namespacesList) => {
        const namespacesElement = document.getElementById("namespaces");
        namespacesElement.innerHTML = "";
        for(const namespaces of namespacesList) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = namespaces.title;
            li.appendChild(p);
            namespacesElement.appendChild(li);
        }
    })
})