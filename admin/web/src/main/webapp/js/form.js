var formUtils = {
    changeAction : function(selector, action) {
        var modal = $(selector);
        var form = modal.find('form');
        form.attr('action', action);
		return form;
    },
    initModalForm : function(selector) {
    	var preventSubmit = function(event) {
	        if(event.keyCode == 13) {
	            
	            event.preventDefault();
	            //event.stopPropagation();
	            return false;
	        }
	    }
		
	    $(selector).keypress(preventSubmit);
		$(selector).on( 'shown',
						function() {
            $modal = $(this);
            $form = $(this).find('form');
            $form.validate({
                onKeyup : false,
                sendForm : false,
                        eachValidField : function() {
											$(this).closest('.control-group')
													.removeClass('error')
													.addClass('success');
                        },
                        eachInvalidField : function() {
                            $(this).closest('.control-group')
                                    .removeClass('success')
                                    .addClass('error');
                        },
                        valid : function() {
                            $.ajax({
                                type : 'POST',
								url : $($form).attr('action'),
								data : $($form).serialize(),
                                success : function(response) {
                                    $form.validateDestroy();
                                    $modal.modal('hide');
                                    var $msg = $('<div class="modal modal-in"></div>');
                                    $('#message').remove();
                                    $('body').append(response);
															$('#message').modal('show');
															$('#message').on(
																			'hide',
																			function() {
                                        window.location.reload()
                                    })
                                },
														error : function(response) {
                                	
                                }

                            });
                        }

            });
        });
    }
}
$(function() {

    $('body').on('hidden', '.modal', function() {
        $(this).removeData('modal');
    });
    jQuery.validateExtend({
        equalTo : {
            conditional : function(value) {
                var compareTo = $($(this).attr('data-equalTo'));
                return compareTo.val() == value;
            }
        }
	    });

});

function postData(targetId){
	var options = {
			
			target: '#'+targetId
			/*
			success: function(html) {
				//  the next server response could not have the same id
				$("#${containerId}").replaceWith($('#${containerId}', $(html)));
				//$("#${containerId}").html(html);
			}*/
		};

	$(this).submit(options);
	return false;   
}
