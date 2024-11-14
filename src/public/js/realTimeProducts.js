// Escuchar el evento de envío del formulario
const form = document.getElementById('formProduct');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('Success:', data);
    form.reset();
    window.location.reload(); // Recargar la página para actualizar la vista de productos
  } catch (error) {
    console.error('Error:', error);
  }
});


//crear la solicitud para eliminar el producto de realTimeProducts.handlebars
document.addEventListener('DOMContentLoaded', () => {
  const deleteProduct = document.querySelectorAll('.delete-product');
  deleteProduct.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const pid = button.getAttribute('data-pid');
      try {
        const response = await fetch(`/api/products/${pid}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Producto eliminado:', result);
          window.location.reload(); // Recargar la página para actualizar la vista de productos
        } else {
          console.error('Error al eliminar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});

