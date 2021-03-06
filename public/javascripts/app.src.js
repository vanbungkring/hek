
/**
 * 0.1.0
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */
var uiLoad = uiLoad || {};

(function($, $document, uiLoad) {
	"use strict";

		var loaded = [],
		promise = false,
		deferred = $.Deferred();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		uiLoad.load = function (srcs) {
			srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/);
			if(!promise){
				promise = deferred.promise();
			}

      $.each(srcs, function(index, src) {
      	promise = promise.then( function(){
      		return src.indexOf('.css') >=0 ? loadCSS(src) : loadScript(src);
      	} );
      });
      deferred.resolve();
      return promise;
		};

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		var loadScript = function (src) {
			if(loaded[src]) return loaded[src].promise();

			var deferred = $.Deferred();
			var script = $document.createElement('script');
			script.src = src;
			script.onload = function (e) {
				deferred.resolve(e);
			};
			script.onerror = function (e) {
				deferred.reject(e);
			};
			$document.body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise();
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		var loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise();

			var deferred = $.Deferred();
			var style = $document.createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				deferred.resolve(e);
			};
			style.onerror = function (e) {
				deferred.reject(e);
			};
			$document.head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise();
		}

})(jQuery, document, uiLoad);
// lazyload config

var jp_config = {
    hackaton: [
        'https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.4/numeral.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css'
    ],
    upload: [
        'https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css', '/javascripts//overide/dropzone.js'
    ],
    highchart: [
        'https://cdnjs.cloudflare.com/ajax/libs/highcharts/5.0.7/highcharts.js', '/backend/js/overide/highchart.js'
    ],
    ekko: [
        'https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.0.0/ekko-lightbox.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.0.0/ekko-lightbox.min.js'
    ],
    easyPieChart: ['https://cdnjs.cloudflare.com/ajax/libs/easy-pie-chart/2.1.6/jquery.easypiechart.min.js'],
    sparkline: ['https://cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.min.js'],
    plot: [
        'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.pie.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.resize.js'
    ],
    swal: [
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-sweetalert/1.0.1/sweetalert.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-sweetalert/1.0.1/sweetalert.min.css'
    ],
    parsley: ['https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.6.0/parsley.min.js'],
    summernote: [
        'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.css', 'https://widget.cloudinary.com/global/all.js', '/backend/js/overide/summernote.js'
    ],
    cloudinary: [
        'https://widget.cloudinary.com/global/all.js', '/backend/js/overide/cloudinary.js'
    ],
    moment: ['https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js'],
    screenfull: ['https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/3.0.2/creenfull.min.js'],
    slimScroll: ['https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.8/query.slimscroll.min.js'],
    sortable: ['https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.4.2/Sortable.min.js'],
    nestable: [
        'https://cdnjs.cloudflare.com/ajax/libs/Nestable/2012-10-15/query.nestable.min.js', '/backend/js/jquery/nestable/jquery.nestable.css'
    ],
    filestyle: ['https://cdnjs.cloudflare.com/ajax/libs/bootstrap-filestyle/1.2.1/bootstrap-filestyle.min.js'],
    slider: [
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.5.4/ootstrap-slider.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.5.4/css/bootstrap-slider.min.css'
    ],
    TouchSpin: [
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-touchspin/3.1.2/query.bootstrap-touchspin.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-touchspin/3.1.2/jquery.bootstrap-touchspin.min.css'
    ],
    dataTable: [
        'https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/js/jquery.dataTables.min.js', '/backend/js/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
        // '/backend/js/custom/datatablesOptions.js',
        '/backend/js/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
    ],
    vectorMap: [
        'https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.min.css'
    ],
    fullcalendar: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.css', '/backend/js/jquery/fullcalendar/dist/fullcalendar.theme.css'
    ],
    daterangepicker: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/2.1.19/daterangepicker.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker3.min.css'
    ],
    tagsinput: [
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css'
    ],
    select2: [
        'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.css'
    ],
    front: ['/backend/js/overide/slick-main.js', '/backend/js/overide/slick.js']
};

+function ($) {

  $(function(){

      $("[ui-jq]").each(function(){
        var self = $(this);
        var options = eval('[' + self.attr('ui-options') + ']');

        if ($.isPlainObject(options[0])) {
          options[0] = $.extend({}, options[0]);
        }

        uiLoad.load(jp_config[self.attr('ui-jq')]).then( function(){          
          self[self.attr('ui-jq')].apply(self, options);
        });
      });

  });
}(jQuery);
+function ($) {

  $(function(){

      // nav
      $(document).on('click', '[ui-nav] a', function (e) {
        var $this = $(e.target), $active;
        $this.is('a') || ($this = $this.closest('a'));
        
        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
        
        ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
        $this.parent().toggleClass('active');
        
        $this.next().is('ul') && e.preventDefault();
      });

  });
}(jQuery);
+function ($) {

  $(function(){

      $(document).on('click', '[ui-toggle-class]', function (e) {
        e.preventDefault();
        var $this = $(e.target);
        $this.attr('ui-toggle-class') || ($this = $this.closest('[ui-toggle-class]'));
        
		var classes = $this.attr('ui-toggle-class').split(','),
			targets = ($this.attr('target') && $this.attr('target').split(',')) || Array($this),
			key = 0;
		$.each(classes, function( index, value ) {
			var target = targets[(targets.length && key)];
			$( target ).toggleClass(classes[index]);
			key ++;
		});
		$this.toggleClass('active');

      });
  });
}(jQuery);

+function ($) {

  $(function(){

  	// Checks for ie
    var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
    isIE && $('html').addClass('ie');

 	// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
	var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
	(/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua) && $('html').addClass('smart');

  });
}(jQuery);

