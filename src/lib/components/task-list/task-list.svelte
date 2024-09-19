<script lang="ts">
	import AddNewTask from '../add-new-task/add-new-task.svelte';
	import { Task, type TaskEvent } from '../task';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let list: {
		id: string;
		title: string;
		checked?: boolean;
	}[] = [];

	export let title = '';

	function handleMoveUp(event: TaskEvent) {
		dispatch('moveTaskUp', event.detail);
	}

	function handleMoveDown(event: TaskEvent) {
		dispatch('moveTaskDown', event.detail);
	}

	function handleDelete(event: TaskEvent) {
		dispatch('deleteTask', event.detail);
	}
</script>

<div class="mb-4 w-96 max-w-96">
	<h3 class="font-medium">{title}</h3>
	<ul>
		{#each list as task (task.id)}
			<Task
				id={task.id}
				title={task.title}
				checked={task.checked}
				on:moveUp={handleMoveUp}
				on:moveDown={handleMoveDown}
				on:delete={handleDelete}
			/>
		{/each}
	</ul>
	<AddNewTask />
</div>
