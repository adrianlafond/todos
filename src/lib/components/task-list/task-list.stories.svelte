<script context="module">
	export const meta = {
		title: 'TaskList',
		component: TaskList
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { TaskList } from './index';
	import { type TaskEvent } from '../task';
	import type { AddNewTaskEvent } from '../add-new-task';

	let n = 3;
	let list = [
		{
			id: 'task-0',
			title: 'Buy milk',
			checked: false
		},
		{
			id: 'task-1',
			title: 'Feed the cats',
			checked: true
		},
		{
			id: 'task-2',
			title: 'Take out the garbage',
			checked: false
		}
	];
	const listForRest = list.slice();

	function moveTaskUp({ detail }: TaskEvent) {
		let index = list.findIndex((item) => item.id === detail.id);
		if (index !== -1) {
			const task = list[index];
			list = list.filter((item) => item.id !== detail.id);
			index -= 1;
			if (index >= 0) {
				list.splice(index, 0, task);
			}
		}
	}

	function moveTaskDown({ detail }: TaskEvent) {
		let index = list.findIndex((item) => item.id === detail.id);
		if (index !== -1) {
			const task = list[index];
			const listLen = list.length;
			list = list.filter((item) => item.id !== detail.id);
			index += 1;
			if (index < listLen) {
				list.splice(index, 0, task);
			}
		}
	}

	function deleteTask({ detail }: TaskEvent) {
		list = list.filter((item) => item.id !== detail.id);
	}

	function addTask({ detail }: AddNewTaskEvent) {
		list = [
			...list,
			{
				id: `task-${n++}`,
				title: detail.value,
				checked: false
			}
		];
	}

	function reset() {
		list = listForRest.slice();
	}
</script>

<Template let:args>
	<TaskList
		{...args}
		bind:list
		on:addNewTask={addTask}
		on:deleteTask={deleteTask}
		on:moveTaskUp={moveTaskUp}
		on:moveTaskDown={moveTaskDown}
	/>
	<button on:click={reset}>Reset</button>
</Template>

<Story name="Basic" source args={{ title: 'Oct 31 2024 Thursday' }} />
