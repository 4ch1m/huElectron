let huE_quickActions = {

	get() {
		let quickActionsTabContent = $('#quickactions-tab-content');

		huE_common.setSpinner(quickActionsTabContent, $.i18n('quickactions-building'));

		huE_common.huejayClient.groups.getById(0)
			.then(group => {
				let templateContext = {	group: group,
										quickActions: huE_quickActions.getAll()	};

				huE_common.setTemplate(quickActionsTabContent, 'hbs/quickactions.hbs', templateContext);
			});
	},

	save(name, target, targetId, on, brightness, color) {
		let quickActions = [];

		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			quickActions = huE_common.store.get(STORE_KEYS.quickActions);
		}

		let quickAction = { id: huE_common.uuid(),
							name: name,
							target: target,
							targetId: targetId,
							on: on,
							brightness: brightness,
							color: color };

		quickActions.push(quickAction);

		huE_common.store.set(STORE_KEYS.quickActions, quickActions);
	},

	getAll() {
		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			return huE_common.store.get(STORE_KEYS.quickActions);
		} else {
			return [];
		}
	},

	deleteById(id) {
		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			let oldQuickActions = huE_common.store.get(STORE_KEYS.quickActions);
			let newQuickActions = [];

			oldQuickActions.forEach(function(quickAction) {
				if (quickAction.id != id) {
					newQuickActions.push(quickAction);
				}
			});

			if (newQuickActions.length != oldQuickActions.length) {
				huE_common.store.set(STORE_KEYS.quickActions, newQuickActions);
			}
		}
	},

	execute(target, targetId, on, brightness, color) {
		let quickAction = { id: targetId,
							on: on,
							brightness: brightness,
							color: color };

		if (target == 'light') {
			huE_lights.applyQuickAction(quickAction);
		} else {
			huE_groups.applyQuickAction(quickAction);
		}
	},

	delete() {
		huE_common.store.delete(STORE_KEYS.quickActions);
	}

};
