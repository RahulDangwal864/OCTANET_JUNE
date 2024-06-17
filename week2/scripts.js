document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const prioritySelect = document.getElementById('priority');
    const taskList = document.getElementById('task-list');
    const categoryButtons = document.querySelectorAll('.category-button');

    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskAction);
    categoryButtons.forEach(button => button.addEventListener('click', filterTasks));

    function addTask() {
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = prioritySelect.value;

        if (taskName === '') return;

        const task = {
            id: Date.now(),
            name: taskName,
            dueDate: dueDate,
            priority: priority,
            category: document.querySelector('.category-button.active')?.dataset.category || 'all',
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskNameInput.value = '';
        dueDateInput.value = '';
    }

    function handleTaskAction(e) {
        if (e.target.classList.contains('complete-button')) {
            toggleTaskComplete(e.target.closest('.task-item').dataset.id);
        } else if (e.target.classList.contains('delete-button')) {
            deleteTask(e.target.closest('.task-item').dataset.id);
        }
    }

    function toggleTaskComplete(id) {
        const task = tasks.find(task => task.id == id);
        task.completed = !task.completed;
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id != id);
        renderTasks();
    }

    function filterTasks(e) {
        categoryButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');
        renderTasks();
    }

    function renderTasks() {
        const activeCategory = document.querySelector('.category-button.active')?.dataset.category || 'all';
        const filteredTasks = tasks.filter(task => activeCategory === 'all' || task.category === activeCategory);

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <span>${task.name} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
                <div class="task-buttons">
                    <button class="complete-button">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-button">Delete</button>
                </div>
            </li>
        `).join('');
    }
});
