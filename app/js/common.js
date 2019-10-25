let huE_common = {

	store: new (require('electron-store'))(),
	huejay: require('huejay'),
	huejayClient: null,
	hueHacking: require('hue-hacking-node'),
    hueHackingColors: new (require('hue-hacking-node')).HueColors(),
	uuid: require('uuid/v4'),
	os: require('os'),
	htmlDecode: function(value) { return $('<textarea/>').html(value).text(); },

	switchToMainContentElement(elementSuffix) {
		$('div[id^="main-content-"]').each(function(index, element) {
			if (element.id.endsWith(elementSuffix)) {
				$(element).show();
			} else {
				$(element).hide();
			}
		});
	},

	setSpinner(element, text) {
		let spinner = Handlebars.compile(Handlebars.partials.spinner);

		element.empty();
		element.html(spinner({text: text}));
	},

	setTemplate(element, template, context) {
		$.get(template, function (data) {
			let compiledTemplate = Handlebars.compile(data);
			element.empty();
			element.html(compiledTemplate(context));
		}, 'html')
	},

	showError(label, message) {
		$('#error-modal-label').text(label);
		$('#error-modal-message').text(message);
		$('#error-modal-button').text($.i18n('close'));
		$('#error-modal').modal();
	},

	showSuccess(label, message, onHiddenCallback) {
		$('#success-modal-label').text(label);
		$('#success-modal-message').text(message);
		$('#success-modal-button').text($.i18n('close'));

		let successModal = $('#success-modal');
		successModal.unbind();
		if (onHiddenCallback) {
			successModal.on('hidden.bs.modal', onHiddenCallback);
		}

		$('#success-modal').modal();
	},

	showConfirmation(label, message, confirmationCallback) {
		$('#confirmation-modal-label').text(label);
		$('#confirmation-modal-message').text(message);
		$('#confirmation-modal-button-no').text($.i18n('No'));

		let yesButton = $('#confirmation-modal-button-yes');
		yesButton.text($.i18n('Yes'));
		yesButton.unbind();
		yesButton.on('click', confirmationCallback);

		$('#confirmation-modal').modal();
	},

	tolerantStateChangeErrorHandling(error, label) {
		if (error.type == 201) {
			// do nothing here;
			// error-code 201 means "not modifiable; device is set to off"
			//
			// this will most likely be returned when trying to change the
			// brightness or color of a device while it is turned off
		} else {
			huE_common.showError($.i18n('error-label-general'), error.message);
		}
	},

	convertHexColorToXY(hex) {
		let hexValue = hex.startsWith('#') ? hex.substring(1): hex;
		let xyPoint = huE_common.hueHackingColors.getCIEColor(hexValue);

		return [xyPoint.x, xyPoint.y];
	},

	openExternal(event, link) {
        event.preventDefault();
        require("electron").shell.openExternal(link);
        return false;
	}
};
