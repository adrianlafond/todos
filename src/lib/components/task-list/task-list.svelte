<script lang="ts">
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

<h3 class="font-medium">{title}</h3>
<ul class="w-96 max-w-96 mb-4">
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
