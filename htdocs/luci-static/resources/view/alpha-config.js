/* This is free software, licensed under the Apache License, Version 2.0
 *
 * Copyright (C) 2024 Hilman Maulana <hilman0.0maulana@gmail.com>
 */

'use strict';
'require view';
'require form';
'require fs';
'require ui';

return view.extend({
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
	render: function () {
		var m, s, o;
		var bg_path = '/www/luci-static/alpha/background/';
		m = new form.Map('alpha' , _('Alpha theme configuration'), _('Here you can set background login and dashboard themes. Chrome is recommended.'));
		s = m.section(form.TypedSection, null , _('Background configuration'), _('You can upload files such as jpg or png files, and files will be uploaded to <code>%s</code>.').format(bg_path));
		s.anonymous = true;

		o = s.option(form.Button, 'login', _('Login'), _('Upload file for login background'));
		o.inputstyle = 'action';
		o.inputtitle = _('Upload');
		o.onclick = function(ev, section_id) {
			var file = bg_path + 'login.png';
			return ui.uploadFile(file, ev.target).then(function(res) {
				return fs.exec('/bin/chmod', ['0644', file]).then(function() {
					ui.addNotification(null, E('p', _('Login picture successfully uploaded.')));
				});
			})
			.catch(function(e) { ui.addNotification(null, E('p', e.message)); });
		};
		o.modalonly = true;

		o = s.option(form.Button, 'dashboard', _('Dashboard'), _('Upload file for dashboard background'));
		o.inputstyle = 'action';
		o.inputtitle = _('Upload');
		o.onclick = function(ev, section_id) {
			var file = bg_path + 'dashboard.png';
			return ui.uploadFile(file, ev.target).then(function(res) {
				return fs.exec('/bin/chmod', ['0644', file]).then(function() {
					ui.addNotification(null, E('p', _('Dashboard picture successfully uploaded.')));
				});
			})
			.catch(function(e) { ui.addNotification(null, E('p', e.message)); });
		};
		o.modalonly = true;

		return m.render();
	},
});
