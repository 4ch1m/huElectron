let huE_scenes = {

	get() {
		let scenesTabContent = $('#scenes-tab-content');

		huE_common.setSpinner(scenesTabContent, $.i18n('scenes-loading'));

		// get all scenes
		huE_common.huejayClient.scenes.getAll()
			.then(scenes => {
                // then get all available lights for editing
                huE_common.huejayClient.lights.getAll()
                    .then(lights => {
                        // finally... show the scenes tab
                        huE_common.setTemplate(scenesTabContent, 'hbs/scenes.hbs', {
                            scenes: scenes,
                            availableLights: lights
                        });
                    });
			});
	},

    deleteById(id) {
        huE_common.huejayClient.scenes.delete(id)
            .then(() => {
                let onHiddenCallback = () => { huE_scenes.get() };
                huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-scene-settings'), onHiddenCallback);
            })
            .catch(error => {
                huE_common.showError($.i18n('error-label-general'), error.message);
            });
    },

    save(sceneData) {
        huE_common.huejayClient.scenes.getById(sceneData.id)
            .then(scene => {
                scene.name = sceneData.name;
                scene.lightIds = sceneData.lightIds;

                return huE_common.huejayClient.scenes.save(scene);
            })
            .then(() => {
                let onHiddenCallback = () => { huE_scenes.get() };
                huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-scene-settings'), onHiddenCallback);
            })
            .catch(error => {
                huE_common.showError($.i18n('error-label-general'), error.message);
            });
    }

};
