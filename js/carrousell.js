/**
 * Created by bardiles on 22.04.14.
 */

function Carroussel (options){

	var self 			 = this;
	this.options		 = options;
	this.deviceState 	 = this.options.deviceState;
	this.carrouselHolder = $(this.options.itemsHolder);
	this.controlsHolder  = $(this.options.controlsHolder);
	this.carrousselItems = this.carrouselHolder.find('li.item-carrousell');
	this.itemsProStep	 = this.options.amountItemsLg;

	this.marginSize		 = this.options.marginSize;
	this.margins		 = this.itemsProStep - 1;
	this.controls		 = [];

	this.init = function(newDevice){
		this.deviceState = newDevice
		this.updateSliderData(newDevice);
		this.createSlides();
		this.createControls();
	};

	this.updateSliderData = function(device){
		switch (device){
			case 1:
				self.itemsProStep =  self.options.amountItemsLg;
				break;
			case 2:
				self.itemsProStep =  self.options.amountItemsMd;
				break;
			case 3:
				self.itemsProStep =  self.options.amountItemsSm;
				break;
			case 4:
				self.itemsProStep =  self.options.amountItemsXs;
				break;
		}
		this.deviceState = device;
		this.margins 	 = this.itemsProStep - 1;
	};

	this.updateCarrousell = function(device){
		this.deviceState 	= device
		this.updateSliderData(device);
		this.createSlides();
		this.createControls();
	};

	this.createControls = function(){
		this.controlsHolder.empty();
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
		var sizeForSlides = (100 - (self.margins * self.marginSize)) /  self.itemsProStep;
		this.carrousselItems.each(function(index, element){
			$(element).css({
				'width' 		 : sizeForSlides+'%',
				'height'		 : 'auto',
				'backgroundColor': '#f2f2f2',
				'margin-right'	 :  ((index +1) % self.itemsProStep)  == 0 ? 0 : self.marginSize + '%'
			});
			index < self.itemsProStep ? $(element).show() : $(element).hide();
		});
	};

	this.updateSlides = function($element){
		var from 		  = parseInt($element.attr('data-slide') ,10),
			to   		  = (from + self.itemsProStep) - 1,
			sizeForSlides = (100 - (self.margins * self.marginSize)) /  self.itemsProStep;

		this.carrousselItems.each(function(index, element){
			$(element).css({
				'width' 		: sizeForSlides+'%',
				'height'		: 'auto',
				'margin-right'	:  ((index +1) % self.itemsProStep)  == 0 ? 0 : self.marginSize  + '%'
			});
		});

		$(self.controls).each(function(index, item){
			$(item).css({'background-color': 'black'});
		});

		$element.css({'background-color': 'blue'});

		self.carrousselItems.each(function(index, item){
			if (index >= from && index <= to) {
				$(item).show();
			} else {
				$(item).hide();
			}
		});
	};
}