jQuery( document ).ready(function($) {
			    
    jQuery.fn.displayLocationOnHover = function ( options ) { 

    	let settings = $.extend( { mapWidth: "50" }, options );

		let map_obj = jQuery(settings.wpgmp_map_selector).data("wpgmp_maps");

		let mapId = map_obj.map_data.map_property.map_id; 

		let mapDivHeight = map_obj.map_data.map_options['height']; 

		let listingDivHeight = '';

		if( map_obj.map_data.listing !== undefined && parseInt(map_obj.map_data.places.length) > parseInt(map_obj.map_data.listing.pagination.listing_per_page) ){
	 		listingDivHeight = mapDivHeight - 65;
	 	}
	 	else {
	 		listingDivHeight = mapDivHeight;	
		}
		
	 	let enable_zoom_on_hover = function(){

	 		jQuery(map_obj.container).on("mouseenter", ".wpgmp_locations a[data-marker]", function() {
	 			
	 			let current_link = this;
                let current_marker = $(this).data('marker');
                setTimeout(function() {
                    map_obj.open_infowindow($(current_link).data("marker"));
                }, 600);
                $.each(map_obj.map_data.places, function(key, place) {
	                if (parseInt(place.id) == parseInt(current_marker) && place.marker.visible === true) {
	                   		map_obj.map.setCenter(place.marker.getPosition());
	                   		return false;
	                }
	            });
                map_obj.map.setZoom(parseInt(8));
                    
            });
            
            jQuery(map_obj.container).on("mouseenter", ".map-listing-container .fc-feature-img img", function() {
				
				$(this).parent().parent().parent('li').next('li').find('.fc-itemcontent-padding').find('.fc-item-title').find('a[data-marker]').trigger('mouseenter');
			}); 
			
	 	}

		let apply_layout_changes = function(){ 

			jQuery(map_obj.container).find('.location_listing'+mapId).css({"height": listingDivHeight+'px', "overflow": 'auto'}); 
		}

		let make_compatible_with_old_version = function(){ 

			if(jQuery(map_obj.container).find('.wpgmp_filter_wrappers').length > 0 && jQuery(map_obj.container).find('.search-form-container').find('.wpgmp_filter_wrappers').html() == ''){ 

			   jQuery(map_obj.container).find('.search-form-container').find('.wpgmp_filter_wrappers').remove();			
			   jQuery(map_obj.container).find('.map_div').find('.wpgmp_filter_wrappers').clone(true,true).appendTo( jQuery(map_obj.container).find('.search-form-container') );

			   jQuery(map_obj.container).find('.map_div').find('.wpgmp_filter_wrappers').remove();

			}

		}
		
	 	if (map_obj !== 'undefined' && map_obj.map_data.listing && map_obj.map_data.layoutManager) { 
			make_compatible_with_old_version();
	 		apply_layout_changes(); 		
	 	}

	 	if (map_obj !== 'undefined' && map_obj.map_data.listing && map_obj.map_data.zoomOnHover) { 
	 		enable_zoom_on_hover(); 		
	 	}

	 	return this;
	};

	jQuery("div.wpgmp_map_container").each(function (index, element) { 

		let wpgmp_map_selector = "#"+$(this).attr('rel');
		let wpgmp_layout_args = {'wpgmp_map_selector' : wpgmp_map_selector};
		jQuery(wpgmp_map_selector).displayLocationOnHover(wpgmp_layout_args);
	    
	});
	
	jQuery("input[name='extensions_fields[layout_settings][layout_id]").on("change", function($) {

		$("input[name='extensions_fields[layout_settings][layout_id]").closest('div').find('.layout-img').removeClass("selected");
    	if($(this).is(":checked")) {
        	$(this).closest('div').find('.layout-img').addClass("selected");
      	}
    
    });

	if(jQuery('.wpgmp_layouts_demo').length > 0){

		jQuery("ul.nav-tabs").find('li').on("click", function($) {

			jQuery("div.wpgmp_map_container").each(function (index, element) { 
				
				let wpgmp_map_selector = "#"+jQuery(this).attr('rel');
				let map_obj = jQuery(wpgmp_map_selector).data("wpgmp_maps");
				var gmap = map_obj.map;
		        var zoom = gmap.getZoom();
		        var center = gmap.getCenter();
		        google.maps.event.trigger(gmap, 'resize');
		        gmap.setZoom(4);
	   
		    
			});
       
		});    

	}
		
});
