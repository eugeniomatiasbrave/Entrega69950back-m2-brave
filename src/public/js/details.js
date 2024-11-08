document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form-details');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cartId = form.getAttribute('action').split('/')[3];
        const productId = form.getAttribute('action').split('/')[5];

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});