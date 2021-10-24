$(function(){ EG_9aa5ea01.Init(); });

var EG_9aa5ea01 = {

  animations_functions: [
    			'randomSmart',
    			'random',
				'cube', 
				'cubeRandom', 
				'block', 
				'cubeStop', 
				'cubeStopRandom', 
				'cubeHide', 
				'cubeSize', 
				'horizontal', 
				'showBars', 
				'showBarsRandom', 
				'tube',
				'fade',
				'fadeFour',
				'paralell',
				'blind',
				'blindHeight',
				'blindWidth',
				'directionTop',
				'directionBottom',
				'directionRight',
				'directionLeft',
				'cubeSpread',
				'glassCube',
				'glassBlock',
				'circles',
				'circlesInside',
				'circlesRotate',
				'cubeShow',
				'upBars', 
				'downBars', 
				'hideBars', 
				'swapBars', 
				'swapBarsBack', 
				'swapBlocks',
				'cut'
			],

  
  getValByInd: function(i, valuesStr) {
    valuesStr = valuesStr.split(',');
    if (i >= 0 && i < valuesStr.length)
      return (valuesStr[i] === 'null') ? null : valuesStr[i];
    else
      return null;
  },
  
  getAnimation: function(animInd) {
    if (animInd >= 0 && animInd < this.animations_functions.length)
      return this.animations_functions[animInd];
    else
      return null;
  },
  
  getTheme: function(themeInd) {
    return this.getValByInd(themeInd, 'null,clean,minimalist,round,square');
  },
  
  
  
	Init: function() {
		if (OEConfEG_9aa5ea01 === undefined) return;
		var allElements = OEConfEG_9aa5ea01;

		for(var ID in allElements) {
			var $el = $('#'+ID); // le tag <div> principale de l'élément
			var properties = allElements[ID]; // les propriétés de l'élément disponibles pour JS
			this.InitElement(ID, $el, properties, this);
		}
      
		if (WEInfoPage.RenderMode != 'Editor') { // no display in the editor
      		// resize handler for ALL sliders:
        	$(window).bind('resize', function(){ $('.box_skitter').oe_skitter_onResize(); });
        }

	},

  
	InitElement: function(ID, $el, properties, self) {
		
		var $slider = $el.find('.box_skitter');
      
		if (WEInfoPage.RenderMode == 'Editor') { // no display in the editor
          $slider
          	.css('background-color', 'rgba(200, 200, 200, 0.25)')
          	.css('text-shadow', '0 0 16px black')
            .css({'color': 'white', 'font-size': '10px'})
          	.html('<table width="100%" height="100%" style="vertical-align:middle"><tr><td class="msg" style="vertical-align:middle; text-align:center;"></td></tr></table>')
          .delay(500).fadeOut(1500, function(){ $(this).remove(); });
          $slider.find('.msg').html(WEEdSiteCommon.GetLocalizableString(OEConfSharedEG_9aa5ea01.Text.Msg_Editor));

            return;
		}
      
		var animation = self.getAnimation(properties.AnimationType);
		var theme = self.getTheme(properties.Theme);
      
      	var _interval = properties.Interval;
      	if (_interval < 0) _interval = 0;
      	if (_interval > 600000) _interval = 600000; // 10 min max
      
      	var _velocity = properties.Velocity;
      	if (_velocity < 0) _velocity = 0;
      	if (_velocity > 200) _velocity = 200;
      
      
		var config = {
			
          responsive: true,
			
		  cover: !!properties.Cover,
			
          animation: self.getAnimation(properties.AnimationType),
			
          theme: self.getTheme(properties.Theme),
          
          auto_play: properties.Auto_Play,          
          show_randomly: properties.Show_Randomly,          
          stop_over: properties.Stop_Over,
          
          interval: _interval,
          velocity: _velocity*0.01,
          
          label: properties.Label,
          labelAnimation: self.getValByInd(properties.Label_Animation, "slideUp,fixed,left,right"),
          
          numbers: properties.Numbers,
          numbers_align: self.getValByInd(properties.Numbers_Align, "center,left,right"),
          
          navigation: properties.Navigation,
          enable_navigation_keys: properties.Navigation,
          
          thumbs: properties.Thumbs,
          
          dots: properties.Dots,
          preview: properties.Preview_Dots,
          
          controls: properties.Controls,
          controls_position: self.getValByInd(properties.Controls_Position, "center,leftTop,rightTop,leftBottom,rightBottom")
          
        };
      
      
      $slider.oe_skitter(config);
      
      for (resImg in OEConfSharedEG_9aa5ea01.Images) WEEdSiteCommon.LinkGetPath(OEConfSharedEG_9aa5ea01.Images[resImg]); // may be necessary to export resource images
        
	}

};