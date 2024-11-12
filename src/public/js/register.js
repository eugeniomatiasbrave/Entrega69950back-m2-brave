const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.status === "success") {
            window.location.href = '/login'; // Redirige a la página de inicio de sesión
        } else {
            console.error('Error:', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});