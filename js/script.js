(function(){

	const carousel = document.querySelector('.carousel');
	const templateSlide = document.getElementById('template-carousel-slide').innerHTML;

	const progressBar = document.querySelector('.progress-bar');
	const restartButton = document.getElementById('restart-button');

	const userEvents = [];

	function isCenterMapPossible(userEvents) {
		if (userEvents[userEvents.length-2] == 'click') {
			return false;
		} else {
			return true;
		}
	}

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
		userEvents.push('clickRestart');
		flkty.select(0);
	});

	window.initMap = function() {

		const map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: carouselData[0].coords});

		let markers = [];
		for (let i = 0; i < carouselData.length; i++) {
			markers.push(new google.maps.Marker({
				position: carouselData[i].coords,
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			}));
			markers[i].addListener('click', function() {
				userEvents.push('click');
				flkty.select(i);
			});
		}
		markers[0].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

		flkty.on('change', function(index) {

			userEvents.push('change');

			if (isCenterMapPossible(userEvents)) {
				map.panTo(carouselData[index].coords);
			}

			for (let i = 0; i < markers.length; i++) {
				if (i == index) {
					markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
				} else {
					markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
				}
			}

			/* MUCH MORE COMPLICATED CONDITION
			for (let i = 0; i < markers.length; i++) {
				if (markers[i].position.lat() == carouselData[index].coords.lat && 
					markers[i].position.lng().toFixed(3) == carouselData[index].coords.lng) {
					markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
				} else {
					markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
				}
			}
			*/
		});
	};

	flkty.on('scroll', function(progress) {
		progress = Math.max(0, Math.min(1, progress));
		progressBar.style.width = progress * 100 + '%';
	});

})();