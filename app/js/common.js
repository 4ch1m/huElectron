let huE_common = {

	shell: require('electron').shell,
	store: new (require('electron-store'))(),
	huejay: require('huejay'),
	huejayClient: null,
	hueHackingInterfaces: require('hue-hacking-node/dist/hue-interfaces'),
    hueHackingColors: require('hue-hacking-node/dist/hue-colors'),
	uuid: require('uuid').v4,
	os: require('os'),
	htmlDecode: value => { return $('<textarea/>').html(value).text(); },

	switchToMainContentElement(elementSuffix) {
		$('div[id^="main-content-"]').each((index, element) => {
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
		$.get(template, data => {
			let compiledTemplate = Handlebars.compile(data);
			element.empty();
			element.html(compiledTemplate(context, {
				allowProtoPropertiesByDefault: true,
				allowProtoMethodsByDefault: true
			}));
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

		successModal.modal();
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
		if (error.type === 201) {
			// do nothing here;
			// error-code 201 means "not modifiable; device is set to off"
			//
			// this will most likely be returned when trying to change the
			// brightness or color of a device while it is turned off
		} else {
			this.showError(label, error.message);
		}
	},

	convertHexColorToXY(hex) {
		let hexValue = hex.startsWith('#') ? hex.substring(1): hex;
		let xyPoint = (new this.hueHackingColors.HueColors()).getCIEColor(hexValue);

		return [xyPoint.x, xyPoint.y];
	},

	parseBoolean(boolean) {
		return (typeof boolean === 'string' || boolean instanceof String) ? boolean.toLowerCase() === 'true' : boolean;
	},

	openExternal(event, link) {
        event.preventDefault();
		this.shell.openExternal(link);
        return false;
	},

	getAppVersion() {
		return this.store.get('appVersion');
	},

	getAppSystemLocale() {
		return this.store.get('appSystemLocale')
	}
};
