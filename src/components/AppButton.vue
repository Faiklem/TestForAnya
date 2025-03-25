<template>
	<button class="btn" :class="btnType" @click="$emit('action', btnType)">
		<slot></slot>
	</button>
</template>

<script>
export default {
	emits: ['action'],
	props: {
		btnType: {
			type: String,
			default: '',
			validator(value) {
				return ['', 'primary', 'reject'].includes(value)
			},
		},
	},
}
</script>

<style scoped>
.btn {
	background-color: transparent;
	border: none;
	border-radius: 30px;
	padding: 10px 25px;
	color: var(--text-color);
	font-size: clamp(0.8rem, 0.506rem + 1.468vw, 1.2rem);
	opacity: 1;
	filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));
	transition: background-color 0.3s ease;
}

.primary {
	background-color: var(--primary-btn-color);
}

.reject {
	background-color: var(--reject-btn-color);
}

.primary:hover {
	background-color: var(--primary-btn-hover-color);
}

.reject:hover {
	background-color: var(--reject-btn-hover-color);
}
</style>
