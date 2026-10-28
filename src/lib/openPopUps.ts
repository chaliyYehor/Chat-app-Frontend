import gsap from 'gsap'

function generalPopUpAnimation(popUpClass: string) {
	gsap.to(popUpClass, {
		opacity: 1,
		duration: 0.3,
		ease: 'power2.out',
		pointerEvents: 'auto',
	})
}

export function openPopUpSuccess() {
	generalPopUpAnimation('.pop-up-success')
}
export function openPopUpError() {
	generalPopUpAnimation('.pop-up-error')
}
export function openPopUpLoading() {
	generalPopUpAnimation('.pop-up-loading')
}
export function closePopUpLoading() {
	gsap.to('.pop-up-loading', {
		opacity: 0,
		duration: 0.3,
		ease: 'power2.out',
		pointerEvents: 'none',
	})
}
