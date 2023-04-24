const socket = io();

let buttonCounter = 0;

function createButton() {
  // increment the button counter and generate a unique id for the button
  buttonCounter++;
  const buttonId = `button_${buttonCounter}`;

  // create a new button element and set its attributes
  const button = document.createElement("button");
  button.id = buttonId;
  button.textContent = `Button ${buttonCounter}`;
  button.classList.add("btn", "btn-primary");

  // add event listeners for incrementing and decrementing the count on button click
  button.addEventListener("click", () => {
    socket.emit("incrementCount", buttonId);
  });

  // add a "close" button to remove the newly created button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Delete";
  closeButton.classList.add("btn", "btn-danger", "ml-2");
  closeButton.addEventListener("click", () => {
    socket.emit("deleteButton", buttonId);
    button.remove();
  });

  // create a new div element to contain the button and add it to the modal body
  const div = document.createElement("div");
  div.appendChild(button);
  div.appendChild(closeButton);
  document.querySelector("#modal-body").appendChild(div);

  // emit a message to the server indicating that a new button has been created
  socket.emit("newButton", buttonId);
}

socket.on("countUpdate", (buttonId, count) => {
  // update the count for the button with the corresponding id
  document.querySelector(`#${buttonId} span`).textContent = count;
});

socket.on("deleteButton", (buttonId) => {
  // remove the button with the corresponding id
  document.querySelector(`#${buttonId}`).remove();
});

document.querySelector("#createButton").addEventListener("click", createButton);
