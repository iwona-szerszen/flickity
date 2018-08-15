(function(){

	const carousel = document.querySelector('.carousel');
	const templateSlide = document.getElementById('template-carousel-slide').innerHTML;

	Mustache.parse(templateSlide);

	for (let i = 0; i < carouselData.length; i++) {
		carousel.insertAdjacentHTML('beforeEnd', Mustache.render(templateSlide, carouselData[i]));
	}

	const flkty = new Flickity(carousel, {
		cellAlign: 'left',
		pageDots: false,
		hash: true
	});

	const progressBar = document.querySelector('.progress-bar');

	const restartButton = document.getElementById('restart-button');

	restartButton.addEventListener('click', function() {
		flkty.select(0);
	});

	flkty.on('scroll', function(progress) {
		progress = Math.max(0, Math.min(1, progress));
		progressBar.style.width = progress * 100 + '%';
	})
	
})();