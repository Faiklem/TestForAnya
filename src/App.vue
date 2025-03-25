<template>
	<button class='musicBtn' @click='toggleMusic'><v-icon :name="isMusicPlaying ?'ri-music-2-fill' : 'ri-music-2-line'" /></button>
	<transition name="fade" mode="out-in">
		<div class="container" :key="currentState">
			<app-start-card class="card" v-if="currentState === 'start'">
				<template #text>
					<p class="text card__text">Привет! Это тест на пупса&#129392</p>
					<p class="text card__text">
						Чтобы начать прохождение нажми на кнопку «Начать тест!»
					</p>
				</template>
				<template #btn>
					<app-button class='card__button' btnType="primary" @action="startTest"
						>Начать тест!</app-button>
				</template>
			</app-start-card>

			<app-question-card class="card" v-else-if="currentState === 'inProcess'">
				<template #backBtn v-if='isBackBtnVisible'>
					<button class='backBtn' @click='goBack'><v-icon name='ri-arrow-go-back-line' /></button>
				</template>
				<template #question>
					<span class="question">{{ currentQuestion.text }}</span>
				</template>
				<template #btn>
					<app-button class='card__button' btnType="primary" @action="btnHandler">{{
						currentQuestion.agreeBtn
					}}</app-button>
					<app-button class='card__button' btnType="reject" @action="btnHandler">{{
						currentQuestion.rejectBtn
					}}</app-button>
				</template>

				<template #img v-if="currentQuestion.imgSrc != undefined">
					<img :src="currentQuestion.imgSrc" alt="" class="image card__image" />
				</template>
			</app-question-card>

			<app-finish-card class='card' v-else-if="currentState === 'finish'">
				<template #text>
					<p class="text card__text">{{ testResult }}</p>
				</template>
				<template #btn><app-button btnType='primary' @action='startAgain'>Начать заново</app-button></template>
				<template #img v-if='finishImage'>
					<img :src="finishImage" alt="" class="image card__image" />
				</template>
			</app-finish-card>
		</div>
	</transition>
</template>

<script>
import AppButton from './components/AppButton.vue'
import AppFinishCard from './components/AppFinishCard.vue'
import AppQuestionCard from './components/AppQuestionCard.vue'
import AppStartCard from './components/AppStartCard.vue'

