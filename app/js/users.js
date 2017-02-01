let huE_users = {

	get() {
		let usersTabContent = $('#users-tab-content');

		huE_common.setSpinner(usersTabContent, $.i18n('users-loading'));

		huE_common.huejayClient.users.getAll()
			.then(users => {
				let templateContext = { users: users,
                    					usedUser: huE_common.config.get(CONFIG_KEYS.userName) };

				huE_common.setTemplate(usersTabContent, 'hbs/users.hbs', templateContext);
			});
	},

	deleteByName(name) {
		huE_common.huejayClient.users.delete(name)
			.then(() => {
				let onHiddenCallback = function() { huE_users.get() };
				huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-user-settings'), onHiddenCallback);
			})
			.catch(error => {
				huE_common.showError($.i18n('error-label-general'), error.message);
			});
	}

};
