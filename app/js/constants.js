const APP_BRIDGEUSER_DEVICETYPE = 'huElectron';

const MAX_BRIGHTNESS_VALUE = 254;

const CONFIG_KEYS = {
	bridgeIp: 'bridgeIp',
	bridgeId: 'bridgeId',
	userName: 'userName',
	quickActions: 'quickActions'
};

const LIGHT_ALERTS = [
	'none',
	'select',
	'lselect'
];

const GROUP_TYPES = {
	lightGroup: 'LightGroup',
	luminaire: 'Luminaire',
	lightSource: 'LightSource',
	room: 'Room'
};

const PUSHLINK_MODEL_IDS_AND_IMAGES = new Map()
	.set('BSB001', {filename: 'pushlink_bridgev1.svg', width: 200, height: 194})
	.set('BSB002', {filename: 'pushlink_bridgev2.svg', width: 200, height: 191});

const PRODUCT_MODEL_IDS_AND_IMAGES = new Map()
	.set('BSB001', 'bridge_v1.svg')
	.set('BSB002', 'bridge_v2.svg')
	.set('LCT001', 'white_and_color_e27.svg')
	.set('LCT007', 'white_and_color_e27.svg')
	.set('LCT010', 'white_and_color_e27.svg')
	.set('LCT014', 'white_and_color_e27.svg')
	.set('LTW010', 'white_and_color_e27.svg')
	.set('LTW001', 'white_and_color_e27.svg')
	.set('LTW004', 'white_and_color_e27.svg')
	.set('LTW015', 'white_and_color_e27.svg')
	.set('LWB004', 'white_and_color_e27.svg')
	.set('LWB006', 'white_and_color_e27.svg')
	.set('LWB010', 'white_e27.svg')
	.set('LWB014', 'white_e27.svg')
	.set('LCT002', 'br30.svg')
	.set('LCT011', 'br30_slim.svg')
	.set('LTW011', 'br30_slim.svg')
	.set('LCT003', 'gu10.svg')
	.set('LTW013', 'gu10_perfectfit.svg')
	.set('LST001', 'lightstrip.svg')
	.set('LST002', 'lightstrip.svg')
	.set('LLC006', 'iris.svg')
	.set('LLC010', 'iris.svg')
	.set('LLC005', 'bloom.svg')
	.set('LLC011', 'bloom.svg')
	.set('LLC012', 'bloom.svg')
	.set('LLC007', 'bloom.svg')
	.set('LLC014', 'aura.svg')
	.set('LLC013', 'storylight.svg')
	.set('LLC020', 'go.svg')
	.set('HBL001', 'beyond_ceiling_pendant_table.svg')
	.set('HBL002', 'beyond_ceiling_pendant_table.svg')
	.set('HBL003', 'beyond_ceiling_pendant_table.svg')
	.set('HIL001', 'impulse.svg')
	.set('HIL002', 'impulse.svg')
	.set('HEL001', 'entity.svg')
	.set('HEL002', 'entity.svg')
	.set('HML001', 'phoenix_ceiling.svg')
	.set('HML002', 'phoenix_ceiling.svg')
	.set('HML003', 'phoenix_pendant.svg')
	.set('HML004', 'phoenix_wall.svg')
	.set('HML005', 'phoenix_table.svg')
	.set('HML006', 'phoenix_down.svg')
	.set('LTP003', 'pendant_square.svg')
	.set('LTP002', 'pendant_round.svg')
	.set('LTD003', 'pendant_round.svg')
	.set('LTP001', 'pendant_oval.svg')
	.set('LDF002', 'ceiling_square.svg')
	.set('LTF002', 'ceiling_square.svg')
	.set('LTF001', 'ceiling_square.svg')
	.set('LTC001', 'ceiling_square.svg')
	.set('LTC002', 'ceiling_square.svg')
	.set('LDF001', 'ceiling_square.svg')
	.set('LTC003', 'ceiling_round.svg')
	.set('LTD001', 'ceiling_round.svg')
	.set('LTD002', 'ceiling_round.svg')
	.set('LDD002', 'floor.svg')
	.set('LDD001', 'table.svg')
	.set('LDT001', 'recessed.svg')
	.set('MWM001', 'recessed.svg')
	.set('SWT001', 'tap.svg')
	.set('RWL021', 'hds.svg')
	.set('SML001', 'motion_sensor.svg');

const ROOM_CLASSES_AND_IMAGES = new Map()
	.set('Living room', 'living.svg')
	.set('Gym', 'gym.svg')
	.set('Kitchen', 'kitchen.svg')
	.set('Hallway', 'hallway.svg')
	.set('Dining', 'dining.svg')
	.set('Toilet', 'toilet.svg')
	.set('Bathroom', 'bathroom.svg')
	.set('Front door', 'frontdoor.svg')
	.set('Bedroom', 'bedroom.svg')
	.set('Garage', 'garage.svg')
	.set('Kids bedroom', 'kids_bedroom.svg')
	.set('Terrace', 'terrace.svg')
	.set('Nursery', 'nursery.svg')
	.set('Garden', 'garden.svg')
	.set('Recreation', 'recreation.svg')
	.set('Driveway', 'driveway.svg')
	.set('Office', 'office.svg')
	.set('Other', 'other.svg')
	.set('Carport', 'carport.svg')
	.set('House', 'house.svg');
