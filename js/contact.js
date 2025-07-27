document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');

    emailjs.init("MoTZ0iY3paYZ3B-M1");

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }

        const adminParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: "Shriyansh Mishra",
            sent_time: new Date().toLocaleString()
        };

        const userParams = {
            name: name,                            
            to_email: email,                       
            email: "mishrashriyansh@outlook.com" 
        };

        emailjs.send("service_r7pq8ae", "template_3n99v5q", adminParams)
            .then(() => {
                console.log("Admin mail sent successfully");

                return emailjs.send("service_r7pq8ae", "template_dh984do", userParams);
            })
            .then(() => {
                console.log("User confirmation sent successfully");
                alert("Message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("Sending failed:", error);
                alert("Failed to send message. Please try again later.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });
});
