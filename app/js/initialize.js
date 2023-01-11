(function initHandlebars() {
    // ----------
    // HB-helpers
    // ----------

	Handlebars.registerHelper('ifCond', (v1, v2, options) => {
		if (v1 === v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('getPushlinkIcon', modelId => {
		let pushlinkImage = PUSHLINK_MODEL_IDS_AND_IMAGES.get(modelId);

		if (pushlinkImage === undefined) {
			// get the last entry
			PUSHLINK_MODEL_IDS_AND_IMAGES.forEach((image, id) => {
				pushlinkImage = image;
			});
		}

        return Handlebars.compile(Handlebars.partials.icon_pushlink)({
			filename: pushlinkImage.filename,
			width: pushlinkImage.width,
			height: pushlinkImage.height
		});
	});

    Handlebars.registerHelper('getProductIcon', modelId => {
        let filename = PRODUCT_MODEL_IDS_AND_IMAGES.get(modelId);
        if (filename !== undefined) {
            return Handlebars.compile(Handlebars.partials.icon_product)({filename: filename});
        } else {
            return Handlebars.compile(Handlebars.partials.icon_question)();
        }
    });

	Handlebars.registerHelper('getGroupIcon', (type, clazz) => {
		if (type === GROUP_TYPES.room || type === GROUP_TYPES.zone) {
			let filename = ROOM_OR_ZONE_CLASSES_AND_IMAGES.get(clazz);
			if (filename !== undefined) {
				return Handlebars.compile(Handlebars.partials.icon_room_or_zone)({filename: filename});
			}
		}

		return Handlebars.compile(Handlebars.partials.icon_question)();
	});

	Handlebars.registerHelper('I18n', (key, ...params) => {
		return $.i18n(key, params.filter(param => {
			return typeof param === 'string';
		}));
	});

	Handlebars.registerHelper('getBrightnessInPercent', brightnessValue => {
		return Math.round(brightnessValue / (MAX_BRIGHTNESS_VALUE / 100));
	});

    // -----------
    // HB-partials
    // -----------

    $.get('hbs/partials/basic-actions.hbs', data => {
        Handlebars.registerPartial('basic_actions', data);
    }, 'html');

    $.get('hbs/partials/icon-product.hbs', data => {
        Handlebars.registerPartial('icon_product', data);
    }, 'html');

    $.get('hbs/partials/icon-pushlink.hbs', data => {
        Handlebars.registerPartial('icon_pushlink', data);
    }, 'html');

    $.get('hbs/partials/icon-question.hbs', data => {
        Handlebars.registerPartial('icon_question', data);
    }, 'html');

    $.get('hbs/partials/icon-room-or-zone.hbs', data => {
        Handlebars.registerPartial('icon_room_or_zone', data);
    }, 'html');

    $.get('hbs/partials/navigation-tabs.hbs', data => {
        Handlebars.registerPartial('navigation_tabs', data);
    }, 'html');

	$.get('hbs/partials/spinner.hbs', data => {
		Handlebars.registerPartial('spinner', data);
	}, 'html');
})();

(function initMinicolors() {
	$.minicolors.defaults.changeDelay = 500;
	$.minicolors.defaults.control = 'wheel';
})();

(function initHuejayClientAndMainContent() {
	$(document).ready(() => {
		// check if a complete persisted config exists
		if (huE_common.store.has(STORE_KEYS.bridgeIp) &&
			huE_common.store.has(STORE_KEYS.bridgeId) &&
			huE_common.store.has(STORE_KEYS.userName)) {

			// create client from stored config-values
			huE_common.huejayClient = new huE_common.huejay.Client({
				host: huE_common.store.get(STORE_KEYS.bridgeIp),
				username: huE_common.store.get(STORE_KEYS.userName)
			});

			// ping bridge
			huE_common.huejayClient.bridge.ping()
				.then(() => {
					// get bridge infos
					huE_common.huejayClient.bridge.get()
						.then(bridge => {
							// check if stored bridge-id matches the connected bridge-id
							if (bridge.id === huE_common.store.get(STORE_KEYS.bridgeId)) {
								// check if we're authenticated
								huE_common.huejayClient.bridge.isAuthenticated()
									.then(() => {
										// we're all set; show the tabs
										huE_common.switchToMainContentElement('tabs');
										$('.nav-tabs a:first').tab('show');
									})
									.catch(() => {
									huE_common.showError($.i18n('error-label-general'), $.i18n('error-msg-authentication-failed'));
									huE_bridges.showBridgeDiscovery();
								});
							} else {
								huE_common.showError($.i18n('error-label-general'), $.i18n('error-msg-credentials-dont-match'));
								huE_bridges.showBridgeDiscovery();
							}
						});
				})
				.catch(() => {
						huE_common.showError($.i18n('error-label-general'), $.i18n('error-msg-ping-failed'));
						huE_bridges.showBridgeDiscovery()
					});
		} else {
			// no config-values available ... show bridge-discovery
			huE_bridges.showBridgeDiscovery();
		}
	});
})();
