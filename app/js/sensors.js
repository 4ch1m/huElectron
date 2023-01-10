let huE_sensors = {

	get() {
		let sensorsTabContent = $('#sensors-tab-content');

		huE_common.setSpinner(sensorsTabContent, $.i18n('sensors-loading'));

		huE_common.huejayClient.sensors.getAll()
			.then(sensors => {
				huE_common.setTemplate(sensorsTabContent, 'hbs/sensors.hbs', {
					sensors: sensors
				});
			});
	},

	save(sensorData) {
		huE_common.huejayClient.sensors.getById(sensorData.id)
			.then(sensor => {
				sensor.name = sensorData.name;

				return huE_common.huejayClient.sensors.save(sensor);
			})
			.then(() => {
				let onHiddenCallback = () => { huE_sensors.get() };
				huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-sensor-settings'), onHiddenCallback);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	}

};
