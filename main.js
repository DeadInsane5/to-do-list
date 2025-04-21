// Existing code (add-task, delete-task, keypress) remains unchanged
$("#add-task").on("click", function () {
    const taskText = $("#task-input").val();
    if (taskText) {
        const taskItem = $("<li>").text(taskText);
        const deleteButton = $("<button>").text("Delete").addClass("delete-task");
        taskItem.append(deleteButton);
        $("#task-list").append(taskItem);
        $("#task-input").val("");
    }
});

$("#task-list").on("click", ".delete-task", function () {
    $(this).parent().remove();
});

$("#task-input").on("keypress", function (event) {
    if (event.which === 13) { // Enter key
        $("#add-task").click();
    }
});

$("#speech-btn").on("click", function () {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    $("#loading").show();
    recognition.start();

    recognition.onresult = function (event) {
        const speechResult = event.results[0][0].transcript;
        fetch('http://192.168.0.107:8080/process-speech', {
            method: 'POST',
            headers: { 'Content-Type': application / json },
            body: JSON.stringify({ text: speechResult })
        })
            .then(response => response.json())
            .then(data => {
                $("#loading").hide();
                data.tasks.forEach(task => {
                    $("#task-input").val(task);
                    $("#add-task").click();
                });
            })
            .catch(error => {
                $("#loading").hide();
                console.error('Error sending speech to backend:', error);
                alert('Error processing speech');
            });
    };

    recognition.onerror = function (event) {
        $("#loading").hide();
        console.error("Speech recognition error:", event.error);
        alert("Error with speech recognition: " + event.error);
    };

    recognition.onend = function () {
        recognition.stop();
    };
});