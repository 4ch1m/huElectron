let huE_groups = {

	get() {
		let groupsTabContent = $('#groups-tab-content');

		huE_common.setSpinner(groupsTabContent, $.i18n('groups-loading'));

		// first get all the groups
		huE_common.huejayClient.groups.getAll()
			.then(groups => {
				// then get all available lights for group creation/editing
				huE_common.huejayClient.lights.getAll()
					.then(lights => {
						// finally... show the groups tab
						huE_common.setTemplate(groupsTabContent, 'hbs/groups.hbs', {
							groups: groups,
							types: GROUP_TYPES,
							classes: Array.from(ROOM_OR_ZONE_CLASSES_AND_IMAGES.keys()),
							availableLights: lights
						});
					});
			});
	},

	changeColor(groupId, value) {
		huE_common.huejayClient.groups.getById(groupId)
			.then(group => {
				group.xy =  huE_common.convertHexColorToXY(value);

				return huE_common.huejayClient.groups.save(group);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	},

	switchOnOff(groupId, value) {
		huE_common.huejayClient.groups.getById(groupId)
			.then(group => {
				group.on = value;

				return huE_common.huejayClient.groups.save(group);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	},

	changeBrightness(groupId, value) {
		huE_common.huejayClient.groups.getById(groupId)
			.then(group => {
				group.brightness = value;

				return huE_common.huejayClient.groups.save(group);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	},

	applyQuickAction(quickAction) {
		huE_common.huejayClient.groups.getById(quickAction.targetId)
			.then(group => {
				group.on = huE_common.parseBoolean(quickAction.on);
				group.brightness = quickAction.brightness;
				group.xy =  huE_common.convertHexColorToXY(quickAction.color);

				return huE_common.huejayClient.groups.save(group);
			})
			.catch(error => {
				huE_common.tolerantStateChangeErrorHandling(error, $.i18n('error-label-general'));
			});
	},

	save(groupData) {
		if (groupData.id !== '') {
			// modify existing group
			huE_common.huejayClient.groups.getById(groupData.id)
				.then(group => {
					group.name = groupData.name;
					group.type = groupData.type;
					if (groupData.type === GROUP_TYPES.room) {
						group.class = groupData.class;
					}
					group.lightIds = groupData.lightIds;

					return huE_common.huejayClient.groups.save(group);
				})
				.then(() => {
					let onHiddenCallback = () => { huE_groups.get() };
					huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-group-settings'), onHiddenCallback);
				})
				.catch(error => {
					huE_common.showError($.i18n('error-label-general'), error.message);
				});
		} else {
			// create a new group
			let newGroup = new huE_common.huejayClient.groups.Group;
			newGroup.name = groupData.name;
			newGroup.type = groupData.type;
			if (groupData.type === GROUP_TYPES.room) {
				newGroup.class = groupData.class;
			}
			newGroup.lightIds = groupData.lightIds;

			huE_common.huejayClient.groups.create(newGroup)
				.then(() => {
					let onHiddenCallback = () => { huE_groups.get() };
					huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-group-settings'), onHiddenCallback);
				})
				.catch(error => {
					huE_common.showError($.i18n('error-label-general'), error.message);
				});
		}
	},

	deleteById(id) {
		huE_common.huejayClient.groups.delete(id)
			.then(() => {
				let onHiddenCallback = () => { huE_groups.get() };
				huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-group-settings'), onHiddenCallback);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	}

};