export default {
	data() {
		return {
			isMusicPlaying: false,
			audio: null,
			currentState: 'start',
			questions: [
				{
					text: 'Ты любишь, когда с тобой сюсюкаются?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					rate: 35,
					nextAgree: 1,
					nextReject: 1,
				},
				{
					text: 'Ты любишь вкусняшки?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					rate: 15,
					nextAgree: 2,
					nextReject: 2,
				},
				{
					text: 'Ты любишь пить энергетики?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					rate: 15,
					nextAgree: 3,
					nextReject: 3,
				},
				{
					text: 'Ты любишь карапузничать?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					rate: 35,
					nextAgree: 4,
					nextReject: 4,
				},
				{
					text: 'На этой фотографии ты?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					imgSrc: this.getFileUrl('photo.jpg'),
					rate: 200,
					nextAgree: null,
					nextReject: 5,
				},
				{
					text: 'Ты точно в этом уверен(-а)?',
					agreeBtn: 'Да',
					rejectBtn: 'Нет',
					rate: 0,
					nextAgree: null,
					nextReject: 4,
				},
			],
			currentQuestionIndex: 0,
			answerRates: [],
		}
	},
	computed: {
		currentQuestion() {
			return this.questions[this.currentQuestionIndex]
		},
		totalRate() {
			return this.answerRates.reduce((sum, current) => sum + current, 0);
		},
		finishImage() {
			const rate = this.totalRate
			if (this.currentState === 'finish' && rate > 200) {
				return this.getFileUrl('cat.gif')
			} else if (this.currentState === 'finish' && rate <= 200 && rate >= 80) {
				return this.getFileUrl('smile.gif')
			} else if (this.currentState === 'finish' && rate < 80 && rate >= 50) {
				return this.getFileUrl('like.webp')
			} else if (this.currentState === 'finish' && rate < 50 && rate >= 20) {
				return this.getFileUrl('soso.jpg')
			} else {
				return this.getFileUrl('sad.gif')
			}
		},
		testResult() {
			const rate = this.totalRate
			if (rate > 200) {
				return `Ти мой шладкий пупс на все ${rate}%! Я тебя очень сильно люблю`
			} else if (rate <= 200 && rate >= 80) {
				return `Ты пупс на ${rate}%! Но, видимо, не мой :)`
			} else if (rate < 80 && rate >= 50) {
				return `Ты пупс на ${rate}%!`
			} else if (rate < 50 && rate >= 20) {
				return `Ты пупс лишь на ${rate}%`
			} else {
				return 'Чего-то ты совсем не пупс :('
			}
		},
		isBackBtnVisible() {
			return this.currentQuestionIndex > 0
		}
	},
	methods: {
		preloadFinalImages() {
			const images = ['photo.jpg', 'cat.gif', 'smile.gif', 'like.webp', 'soso.jpg', 'sad.gif']
			images.forEach((filename) => {
				const img = new Image()
				img.src = this.getFileUrl(filename)
			})
		},
		saveData() {
			const data = {
        currentQuestionIndex: this.currentQuestionIndex,
        answerRates: this.answerRates,
        currentState: this.currentState,
      }
			sessionStorage.setItem('data', JSON.stringify(data))
		},
		loadData() {
			const data = sessionStorage.getItem('data')
			if (data) {
				const dataJson = JSON.parse(data)
				this.currentQuestionIndex = dataJson.currentQuestionIndex
				this.answerRates = dataJson.answerRates
				this.currentState = dataJson.currentState
			}
		},
		saveMusicState() {
			sessionStorage.setItem('musicPlaying', JSON.stringify(this.isMusicPlaying))
		},
		loadMusicState() {
			const savedMusicState = sessionStorage.getItem('musicPlaying')
			if (savedMusicState) {
				this.isMusicPlaying = JSON.parse(savedMusicState)
			}
		},
		startTest() {
      this.currentState = 'inProcess'
      this.saveData()
    },
		startAgain() {
			this.currentQuestionIndex = 0
			this.answerRates = []
			this.currentState = 'start'
			this.saveData()
		},
		toggleMusic() {
			if (this.isMusicPlaying) {
				this.audio.pause()
			} else {
				this.audio.play().catch(error => console.warn('Ошибка воспроизведения', error))
			}
			this.isMusicPlaying = !this.isMusicPlaying;
			this.saveMusicState()
		},
		goBack() {
			this.answerRates.pop()
			this.currentQuestionIndex--
			this.saveData()
		},
		btnHandler(btnType) {
			if (btnType === 'primary') {
				this.answerRates.push(this.currentQuestion.rate)
			} else {
				this.answerRates.push(0)
			}

			const nextIndex =
				btnType === 'primary'
					? this.currentQuestion.nextAgree
					: this.currentQuestion.nextReject

			if (nextIndex !== null) {
				this.currentQuestionIndex = nextIndex
			} else {
				this.currentState = 'finish'
			}
			this.saveData()
		},
		getFileUrl(filename) {
			return import.meta.env.BASE_URL + 'assets/' + filename
		}
	},
	mounted() {
		this.preloadFinalImages()
		this.audio = new Audio(this.getFileUrl('music.mp3'))
		this.audio.loop = true
		this.saveMusicState()
		if (this.isMusicPlaying) {
			this.audio.play().catch(error => console.warn('Ошибка воспроизведения', error))
		}
	},
	created() {
    this.loadData()
		this.loadMusicState()
  },
	components: {
		'app-start-card': AppStartCard,
		'app-question-card': AppQuestionCard,
		'app-finish-card': AppFinishCard,
		'app-button': AppButton,
	},
}
</script>

<style scoped>
.musicBtn {
	position: absolute;
	top: 5%;
	right: 5%;
	padding: 5px;
}

.backBtn {
	position: absolute;
	top: 5%;
	left: 3%;
	background-color: transparent;
	border: none;
	padding: 5px;
	color: var(--text-color);
	cursor: pointer;
}

.container {
	display: flex;
	width: fit-content;
}

.card {
	margin: 10px 25px;
}

.question {
	font-size: clamp(1rem, 0.633rem + 1.835vw, 1.5rem);
	font-weight: 700;
}

.text {
	font-size: clamp(1rem, 0.633rem + 1.835vw, 1.5rem);
	margin: 0;
}

.card__text {
	margin-bottom: 0.5rem;
}

.card__button {
	margin-top: 0.5rem;
}

.image {
	max-width: 250px;
	width: 100%;
}

.card__image {
	padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
