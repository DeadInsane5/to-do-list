$("#add-task").on("click", function() {
    const taskText = $("#task-input").val();
    if (taskText) {
        const taskItem = $("<li>").text(taskText);
        const deleteButton = $("<button>").text("Delete").addClass("delete-task");
        taskItem.append(deleteButton);
        $("#task-list").append(taskItem);
        $("#task-input").val("");
    }
});
$("#task-list").on("click", ".delete-task", function() {
    $(this).parent().remove();
} );
$("#task-input").on("keypress", function(event) {
    if (event.which === 13) { // Enter key
        $("#add-task").click();
    }
});