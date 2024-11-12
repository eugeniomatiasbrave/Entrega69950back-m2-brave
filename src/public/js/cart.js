
// Eliminar un producto del carrito
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

// Eliminar todos los productos del carrito
document.addEventListener('DOMContentLoaded', () => { 
    const deleteAllProductsCid = document.querySelector('.delete-all-products-cid');
        deleteAllProductsCid.addEventListener('submit', async (event) => {
            event.preventDefault();
            const action = deleteAllProductsCid.getAttribute('action');
            try {
                const response = await fetch( action, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Productos eliminados:', result);
                    window.location.reload(); // Recargar la página para actualizar la vista del carrito
                } else {
                    console.error('Error al eliminar los productos:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    // solicitud de compra
document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.querySelector('.purchase-form');
    purchaseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const action = purchaseForm.getAttribute('action');
        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Compra realizada:', result);
                window.location.reload(); // Recargar la página para actualizar la vista del carrito
            } else {
                console.error('Error al realizar la compra:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});