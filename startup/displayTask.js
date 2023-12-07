document.addEventListener('DOMContentLoaded', function () {
  // Get the data
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const description = urlParams.get('description');
  const price = urlParams.get('price');
  const image = urlParams.get('image');

  //For displaying the data on the page
  const titleElement = document.getElementById('detailTitle');
  const descriptionElement = document.getElementById('detailDescription');
  const priceElement = document.getElementById('detailPrice');
  const imageElement = document.getElementById('detailImage');

  titleElement.textContent = title;
  descriptionElement.textContent = description;
  priceElement.textContent = price;
  imageElement.src = image;

  //handle the message section
  const messageContainer = document.getElementById('messageContainer');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');


  const socket = new WebSocket('ws://localhost:3000');

    // Handle WebSocket events
    socket.addEventListener('open', function (event) {
        console.log('WebSocket connection opened:', event);
    });


  // socket.onmessage = ({message}) => showMessage(message); //this function prints undefined
  function showMessage(message) { 
    messageContainer.innerHTML += `${message}`;
    messageContainer.innerHTML += `<br>`;
    // messageContainer.textContent += `\n\n${message}`;
    // messageContainer.textContent += '\n';
    // messageContainer.textContent += '\n';
    messageContainer.scrollTop = messageInput.scrollHeight;
    messageInput.value = '';
  }
    // send message when the send button is clicked
    sendButton.addEventListener('click', function () {
      
        const message = document.getElementById("messageInput").value;

        if(!socket){
          showMessage("Websocket has no connection");
          return;
        }
        //console.log(message);
        console.log(messageInput.value);
       // console.log(message.value); //this becomes undefined
        socket.send(messageInput.value); //used to not have .vlaue
        showMessage(messageInput.value);
    });

    socket.addEventListener('message', function (event) {
    //  const stringMessage = JSON.parse(event.data);
      console.log('Message from server:', event.data);
      console.log('Received message type:', typeof event.data);
    //  console.log('Message from server:', data); //doesn't work
      showMessage(event.data);
  });
    
});