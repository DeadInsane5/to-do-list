// addTask
$("#add-task").on("click", function () {
    const taskText = $("#task-input").val();
    if (taskText) {
        const taskItem = $("<li>").text(taskText);
        const deleteButton = $("<button>").text("Delete").attr("id", "delete-task");
        taskItem.append(deleteButton);
        $("#task-list").append(taskItem);
        $("#task-input").val("");
    }
});

// deleteTask
$("#task-list").on("click", "#delete-task", function () {
    $(this).parent().remove();
});

// enter key event
$("#task-input").on("keypress", function (event) {
    if (event.which === 13) { // Enter key
        $("#add-task").click();
    }
});

// speechToText
// Existing code for adding tasks
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

// Existing code for deleting tasks
$("#task-list").on("click", ".delete-task", function () {
    $(this).parent().remove();
});

// Existing code for Enter key submission
$("#task-input").on("keypress", function (event) {
    if (event.which === 13) { // Enter key
        $("#add-task").click();
    }
});

// New code for speech-to-text with auto-submit
$("#speech-btn").on("click", function () {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        const speechResult = event.results[0][0].transcript;
        $("#task-input").val(speechResult);
        $("#add-task").click(); // Auto-submit the task
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        alert("Error with speech recognition: " + event.error);
    };

    recognition.onend = function () {
        recognition.stop();
    };
});