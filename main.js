/** This is the main JavaScript file that is loaded when the index.html is opened in a browser. 
*   It contains the logic for the computer customisation form and the order placement.
*   The form is populated with the components available for the computer and the user can select the components they want.
*   The total price is calculated based on the components selected.
*   The user can place an order and a toast notification is shown.
*   The order summary is hidden and the order confirmation is displayed.
*   The user's shipping address is displayed.
*/

const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];

/**
 * Function to handle the form submission
 * It calculates the total price of the components selected
 * 
 * @returns {void}
 */
const handleSubmit = () => {
  const cpu = document.getElementById("processor").value;
  const memory = document.getElementById("memory").value;
  const storage = document.getElementById("storage").value;
  const graphics = document.getElementById("graphics").value;

  const total = parseInt(cpu) + parseInt(memory) + parseInt(storage) + parseInt(graphics) + " EUR";

  document.getElementById("processorSummary").innerText = cpu;
  document.getElementById("memorySummary").innerText = memory;
  document.getElementById("storageSummary").innerText = storage;
  document.getElementById("graphicsSummary").innerText = graphics;
  document.getElementById("priceSummary").innerText = total;

  modal.style.display = "none";
  document.getElementById("placeOrder").disabled = false;
}

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// The data available for the components of the computer, replacing a database
const components = [
    {
        "processor": "Intel Core i7-10700K",
        "price": "350 EUR",
    },
    {
        "processor": "Intel Core i9-10900K",
        "price": "500 EUR",
    },
    {
        "memory": "8GB",
        "price": "50 EUR",
    },
    {
        "memory": "16GB",
        "price": "100 EUR",
    },
    {
        "memory": "32GB",
        "price": "200 EUR",
    },
    {
        "storage": "1TB HDD",
        "price": "50 EUR",
    },
    {
        "storage": "1TB SSD",
        "price": "100 EUR",
    },
    {
        "graphics": "NVIDIA GeForce RTX 3060",
        "price": "400 EUR",
    },
    {
        "graphics": "NVIDIA GeForce RTX 3070",
        "price": "500 EUR",
    },
    {
        "graphics": "NVIDIA GeForce RTX 3080",
        "price": "700 EUR",
    }
]

// The user's shipping address, replacing a database
const user = {
    "shippingAddress": "1234 Main Street, Helsinki, Finland",
}

// Populate the select elements in the DOM with the components to avoid hardcoding in the HTML
for (let i = 0; i < components.length; i++) {
  let component = components[i];
  // Loop through the keys of the component object
  for (let key in component) {
      let option = document.createElement("option");
      option.text = component[key];
      option.value = component.price;
      // Add the option to the select element based on the key
      switch (key) {
          case "processor":
              document.getElementById("processor").add(option);
              break;
          case "memory":
              document.getElementById("memory").add(option);
              break;
          case "storage":
              document.getElementById("storage").add(option);
              break;
          case "graphics":
              document.getElementById("graphics").add(option);
              break;
      }
  }
}

/**
 * Function to place an order
 * 
 * @returns {void}
 */
const placeOrder = () => {
    // Get the values of the components
    const processor = document.getElementById("processor").value;
    const memory = document.getElementById("memory").value;
    const storage = document.getElementById("storage").value;
    const graphics = document.getElementById("graphics").value;
  
    // Check if the user has not selected any component
    if (!processor && !memory && !storage && !graphics) {
      return;
    }
  
    // Show a toast notification when the order is placed (using the Toastify CDN)
    Toastify({
      text: "Order placed successfully",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();

    // Hide the order summary
    const orderSummary = document.getElementById("orderSummary");
    orderSummary.style.display = "none";

    // Hide the place order button
    document.getElementById("placeOrder").style.display = "none";

    // Hide the customise computer button
    document.getElementById("openModal").style.display = "none";
  
    // Display the order confirmation
    const orderConfirmation = document.getElementById("orderConfirmation");
    orderConfirmation.style.display = "block";
  
    // Generate a random order number as we don't have a backend nor a database
    const orderNumber = Math.floor(Math.random() * 100000);
    document.getElementById("orderNumber").innerText = orderNumber;
  
    // Display the user's shipping address
    document.getElementById("shippingAddress").innerText = user.shippingAddress;
  }