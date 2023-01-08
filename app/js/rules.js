let huE_rules = {

    get() {
        let rulesTabContent = $('#rules-tab-content');

        huE_common.setSpinner(rulesTabContent, $.i18n('rules-loading'));

        huE_common.huejayClient.rules.getAll()
            .then(rules => {
                huE_common.setTemplate(rulesTabContent, 'hbs/rules.hbs', {
                    rules: rules
                });
            });
    },

    save(ruleData) {
        huE_common.huejayClient.rules.getById(ruleData.id)
            .then(rule => {
                rule.name = ruleData.name;

                return huE_common.huejayClient.rules.save(rule);
            })
            .then(() => {
                let onHiddenCallback = () => { huE_rules.get() };
                huE_common.showSuccess($.i18n('success-label-general'), $.i18n('success-msg-rule-settings'), onHiddenCallback);
            })
            .catch(error => {
                huE_common.showError($.i18n('error-label-general'), error.message);
            });
    }

};
