// addTask
$("#add-task").on("click", function () {
    const taskText = $("#task-input").val();
    if (taskText) {
        // Split input into category and task
        const [category, task] = taskText.split(":", 2).map(str => str.trim());
        if (category && task) {
            // Create task item with category class
            const taskItem = $("<li>").text(task).addClass(`cat-${category}`);
            const deleteButton = $("<button>").text("Delete").attr("id", "delete-task");
            taskItem.append(deleteButton);
            $("#task-list").append(taskItem);
            $("#task-input").val("");
        }
    }
});

$(document).ready(function () {
    // Add Task
    $("#add-task").on("click", function () {
        const taskText = $("#task-input").val();
        if (taskText) {
            const [category, task] = taskText.split(":", 2).map(str => str.trim());
            if (category && task) {
                const taskItem = $("<li>").text(task).addClass(`cat-${category.toLowerCase()}`);
                const deleteButton = $("<button>").text("Delete").attr("id", "delete-task");
                taskItem.append(deleteButton);
                $("#task-list").append(taskItem);
                $("#task-input").val("");
            }
        }
    });

    // Open category menu on task item click
    $(document).on("click", "#task-list li", function (e) {
        e.stopPropagation(); // Prevent click from bubbling to document
        const $taskItem = $(this);
        const $menu = $("#category-menu");

        // Hide any existing menu
        $menu.hide();

        // Position menu near the clicked task
        const offset = $taskItem.offset();
        $menu.css({
            top: offset.top + $taskItem.outerHeight(),
            left: offset.left
        }).show();

        // Store reference to the clicked task for category update
        $menu.data("target", $taskItem);
    });

    // Handle category selection
    $("#category-menu li").on("click", function (e) {
        e.stopPropagation();
        const $menu = $("#category-menu");
        const $taskItem = $menu.data("target");
        const newCategory = $(this).data("category");

        // Update task item's category class
        $taskItem.removeClass(function (index, className) {
            return (className.match(/cat-\S+/g) || []).join(" ");
        }).addClass(`cat-${newCategory}`);

        // Hide menu
        $menu.hide();
    });

    // Close menu when clicking elsewhere
    $(document).on("click", function () {
        $("#category-menu").hide();
    });

    // Prevent menu click from closing itself
    $("#category-menu").on("click", function (e) {
        e.stopPropagation();
    });

    // Delete task
    $(document).on("click", "#delete-task", function (e) {
        e.stopPropagation(); // Prevent menu from opening
        $(this).parent().remove();
    });
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
