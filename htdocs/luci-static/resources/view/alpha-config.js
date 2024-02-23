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

		s = m.section(form.TypedSection, null , _('Navigation bar configuration'), _('You can arrange the order of applications in navigation bar according to your wishes'));
		s.anonymous = true;

		o = s.option(form.ListValue, 'nav_01', _('Navigation line 01'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'nav_02', _('Navigation line 02'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'nav_03', _('Navigation line 03'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'nav_04', _('Navigation line 04'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'nav_05', _('Navigation line 05'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'nav_06', _('Navigation line 06'));
		o.value('/cgi-bin/luci/admin/modem/main', _('Modem'));
		o.value('/cgi-bin/luci/admin/services/neko', _('Neko'));
		o.value('/cgi-bin/luci/admin/network/network', _('Network'));
		o.value('/cgi-bin/luci/admin/services/openclash', _('Open Clash'));
		o.value('/cgi-bin/luci/admin/status/overview', _('Overview'));
		o.value('/cgi-bin/luci/admin/services/ttyd', _('Terminal'));
		o.value('/cgi-bin/luci/admin/nas/tinyfm', _('Tiny File Manager'));
		o.value('none', _('None'));
		o.rmempty = false;

		return m.render();
	},
});
