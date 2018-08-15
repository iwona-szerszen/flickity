(function(){

	const carousel = document.querySelector('.carousel');
	const templateSlide = document.getElementById('template-carousel-slide').innerHTML;

	const progressBar = document.querySelector('.progress-bar');
	const restartButton = document.getElementById('restart-button');

	Mustache.parse(templateSlide);

	for (let i = 0; i < carouselData.length; i++) {
		carousel.insertAdjacentHTML('beforeEnd', Mustache.render(templateSlide, carouselData[i]));
	}

	const flkty = new Flickity(carousel, {
		cellAlign: 'left',
		pageDots: false,
		hash: true
	});

	restartButton.addEventListener('click', function() {
		flkty.select(0);
	});

	flkty.on('scroll', function(progress) {
		progress = Math.max(0, Math.min(1, progress));
		progressBar.style.width = progress * 100 + '%';
	})

	window.initMap = function() {
		const map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: carouselData[0].coords});
		let markers = [];

		for (let i = 0; i < carouselData.length; i++) {
			markers.push(new google.maps.Marker({position: carouselData[i].coords, map: map}));
		}
	};
	
})();