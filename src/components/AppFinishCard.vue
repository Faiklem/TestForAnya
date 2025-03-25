<template>
	<div class="card">
		<slot name="text"></slot>
		<slot name="img"></slot>
		<slot name="btn"></slot>
	</div>
</template>

<style scoped>
.card {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #e2c4cf;
	border-radius: 30px;
	padding: 25px 35px;
	filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}
</style>
