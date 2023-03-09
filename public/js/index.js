const socket = io();

socket.emit("messege", "Saludos departe de Somos Pacifica");

socket.on("messege", (data) =>{
    console.log(data);
})