$(document).ready(function () {

	$(window).on('load scroll', function () {
		var scrolled = $(this).scrollTop();
		$('#title').css({
			'transform': 'translate3d(0, ' + -(scrolled * 0.2) + 'px, 0)', // parallax (20% scroll rate)
			'opacity': 1 - scrolled / 500, // fade out at 500px from top
		});
		$('.presentation-text').css({
			'opacity': 1 - scrolled / 150 // fade out at 150px from top
		});
		$('.presentation').css({
			'transform': 'translate3d(0, ' + -(scrolled * 0.4) + 'px, 0)',
			'opacity': 1 - scrolled / 800, // fade out at 400px from top
		});
		$('#hero-vid').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
	});

	let btn = document.querySelectorAll('.accordion button');
	for (let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', function(){
			let p = btn[i].parentElement.nextElementSibling;
			if (p.classList.contains('faq-active')) {
				p.classList.toggle('faq-active');
				btn[i].innerHTML = '<span class="material-icons-add"></span>'
			} else {
				p.classList.toggle('faq-active');
				btn[i].innerHTML = '<span class="material-icons-remove"></span>'
			}
		});
	}

	$(".go-to").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			this.lastChild.classList.toggle("material-icons-remove");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight){
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		});
	}

	// MDB Lightbox Init
	$(function () {
		$("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
		});
	});

	let modalId = $('#image-gallery');

	$(document)
  	.ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
	$(document)
		.keydown(function (e) {
			switch (e.which) {
				case 37: // left
					if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
						$('#show-previous-image')
							.click();
					}
					break;

				case 39: // right
					if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
						$('#show-next-image')
							.click();
					}
					break;

				default:
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});

	if (+document.documentElement.clientWidth < 1200) {
		document.querySelector('.navbar-toggler-icon').addEventListener('click', function() {
			document.querySelector('.presentation').classList.toggle('form-active');
		});
	}

	window.addEventListener('scroll', function() {
		if (pageYOffset > +document.documentElement.clientHeight * 1.1) {
			document.querySelector('.go-up').style.display = 'block';
		} else {
			document.querySelector('.go-up').style.display = 'none';
		}
		if (pageYOffset > 30) {
			document.getElementById('title').style.borderBottom = 'none';
		} else {
			document.getElementById('title').style.borderBottom = '1px solid #5E5B55';
		}
	});

