/**
 * Created by bardiles on 22.04.14.
 */

function Carroussel (deviceState, ulElement, controlsHolder){
	var self 			 = this;
	this.deviceState 	 = deviceState || APP.getCurrentDevice().deviceValue;
	this.carrouselHolder = $(ulElement);
	this.carrousselItems = this.carrouselHolder.find('li.item-carrousell');
	this.itemsProStep	 = 4;
	this.controlsHolder  = $(controlsHolder);
	this.controls		 = [];

	this.init = function(newDevice){
		this.deviceState = newDevice;

		switch (this.deviceState){
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


		this.createSlides();
		this.createControls();
	};

	this.updateCarrousell = function(device){
		var self = this;
		this.deviceState = device;
		switch (this.deviceState){
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

		this.init(this.deviceState);
	};

	this.createControls = function(){
		var self 	 = this;

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
		var self 		  = this;
		var margins 	  = this.itemsProStep - 1;
		var marginSize    = 5;
		var sizeForSlides = Math.floor((100 - (margins * marginSize)) /this.itemsProStep );

		this.carrousselItems.each(function(index, element){
			$(element).css('width', sizeForSlides+'%');
			$(element).css('height', 'auto');
			$(element).css('backgroundColor', APP.getRandomColor());
			$(element).css('margin-right',  ((index +1) % self.itemsProStep  == 0) ? 0 : '5%');

			if (index < self.itemsProStep){
				$(element).show();
			} else {
				$(element).hide();
			}

		});
	};

	this.updateSlides = function($element){
		var self 		  = this;
		var margins 	  = this.itemsProStep - 1;
		var marginSize    = 5;
		var sizeForSlides = Math.floor((100 - (margins * marginSize)) /this.itemsProStep );

		this.carrousselItems.each(function(index, element){
			$(element).css('width', sizeForSlides+'%');
			$(element).css('height', 'auto');
			$(element).css('backgroundColor', 'red');
			$(element).css('margin-right',  ((index +1) % self.itemsProStep  == 0) ? 0 : '5%');

		});

		$(self.controls).each(function(index, item){
			$(item).css({'background-color': 'black'});
		});

		$element.css({'background-color': 'blue'});

		var from = parseInt($element.attr('data-slide') ,10);
		var to   = (from + self.itemsProStep) - 1;


		self.carrousselItems.each(function(index, item){
			if (index >= from && index <= to) {
				$(item).css('background-color', APP.getRandomColor());
				$(item).show();

			} else {
				$(item).css('background-color', APP.getRandomColor());
				$(item).hide();
			}
		});


	};


}