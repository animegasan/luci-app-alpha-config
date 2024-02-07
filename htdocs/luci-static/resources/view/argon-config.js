/* This is free software, licensed under the Apache License, Version 2.0
 *
 * Copyright (C) 2024 Hilman Maulana <hilman0.0maulana@gmail.com>
 */

'use strict';
'require view';
'require form';
'require fs';

return view.extend({
    handleSaveApply: null,
    handleSave: null,
    handleReset: null,
    render: function () {
        var m, s, o;
        m = new form.Map('argon-config', _('Alpha theme configuration'), _('Here you can set the blur and transparency of the login page of alpha theme, and manage the background pictures and videos. Chrome is recommended.'));

        s = m.section(form.TypedSection, 'argon-config');
        s.anonymous = true;

        o = s.option(form.FileUpload, 'dashboard', _('Dashboard Background'));
        o.default = '/www/luci-static/alpha/gaya/dashboard.png';
        o.root_directory = '/www/luci-static/alpha/gaya/';
        o.optional = true;

        o = s.option(form.FileUpload, 'login', _('Login Background'));
        o.default = '/www/luci-static/alpha/style/login.png';
        o.root_directory = '/www/luci-static/alpha/style/';
        o.optional = true;

        o = s.option(form.Button, '_save', _('Save settings'));
        o.inputstyle = 'apply';
        o.inputtitle = _('Save settings');
        o.onclick = function() {
            var gaya = '/www/luci-static/alpha/gaya/dashboard.png';
            var style = '/www/luci-static/alpha/style/login.png';
            if (gaya && style) {
                fs.exec('/bin/chmod', ['644', gaya, style]);
            }
            return this.map.save(null, true);
        }

        return m.render();
    },
});
