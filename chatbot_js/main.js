// Get DOM elements
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bot.jpg"; // Bot profile image
const PERSON_IMG = "user.jpg"; // User profile image
const BOT_NAME = "YummyYard Assistant";
const PERSON_NAME = "You";

// Prompts and replies
const prompts = [
  ["can i modify my order after placing it"],
  ["what are your opening hours"],
  ["do you offer delivery services"],
  ["what payment methods do you accept"],
  ["where is your restaurant located"],
  ["can i make a reservation"],
];

const replies = [
  [
    "Yes, you can modify your order after placing it, but only before the restaurant starts preparing it. Please contact us directly at +123 456 7890 to make changes to your order. We apologize for any inconvenience this may cause.",
  ],
  ["Our restaurant is open from 9:00 AM to 10:00 PM every day."],
  [
    "Yes, we offer delivery services within a 5 km radius. You can place your order through our website or mobile app.",
  ],
  [
    "We accept cash, credit cards (Visa, MasterCard), and online payments via PayPal.",
  ],
  [
    "Our restaurant is located at 123 Main Street, Downtown. You can find us near the Central Park.",
  ],
  [
    "Yes, you can make a reservation by calling our restaurant at +123 456 7890 or by using the reservation form on our website. We recommend making a reservation at least 24 hours in advance to ensure availability.",
  ],
];

// Event listener for form submission
msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const msgText = msgerInput.value.trim(); // Remove extra spaces
  if (!msgText) return; // Prevent empty messages
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText); // Add user message to chat
  output(msgText); // Process user input and generate bot response
  msgerInput.value = ""; // Clear input field after submission
});

// Handle quick question clicks
document.querySelectorAll('.question-item').forEach(item => {
  item.addEventListener('click', () => {
    // Reset active state for all items
    document.querySelectorAll('.question-item').forEach(el => el.classList.remove('active'));
    
    // Set active state for clicked item
    item.classList.add('active');
    
    // Copy question to input field
    const question = item.getAttribute('data-question');
    msgerInput.value = question; // Copy the question to the input field
  });
});

// Function to process user input and generate bot response
function output(input) {
  let product;
  let text = input
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/[\d]/g, "")
    .trim()
    .replace(/\s+/g, " ");
  
  // Compare user input with prompts and generate a response
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else {
    product = "I'm not sure how to help with that. Please try asking about our opening hours, delivery services, payment methods, location, reservations, or order modifications.";
  }
  
  // Add bot reply after a delay based on message length
  const delay = input.split(" ").length * 100;
  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product); // Add bot message to chat
    scrollToBottom(); // Scroll to bottom after bot reply
  }, delay);
}

// Function to compare prompts with user input
function compare(promptsArray, repliesArray, string) {
  for (let x = 0; x < promptsArray.length; x++) {
    if (promptsArray[x].includes(string)) {
      let replies = repliesArray[x];
      let reply = replies[Math.floor(Math.random() * replies.length)];
      return reply;
    }
  }
  return null;
}

// Function to add chat messages to the UI
function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML); // Append message to chat area
  scrollToBottom(); // Scroll to bottom after adding message
}

// Helper function to scroll to bottom of chat
function scrollToBottom() {
  msgerChat.scrollTop = msgerChat.scrollHeight; // Scroll to the bottom of the chat area
}

// Helper function to get elements
function get(selector, root = document) {
  return root.querySelector(selector); // Select the first element matching the selector
}

// Function to format date and time
function formatDate(date) {
  const h = "0" + date.getHours(); // Add leading zero to hours
  const m = "0" + date.getMinutes(); // Add leading zero to minutes
  return `${h.slice(-2)}:${m.slice(-2)}`; // Return formatted time (HH:MM)
}