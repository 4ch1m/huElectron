let huE_lights = {

	get() {
		let lightsTabContent = $('#lights-tab-content');

		huE_common.setSpinner(lightsTabContent, $.i18n('lights-loading'));

		huE_common.huejayClient.lights.getAll()
			.then(lights => {
				let templateContext = {	lights: lights,
										lightAlerts: LIGHT_ALERTS };

				huE_common.setTemplate(lightsTabContent, 'hbs/lights.hbs', templateContext);
			});
	},

	changeColor(lightId, value) {
		huE_common.huejayClient.lights.getById(lightId)
			.then(light => {
				light.xy = huE_common.convertHexColorToXY(value);

				return huE_common.huejayClient.lights.save(light);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	},

	switchOnOff(lightId, value) {
		huE_common.huejayClient.lights.getById(lightId)
			.then(light => {
				light.on = value;

				return huE_common.huejayClient.lights.save(light);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	},

	changeBrightness(lightId, value) {
		huE_common.huejayClient.lights.getById(lightId)
			.then(light => {
				light.brightness = value;

				return huE_common.huejayClient.lights.save(light);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	},

	save(lightData) {
		huE_common.huejayClient.lights.getById(lightData.id)
			.then(light => {
				light.name = lightData.name;
				light.alert = lightData.alert;

				return huE_common.huejayClient.lights.save(light);
			})
			.then(light => {
				let onHiddenCallback = function() { huE_lights.get() };
				huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-light-settings'), onHiddenCallback);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	},

	deleteById(id) {
		huE_common.huejayClient.lights.delete(id)
			.then(() => {
				let onHiddenCallback = function() { huE_lights.get() };
				huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-light-settings'), onHiddenCallback);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	},

	applyQuickAction(quickAction) {
		huE_common.huejayClient.lights.getById(quickAction.id)
			.then(light => {
				light.on = JSON.parse(quickAction.on.toLowerCase());
				light.brightness = quickAction.brightness;
				light.xy = huE_common.convertHexColorToXY(quickAction.color);

				return huE_common.huejayClient.lights.save(light);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	}

};

