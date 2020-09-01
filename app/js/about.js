let huE_about = {

	get() {
		huE_common.setTemplate($('#about-tab-content'), 'hbs/about.hbs', {appVersion: (require('electron')).remote.app.getVersion()});
	}

};
