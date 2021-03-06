$(document).ready(function() {
	window.User = {
		init: function() {
			$("#register-box").modal({
		    	show: false,
		    	keyboard: 'static',
		    	backdrop: true
		    });
		    $("#login-box").modal({
		    	show: false,
		    	keyboard: 'static',
		    	backdrop: true
		    });
		    $("#success-modal").modal({
		    	show: true,
		    	keyboard: 'static',
		    	backdrop: true
		    })
		    $(".phone-register").on("click", function() {
		    	$(".phone-number-register-box").toggle();
		    	$(".gmail-register").toggle();
		    	$(".register-form-container").toggleClass("register-height");
		    });
		    $("#register-box").on("hidden.bs.modal", function() {
		    	$(".phone-number-register-box").css("display", "none");
		    	$(".gmail-register").css("display", "block");
		    	$("label.error").css("display", "none");
		    	$(".register-form-container").removeClass("register-height");
		    });
		    $.validator.addMethod(
		    	"vn_phonenumber",
		    	function(value, element) {
		    		return this.optional(element) || /^(01[2689]|09)[0-9]{8}$/.test(value);
		    	}
		    );
		    $(".phone-number-register-form").validate({
		    	rules: {
		    		phonenumber_register: {
		    			required: true,
		    			vn_phonenumber: true,
		    			remote: {
		    				url: "user/check-exist-user-phonenumber",
		    				type: "post",
		    				data: {
		    					phonenumber_register: $(".phonenumber_register").val(),
		    					_token: $('input[name=_token]').val()
		    				} 
		    					
		    			}
		    		},
		    		password_register: {
		    			required: true,
		    			minlength: 8
		    		},
		    		repeatpassword_register: {
		    			required: true,
		    			equalTo: "#password_register"
		    		}
		    	},
		    	messages: {
	    			phonenumber_register: {
	    				required: "Nhập số điện thoại",
	    				vn_phonenumber: "Số điện thoại không hợp lệ",
	    				remote: "Số điện thoại đã tồn tại"
	    			},
	    			password_register: {
	    				required: "Nhập mật khẩu",
	    				minlength: "Mật khẩu phải từ 8 ký tự trở lên"
	    			},
	    			repeatpassword_register: {
	    				required: "Nhập lại mật khẩu",
	    				equalTo: "Mật khẩu không khớp"
	    			}
	    		}
		    });
		    $(".phone-number-login-form").validate({
		    	rules: {
		    		phonenumber_login: {
		    			required: true,
		    			vn_phonenumber: true
		    		},
		    		password_login: {
		    			required: true,
		    			minlength: 8
		    		}
		    	},
		    	messages: {
	    			phonenumber_login: {
	    				required: "Nhập số điện thoại",
	    				vn_phonenumber: "Số điện thoại không hợp lệ"
	    			},
	    			password_login: {
	    				required: "Nhập mật khẩu",
	    				minlength: "Mật khẩu phải từ 8 ký tự trở lên"
	    			}
	    		}
		    });
		    $(".phone-login").on("click", function(){
		        $(".gmail-login").toggle();
		        $(".phone-number-login-box").toggle();
		        $(".login-form-container").toggleClass("login-height");
	      	});
	      	$("#login-box").on('hidden.bs.modal', function () {
	        	$(".gmail-login").show();
	        	$(".phone-number-login-box").hide();
	        	$(".login-form-container").removeClass("login-height");
	        });
	        $(".alert-register-button").on('click', function (e) {
	        	$("#alert-login-modal").modal('hide');
	        	$("#register-box").modal('show');
	        	e.preventDefault();
	        });
	        $(".alert-login-button").on('click', function (e) {
	        	$("#alert-login-modal").modal('hide');
	        	$("#login-box").modal('show');
	        	e.preventDefault();
	        });
		}
	};

	window.SearchTagging = {
		init: function () {
			var tag_number = 0;
			$('.search-element').on('click', function (event) {
				event.preventDefault();

				var item = $(this).parent().attr("class");

				if(item === 'cate-item') {
					$('.cate-item > .search-element').each( function () {
						if ($(this).attr('class').search('active-search-tagging') !== -1) {
							$(this).removeClass('active-search-tagging');
						}
					});
				}

				if($(this).attr('class').search('active-search-tagging') !== -1) {

					var active_value = $(this).attr('value');
					$('.tag-item').each( function () {
						if($(this).attr('value') === active_value) {
							$(this).remove();
						}
					});
					$(this).removeClass('active-search-tagging');
				}
				else {
					$(this).addClass('active-search-tagging');
					var value = $(this).attr("value");
					var num_search_tag = $('.tag-item').length;
					if (num_search_tag) {
						++tag_number;
					}
					else {
						tag_number = 1;
					}
					switch(item) {
						case 'cate-item' : {
							if($('.tag-item[item="cate-item"]').length > 0) {
								$('.tag-item[item="cate-item"]').remove();
							}
							$('.list-tagging-container').append('<div class="tag-item" stt="' + tag_number + '" item="cate-item" value="' + value + '"><div>' + value + '</div><div stt="' + tag_number + '" class="remove-tag-item" value="' + value + '">x</div><input type="hidden" value="' + value + '" name="' + item + '"/></div>');
							break;
						}
						case 'color-item' : {
							$('.list-tagging-container').append('<div class="tag-item" stt="' + tag_number + '" value="' + value + '"><div>' + value + '</div><div stt="' + tag_number + '" class="remove-tag-item" value="' + value + '">x</div><input type="hidden" value="' + value + '" name="color-item[' + tag_number + ']"/></div>');
							break;
						}
						case 'feature-item' : {
							$('.list-tagging-container').append('<div class="tag-item" stt="' + tag_number + '" value="' + value + '"><div>' + value + '</div><div stt="' + tag_number + '" class="remove-tag-item" value="' + value + '">x</div><input type="hidden" value="' + value + '" name="feature-item[' + tag_number + ']"/></div>');
							break;
						}
					}
				}
				
			});
			$(document).on('click', '.remove-tag-item', function () {
				var stt = $(this);
				$('.tag-item').each( function () {
					if($(this).attr('stt') === stt.attr('stt')) {
						$(this).remove();
					}
				});
				$('.search-element').each( function () {
					if($(this).attr('value') == stt.attr('value')) {
						$(this).removeClass('active-search-tagging');
					}
				})
			});
		}
	};
});
