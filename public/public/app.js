const sendBtn = document.getElementById("sendBtn");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const statusBox = document.getElementById("status");

sendBtn.addEventListener("click", async () => {

    if (!phone.value.trim() || !message.value.trim()) {
        statusBox.style.color = "#ff4d4f";
        statusBox.innerText = "Please fill all fields.";
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";
    statusBox.innerText = "";

    try {

        const response = await fetch("/send-sms", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                phone: phone.value,
                message: message.value

            })

        });

        const data = await response.json();

        if (data.success) {

            statusBox.style.color = "#22c55e";
            statusBox.innerText = "SMS sent successfully.";

        } else {

            statusBox.style.color = "#ff4d4f";
            statusBox.innerText = data.error;

        }

    } catch (err) {

        statusBox.style.color = "#ff4d4f";
        statusBox.innerText = "Server connection failed.";

    }

    sendBtn.disabled = false;
    sendBtn.innerText = "Send SMS";

});
