import {Task, TasksPropsType} from "./Task";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../../../ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";


export default {
    title: 'Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta


const Template: Story<TasksPropsType> = (args) => <Task {...args} />

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const deleteTaskCallback = action('Delete Button inside Task clicked')

export const TaskIsDoneExample = Template.bind({});

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    deleteTask: deleteTaskCallback,

}

TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId2'},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '2', title: 'JS',status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId2'},
    todolistId: 'todolistId2'
}