document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-product-form');

    deleteForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const action = form.getAttribute('action');
            try {
                const response = await fetch(action, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Producto eliminado:', result);
                    window.location.reload(); // Recargar la página para actualizar la vista del carrito
                } else {
                    console.error('Error al eliminar el producto:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});