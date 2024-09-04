document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.getAttribute('data-product-id');
        const cartId = 'your-cart-id'; // Reemplaza esto con la lógica para obtener el ID del carrito actual
  
        fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: 1 }) // Puedes ajustar la cantidad según sea necesario
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            console.log('Producto agregado al carrito:', data);
            // Aquí puedes actualizar la UI o mostrar un mensaje de éxito
          } else {
            console.error('Error al agregar el producto al carrito:', data.error);
          }
        })
        .catch(error => {
          console.error('Error al agregar el producto al carrito:', error);
        });
      });
    });
});