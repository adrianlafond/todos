<script lang="ts">
	import { Task } from '$lib/components/task';
	export let data: { slug: string };

	const checked = {
		a: false,
		b: true
	};
	const title = {
		a: 'Buy milk',
		b: 'feed the cats'
	};

	function handleChange(event: { detail: { id: string; checked: boolean } }) {
		checked[event.detail.id as 'a' | 'b'] = event.detail.checked;
	}

	function handleTitleChange(event: { detail: { id: string; title: string } }) {
		title[event.detail.id as 'a' | 'b'] = event.detail.title;
	}
</script>

<h1 class="text-3xl">{data.slug}</h1>

<ul>
	<Task
		id="a"
		title={title.a}
		checked={checked.a}
		on:change={handleChange}
		on:titleChange={handleTitleChange}
	/>
	<Task
		id="b"
		title={title.b}
		checked={checked.b}
		on:change={handleChange}
		on:titleChange={handleTitleChange}
	/>
</ul>
