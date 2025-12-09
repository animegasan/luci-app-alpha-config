'use strict';
'require view';
'require form';
'require fs';
'require ui';

return view.extend({
    render: function () {
        var m, s, o;
        m = new form.Map('alpha', 'Alpha 主题配置', '你可以在此设置登录页和仪表盘背景主题。推荐使用 Chrome 浏览器。');

        s = m.section(form.TypedSection, 'theme', '主题配置');
        s.anonymous = true;
        o = s.option(form.Value, 'color', '主颜色', 'HEX 颜色值（默认：#2222359a）。');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            if (section_id)
                return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8}|[0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/i.test(value) || '错误：请输入有效的 HEX 颜色值';
            return true;
        };
        o = s.option(form.ListValue, 'blur', '透明度级别', '菜单透明度设置。');
        o.value('00', '0');
        o.value('10', '1');
        o.value('20', '2');
        o.value('30', '3');
        o.value('40', '4');
        o.value('50', '5');
        o.rmempty = false;
        o = s.option(form.Flag, 'navbar', '导航栏', '启用导航栏菜单。');
        o.rmempty = false;

        var bg_path = '/www/luci-static/alpha/background/';
        s = m.section(form.TypedSection, 'theme' , '背景配置', '你可以上传 JPG 或 PNG 文件，文件将上传到 <code>%s</code>。'.format(bg_path));
        s.anonymous = true;
        o = s.option(form.Button, 'login', '登录页', '上传登录页背景图片。');
        o.inputstyle = 'action';
        o.inputtitle = '上传';
        o.onclick = function(ev) {
            var file = bg_path + 'login.png';
            return ui.uploadFile(file, ev.target).then(function() {
                return fs.exec('chmod', ['777', file]).then(function() {
                    ui.addNotification(null, E('p', '登录背景图片上传成功。'));
                });
            }).catch(function(e) { ui.addNotification(null, E('p', e.message)); });
        };
        o.modalonly = true;

        o = s.option(form.Button, 'dashboard', '仪表盘', '上传仪表盘背景图片。');
        o.inputstyle = 'action';
        o.inputtitle = '上传';
        o.onclick = function(ev) {
            var file = bg_path + 'dashboard.png';
            return ui.uploadFile(file, ev.target).then(function() {
                return fs.exec('chmod', ['777', file]).then(function() {
                    ui.addNotification(null, E('p', '仪表盘背景图片上传成功。'));
                });
            }).catch(function(e) { ui.addNotification(null, E('p', e.message)); });
        };
        o.modalonly = true;

        s = m.section(form.GridSection, 'navbar', '导航栏配置');
        s.anonymous = true;
        s.addremove = true;
        s.rowcolors = true;
        s.modaltitle = '添加新导航项';
        s.addbtntitle = '添加新导航项...';
        o = s.option(form.DummyValue, 'name', '名称');
        o.modalonly = false;
        o = s.option(form.DummyValue, 'enable', '状态');
        o.modalonly = false;
        o = s.option(form.DummyValue, 'line', '行');
        o.modalonly = false;
        o = s.option(form.DummyValue, 'newtab', '新标签页');
        o.modalonly = false;
        o = s.option(form.DummyValue, 'icon', '图标');
        o.modalonly = false;
        o = s.option(form.DummyValue, 'address', '地址');
        o.modalonly = false;

        o = s.option(form.Value, 'name', '导航项名称');
        o.rmempty = false;
        o.modalonly = true;
        o = s.option(form.Flag, 'enable', '导航栏', '启用导航栏。');
        o.rmempty = false;
        o.modalonly = true;
        o.enabled = '启用';
        o.disabled = '禁用';
        o.default = o.enabled;
        o = s.option(form.Value, 'line', '行号', '输入 1 到 10 的行号。');
        o.rmempty = false;
        o.modalonly = true;
        o.datatype = 'range(1,10)';
        o.placeholder = '1-10';
        o = s.option(form.Flag, 'newtab', '在新标签中打开', '启用在新标签页打开链接。');
        o.rmempty = false;
        o.modalonly = true;
        o.enabled = '是';
        o.disabled = '否';
        o = s.option(form.FileUpload, 'icon', '图标', '上传 PNG 文件，大小 256x256。');
        o.rmempty = false;
        o.modalonly = true;
        o.datatype = 'png';
        o.root_directory = '/www/luci-static/alpha/gaya/icon/navbar';
        o.onchange = function(ev, section_id, value) {
            fs.exec('chmod', ['777', value]);
            return true;
        };
        o = s.option(form.Value, 'address', '地址');
        o.value('/cgi-bin/luci/admin/modem/main', 'Modem 设置');
        o.value('/cgi-bin/luci/admin/services/neko', 'Neko 服务');
        o.value('/cgi-bin/luci/admin/network/network', '网络设置');
        o.value('/cgi-bin/luci/admin/services/openclash', 'OpenClash');
        o.value('/cgi-bin/luci/admin/status/overview', '总览');
        o.value('/cgi-bin/luci/admin/services/ttyd', '终端');
        o.rmempty = false;
        o.modalonly = true;

        return m.render();
    },
});
