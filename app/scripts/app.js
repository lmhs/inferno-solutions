import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	svg4everybody();

	function addClass(el, cls) {
		if (el.classList) {
			el.classList.add(cls);
		}	else {
			el.className.baseVal += ' ' + cls;
		}
	}


	function removeClass(el, cls) {
		if (el.classList) {
			el.classList.remove(cls);
		} else {
			el.className.baseVal = el.className.baseVal.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	function hasClass(el, cls) {
		let result = false;
		if (el.classList) {
			result = el.classList.contains(cls);
			console.log(el.classList.contains(cls));
		}	else {
			result = new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
		}
		return result;
	}

	function toggleClass(el, cls) {
		if (el.classList) {
			el.classList.toggle(cls);
		} else {
			const classes = el.className.split(' ');
			const existingIndex = classes.indexOf(cls);

			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			} else {
				classes.push(cls);
			}

			el.className = classes.join(' ');
		}
	}

	// click everywhere — close dropdowns
	$(document).click( function ( ev ) {
		if ( $(ev.target).closest('.js-main-menu-item').length === 0 ) {
			$('#js-top-menu').find('.js-main-menu-item.is-selected').removeClass('is-selected');
		}
	});


	// check section
	$('.js-check-section').on('click', function ( ev ) {
		const selected = 'check-section--is-selected';
		const self = ev.target;
		toggleClass(self, selected);
	});


	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function () {
			// Make sure we trim BOM and NBSP
			const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function () {
				return this.replace(rtrim, '');
			};
		})();
	}


	function onInputBlur( ev ) {
		if (ev.target.value.trim() === '') {
			removeClass( ev.target, 'field--is-filled' );
		} else {
			addClass(ev.target, 'field--is-filled');
		}
	}

	[].slice.call( document.querySelectorAll( 'input.field' ) ).forEach( function ( inputEl ) {
		// in case the input is already filled..
		if (inputEl.value.trim() !== '') {
			addClass( inputEl, 'field--is-filled' );
		}

		// events:
		inputEl.addEventListener( 'blur', onInputBlur );
	} );

	const openedMenu = 'btn__menu--is-opened';
	$('.js-btn-toggle-menu').hover(function () {
		console.log('mouseenter');
		const parent = $(this).closest('.js-btn-with-menu');
		const menu = parent.find('.js-btn-menu');
		menu.addClass(openedMenu);
	}, function () {
		const parent = $(this).closest('.js-btn-with-menu');
		const menu = parent.find('.js-btn-menu');
		console.log('mouseleave');
		menu.removeClass(openedMenu);
	});

	$('.js-btn-with-menu').on('click', '.js-btn-menu a', function () {
		const menu = $(this).closest('.js-btn-menu');
		menu.removeClass(openedMenu);
	});

});
