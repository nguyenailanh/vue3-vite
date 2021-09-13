<template>
	<div class="find-out-more">
		<div class="container">
			<div class="row flex-column-reverse flex-lg-row">
				<div class="col-sm-12 col-md-8">
					<div class="find-out-more__content">
						<p class="find-out-more__title">
							BEHOLD THE ICONS THAT VISUALIZE WHAT YOU’RE ALL ABOUT. OR JUST
							TAKE UP SPACE. YOUR CALL BRO.
						</p>
						<p class="find-out-more__description">
							Sed tristique purus vitae volutpat ultrices. Aliquam eu elit eget
							arcu comteger ut fermentum lorem. Lorem ipsum dolor sit amet. Sed
							tristique purus vitae volutpat ultrices. eu elit eget commodo. Sed
							tristique purus vitae volutpat ultrices. Aliquam eu elit eget arcu
							commodo.
						</p>
						<base-button class="btn--primary">FIND OUT MORE</base-button>
					</div>
				</div>
				<div class="col-sm-12 col-md-4">
					<ul class="find-out-more__icons">
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-clock"></span>
						</li>
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-volume-up"></span>
						</li>
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-laptop"></span>
						</li>
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-inbox"></span>
						</li>
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-lock"></span>
						</li>
						<li class="find-out-more__icon">
							<span class="fa fa-solid fa-cog"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BaseButton from '../Common/BaseButton.vue'

export default {
	components: {
		BaseButton,
	},
}
</script>

<style src="./find-out-more.scss" lang="scss"></style>
