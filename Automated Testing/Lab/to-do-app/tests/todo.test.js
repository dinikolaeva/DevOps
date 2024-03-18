const { test, expect } = require ('@playwright/test');

const baseURL = 'http://127.0.0.1:5500/';

test('user can add a task', async({ page }) => {
    await page.goto(baseURL);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    const taskText = await page.textContent('.task');

    expect(taskText).toContain('Test Task');
});

test('user can delete a task', async({ page }) => {
    await page.goto(baseURL);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.taskContent));

    expect(tasks).not.toContain('Test Task');
});

test('user can mark a task as complete', async({ page }) => {
    await page.goto(baseURL);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    
    await page.click('.task .task-complete');

    const completedTask = await page.$('.task.completed');

    expect(completedTask).not.toBeNull();
});

test('user can filter tasks', async({ page }) => {
    await page.goto(baseURL);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    
    await page.click('.task .task-complete');

    const completedTask = await page.selectOption('#filter', 'Completed');

    const incompleteTask = await page.$('.task:not(.completed)');
    expect(incompleteTask).toBeNull();
});