let huE_users = {

	get() {
		let usersTabContent = $('#users-tab-content');

		huE_common.setSpinner(usersTabContent, $.i18n('users-loading'));

		huE_common.huejayClient.users.getAll()
			.then(users => {
				huE_common.setTemplate(usersTabContent, 'hbs/users.hbs', {
					users: users
				});
			});
	}

};
