<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Delete from '../icons/delete.svelte';
	import Edit from '../icons/edit.svelte';
	import Up from '../icons/up.svelte';
	import Down from '../icons/down.svelte';
	import { IconButton } from '../icon-button';
	import ThreeDotsVertical from '../icons/three-dots-vertical.svelte';
	import X from '../icons/x.svelte';
	import cx from 'clsx';
	import MultilineTextbox from '../multiline-textbox/multiline-textbox.svelte';
	import Checkbox from '../checkbox/checkbox.svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let title: string;
	export let checked = false;

	let titleEditing = false;
	let settingsOpen = false;
	let settingsTimeout = 0;
	let settingsBar: HTMLDivElement;

	function handleChange(event: Event) {
		dispatch('change', { id, checked: (event.target as HTMLInputElement).checked });
	}

	function handleTitleEditStart() {
		console.log('handleTitleEditStart()');
		titleEditing = true;
		handleSettingsClose();
	}

	function handleTitleUpdate({ detail }: { detail: { value: string } }) {
		titleEditing = false;
		dispatch('titleChange', { id, title: detail.value });
	}

	function resetSettingsTimer() {
		clearTimeout(settingsTimeout);
		settingsTimeout = setTimeout(handleSettingsClose, 5000);
	}

	function handleSettingsOpen() {
		settingsOpen = true;
		resetSettingsTimer();
	}

	function handleSettingsOpenClick() {
		handleSettingsOpen();
	}

	function handleSettingsClose() {
		settingsOpen = false;
		clearTimeout(settingsTimeout);
	}

	function moveSettingsFocus(direction: 'next' | 'prev') {
		if (!settingsBar) {
			return;
		}
		resetSettingsTimer();
		const buttons = Array.from(settingsBar.querySelectorAll('button'));
		const activeIndex = buttons.findIndex((btn) => document.activeElement === btn);
		if (direction === 'next') {
			moveSettingsFocusNext(buttons, activeIndex);
		} else {
			moveSettingsFocusPrev(buttons, activeIndex);
		}
	}

	function moveSettingsFocusNext(buttons: HTMLButtonElement[], activeIndex: number) {
		if (activeIndex === -1) {
			buttons[0].focus();
		} else {
			buttons[(activeIndex + 1) % buttons.length].focus();
		}
	}

	function moveSettingsFocusPrev(buttons: HTMLButtonElement[], activeIndex: number) {
		if (activeIndex === -1) {
			buttons[buttons.length - 1].focus();
		} else {
			let index = activeIndex - 1 < 0 ? buttons.length - 1 : activeIndex - 1;
			buttons[index].focus();
		}
	}

	function handleCheckboxKeydown(event: KeyboardEvent) {
		if (titleEditing) {
			return;
		}
		if (event.key === 'Enter' && !settingsOpen) {
			event.preventDefault();
			handleSettingsOpen();
		} else if (settingsOpen) {
			if (event.key === 'Escape') {
				event.preventDefault();
				handleSettingsClose();
			} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				event.preventDefault();
				moveSettingsFocus('next');
			} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				event.preventDefault();
				moveSettingsFocus('prev');
			}
		}
	}

	function handleMoveUp() {
		resetSettingsTimer();
		dispatch('moveUp', { id });
	}

	function handleMoveDown() {
		resetSettingsTimer();
		dispatch('moveDown', { id });
	}

	function handleDelete() {
		handleSettingsClose();
		dispatch('delete', { id });
	}
</script>

<!--
	Why svelte-ignore a11y-no-noninteractive-element-interactions? Because the LI
  handles keyboard interactions within this component to adhere to keyboard
	accessibility guidelines for within a component. See https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents
	-->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	class="w-full relative inline-flex rounded bg-white hover:bg-slate-100 transition-colors duration-200 focus-within:bg-slate-200"
	on:keydown={handleCheckboxKeydown}
>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		class={cx(
			'flex items-start pl-2 pt-2 pb-2 focus-within:text-neutral-950 hover:text-neutral-950',
			{
				'flex-1 pr-8': !titleEditing,
				'text-neutral-400': checked
			}
		)}
	>
		<!-- <input class="mr-1 mt-1" bind:checked type="checkbox" on:change={handleChange} /> -->
		<Checkbox class="mr-2 mt-0.5" bind:checked on:change={handleChange} />
		{#if !titleEditing}
			<span class={cx('inline-block leading-tight flex-1')}>
				{title}
			</span>
		{/if}
	</label>
	{#if titleEditing}
		<MultilineTextbox class="flex-1 mr-8 my-2" defaultValue={title} on:update={handleTitleUpdate} />
	{/if}
	<div class="absolute right-0 top-0 h-9 items-center inline-flex">
		{#if settingsOpen && !titleEditing}
			<div
				class="inline-flex items-center justify-between gap-1 rounded bg-white mr-0.5"
				bind:this={settingsBar}
			>
				<IconButton autofocus tabindex="-1" label="edit task title" on:click={handleTitleEditStart}>
					<Edit />
				</IconButton>
				<IconButton tabindex="-1" label="move task up" on:click={handleMoveUp}>
					<Up />
				</IconButton>
				<IconButton tabindex="-1" label="move task down" on:click={handleMoveDown}>
					<Down />
				</IconButton>
				<IconButton tabindex="-1" label="delete task" on:click={handleDelete}>
					<Delete />
				</IconButton>
				<IconButton tabindex="-1" label="close task settings" on:click={handleSettingsClose}>
					<X />
				</IconButton>
			</div>
		{:else if !titleEditing}
			<IconButton tabindex="-1" label="open task settings" on:click={handleSettingsOpenClick}>
				<ThreeDotsVertical />
			</IconButton>
		{/if}
	</div>
</li>
