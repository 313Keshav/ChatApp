const socket = io();

socket.on('connect', () => {
    console.log("Connected to server");
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
    const li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;
    document.querySelector('body').appendChild(li);
});



socket.on('newLocationMessage', (message) => {
    console.log('newLocationMessage', message);
    const li = document.createElement('li');
    const a=document.createElement('a');
    // li.innerText = `${message.from}: ${message.text}`;
    a.setAttribute('target','_blank')   
    a.setAttribute('href',message.url)  
    a.innerText='My current location'
  
    li.appendChild(a)
    
    document.querySelector('body').appendChild(li);
});


document.querySelector('#Submit-btn').addEventListener('click', (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, () => {
        // Callback after message is sent, can be used for clearing input field if needed
    });
});

document.querySelector('#send-location').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported in your device');
    }

    navigator.geolocation.getCurrentPosition(function (GeolocationPosition) {
        // console.log(position);

        socket.emit('createLocationMessage', {
            lat: GeolocationPosition.coords.latitude,
            lng: GeolocationPosition.coords.longitude,
            
        });
    }, function () {
        return alert('Unable to fetch the location');
    });
});
