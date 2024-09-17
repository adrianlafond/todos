<script context="module">
	import { Task } from '.';

	export const meta = {
		title: 'Task',
		component: Task
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let id = 'task-0';
	let title = 'Buy milk';
	let checked = false;
	function handleChange({ detail }: { detail: { checked: boolean } }) {
		checked = detail.checked;
	}
	function handleTitleChange({ detail }: { detail: { title: string } }) {
		title = detail.title;
	}
</script>

<Template let:args>
	<ul class="w-96 max-w-96">
		<!--👇 'on:click' allows to forward event to addon-actions  -->
		<Task
			{...args}
			{checked}
			{id}
			{title}
			on:change
			on:change={handleChange}
			on:titleChange={handleTitleChange}
			on:moveUp={console.log}
			on:moveDown={console.log}
			on:delete={console.log}
		/>
	</ul>
</Template>

<Story name="Basic" source args={{ id, title, checked }} />
