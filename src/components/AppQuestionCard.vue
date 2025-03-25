<template>
	<div class="card">
		<slot name="backBtn"></slot>
		<slot name="question"></slot>
		<slot name="img"></slot>
		<hr />
		<div class="buttons-container">
			<slot name="btn"></slot>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.card {
	position: relative;
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #e6cfef;
	border-radius: 30px;
	padding: 35px 45px;
	filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}

hr {
	background-color: rgba(0, 0, 0, 0.185);
	width: 100%;
	border: none;
	height: 1px;
}

.buttons-container {
	width: 100%;
	display: flex;
	justify-content: space-around;
}
</style>
