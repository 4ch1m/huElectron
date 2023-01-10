let huE_schedules = {

    get() {
        let schedulesTabContent = $('#schedules-tab-content');

        huE_common.setSpinner(schedulesTabContent, $.i18n('schedules-loading'));

        huE_common.huejayClient.schedules.getAll()
            .then(schedules => {
                huE_common.setTemplate(schedulesTabContent, 'hbs/schedules.hbs', {
                    schedules: schedules
                });
            });
    },

    save(scheduleData) {
        huE_common.huejayClient.schedules.getById(scheduleData.id)
            .then(schedule => {
                schedule.name = scheduleData.name;

                return huE_common.huejayClient.schedules.save(schedule);
            })
            .then(() => {
                let onHiddenCallback = () => { huE_schedules.get() };
                huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-schedule-settings'), onHiddenCallback);
            })
            .catch(error => {
                huE_common.showError($.i18n('error-label-general'), error.message);
            });
    }

};
