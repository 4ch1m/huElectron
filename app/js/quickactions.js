let huE_quickActions = {

	get() {
		let quickActionsTabContent = $('#quickactions-tab-content');

		huE_common.setSpinner(quickActionsTabContent, $.i18n('quickactions-building'));

		huE_common.huejayClient.groups.getById(0)
			.then(group => {
				huE_common.setTemplate(quickActionsTabContent, 'hbs/quickactions.hbs', {
					group: group,
					quickActions: huE_quickActions.getAll()
				});
			});
	},

	getAll() {
		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			return huE_common.store.get(STORE_KEYS.quickActions);
		} else {
			return [];
		}
	},

	getById(id) {
		for (let quickAction of this.getAll()) {
			if (quickAction.id === id) {
				return quickAction;
			}
		}
	},

	deleteAll() {
		huE_common.store.delete(STORE_KEYS.quickActions);
	},

	deleteById(id) {
		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			let oldQuickActions = huE_common.store.get(STORE_KEYS.quickActions);
			let newQuickActions = [];

			oldQuickActions.forEach(quickAction => {
				if (quickAction.id !== id) {
					newQuickActions.push(quickAction);
				}
			});

			if (newQuickActions.length !== oldQuickActions.length) {
				huE_common.store.set(STORE_KEYS.quickActions, newQuickActions);
			}
		}
	},

	save(quickAction) {
		let quickActions = [];

		if (huE_common.store.has(STORE_KEYS.quickActions)) {
			quickActions = huE_common.store.get(STORE_KEYS.quickActions);
		}

		if (!quickAction.hasOwnProperty('id') || typeof quickAction.id === undefined) {
			quickAction.id = huE_common.uuid();
			quickActions.push(quickAction);
		} else {
			for (let i = 0; i < quickActions.length; i++) {
				if (quickActions[i].id === quickAction.id) {
					quickActions[i] = quickAction;
					break;
				}
			}
		}

		huE_common.store.set(STORE_KEYS.quickActions, quickActions);
	},

	updateName(id, name) {
		let quickAction = this.getById(id);

		if (quickAction !== undefined) {
			quickAction.name = name;
			this.save(quickAction);
		}
	},

	executeById(id) {
		let quickAction = this.getById(id);

		if (quickAction !== undefined) {
			if (quickAction.target === 'light') {
				huE_lights.applyQuickAction(quickAction);
			} else {
				huE_groups.applyQuickAction(quickAction);
			}
		}
	}

};
