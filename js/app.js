/**
 * Created by bardiles on 22.04.14.
 */

function App(){
	if ( !(this instanceof App) ){
		return new App();
	}
	var self			  = this;
	this.indicatorID 	  = 'device-indicator';
	this.indicatorElement = (function(){
		var indicator = $('<div id="'+ self.indicatorID+'"></div>');

		indicator.appendTo('body');

		return indicator;
	})();
}


App.prototype.getCurrentDevice = function () {
		var result      = parseInt(this.indicatorElement.css("z-index"), 10),
			device		= null;

		switch (result){
			case 1 :
				device = 'large';
				break;
			case 2 :
				device = 'medium';
				break;
			case 3 :
				device = 'small';
				break;
			case 4 :
				device = 'extra-small';
				break;
			default:
				device = 'extra-small';
				result = 1;
				break;
		}

	return {
		device		: device,
		deviceValue : result
	};
};

App.prototype.getRandomColor = function () {
	var rgb 	= [];

	for (var i = 0; i < 3; i++) {
		rgb[i] = Math.round(255 * Math.random());
	}


	return 'rgb(' + rgb.join(',') + ')';


};

