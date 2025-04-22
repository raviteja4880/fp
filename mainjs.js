$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

$(".menu-items a").click(function () {
  $("#checkbox").prop("checked", false);
});

function buyNow(productName, price) {
    const url = `checkout.html?product=${encodeURIComponent(productName)}&price=${price}`;
    window.location.href = url; 
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " added to cart!");
}
}

document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.buy-now button');

  buyButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.preventDefault(); 

          const productElement = button.closest('.best-p1');
          if (productElement) {
              const productNameElement = productElement.querySelector('.name-of-p p');
              const priceElement = productElement.querySelector('.price');

              if (productNameElement && priceElement) {
                  const productName = productNameElement.textContent.trim();
                  const priceText = priceElement.textContent.replace('$', '').trim(); 
                  const price = parseFloat(priceText || '0');

                  if (productName) {
                      const confirmation = confirm(`Are you sure you want to buy ${productName} for $${price}?`);
                      if (confirmation) {
                          fetch('/', { 
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                  productName: productName,
                                  price: price,
                                  // ... other order details ...
                              })
                          })
                          .then(response => response.json())
                          .then(data => {
                              console.log('Success:', data);
                              alert("Thank you for your purchase!");
                          })
                          .catch((error) => {
                              console.error('Error:', error);
                              alert("There was an error processing your purchase. Please try again.");
                          });
                      } else {
                          alert("Purchase cancelled.");
                      }
                  } else {
                      console.error("Product name not found for this item.");
                  }
              } else {
                  console.error("Product name or price element not found for this item.");
              }
          } else {
              console.error("Could not find the product element for this button.");
          }
      });
  });
});
