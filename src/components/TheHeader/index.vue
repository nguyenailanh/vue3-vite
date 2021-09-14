<template>
	<header class="component-header">
		<div class="container">
			<div class="component-header__wrapper">
				<div class="component-header__logo">
					<a href="#">
						Company
						<span> Name </span>
					</a>
				</div>
				<ul class="component-header__nav">
					<li><router-link to="/login">Login</router-link></li>
					<li><router-link to="/about">About</router-link></li>
				</ul>
			</div>
		</div>
	</header>
</template>

<style src="./header.scss"></style>
