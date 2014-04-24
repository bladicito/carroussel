/**
 * Created by bardiles on 22.04.14.
 */

function Carroussel (deviceState, ulElement, controlsHolder){
	var self 			 = this;
	this.deviceState 	 = deviceState;
	this.carrouselHolder = $(ulElement);
	this.carrousselItems = this.carrouselHolder.find('li.item-carrousell');
	this.itemsProStep	 = 4;
	this.controlsHolder  = $(controlsHolder);
	this.controls		 = [];
	this.margins		 = this.itemsProStep - 1;
	this.marginSize		 = '4%';

	this.init = function(newDevice){
		this.updateSliderData(newDevice);
		this.createSlides();
		this.createControls();
	};

	this.updateSliderData = function(device){

		switch (device){
			case 1:
				self.itemsProStep =  4;
				break;
			case 2:
				self.itemsProStep =  3;
				break;
			case 3:
				self.itemsProStep =  2;
				break;
			case 4:
				self.itemsProStep =  1;
				break;
		}

		self.margins = this.itemsProStep - 1;
	};

	this.updateCarrousell = function(device){

		this.init(device);
	};

	this.createControls = function(){

		self.controlsHolder.empty();
		this.controls = [];

		this.carrousselItems.each(function(index, element){
			if (index % self.itemsProStep == 0){
				var newControl = $('<div data-slide="'+ index +'">'+ +'</div>');
				newControl.css({
					width: 25,
					height: 25,
					'background-color': index === 0 ? 'blue' : 'black',
					position: 'absolute',
					left : (index) * (25 + 10),
					bottom: 0
				});
				self.controls.push(newControl);
				newControl.on('click', function(e){
					e.preventDefault();
					self.updateSlides($(this));
				});

			}
		});

		$(this.controls).each(function(index, item){
			$(item).appendTo(self.controlsHolder);
		});
	};



	this.createSlides = function(){
		var sizeForSlides = Math.floor((100 - (self.margins * parseInt(self.marginSize), 10)) / self.itemsProStep );

		this.carrousselItems.each(function(index, element){
			$(element).css({
				'width' 		 : sizeForSlides+'%',
				'height'		 : 'auto',
				'backgroundColor': APP.getRandomColor,
				'margin-right'	 :  ((index +1) % self.itemsProStep)  == 0 ? 0 : self.marginSize
			});
			index < self.itemsProStep ? $(element).show() : $(element).hide();
		});
	};

	this.updateSlides = function($element){
		var sizeForSlides = Math.floor((100 - (self.margins * parseInt(self.marginSize), 10))  / self.itemsProStep );
		console.log(self.margins);
		console.log(parseInt(self.marginSize));
		console.log(self.itemsProStep);
		this.carrousselItems.each(function(index, element){
			$(element).css({
				'width' 		: sizeForSlides+'%',
				'height'		: 'auto',
				'margin-right'	:  ((index +1) % self.itemsProStep)  == 0 ? 0 : self.marginSize
			});
		});

		$(self.controls).each(function(index, item){
			$(item).css({'background-color': 'black'});
		});

		$element.css({'background-color': 'blue'});

		var from = parseInt($element.attr('data-slide') ,10);
		var to   = (from + self.itemsProStep) - 1;


		self.carrousselItems.each(function(index, item){
			if (index >= from && index <= to) {
				$(item).show();

			} else {
				$(item).hide();
			}
		});


	};


}