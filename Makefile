# This is free software, licensed under the Apache License, Version 2.0
#
# Copyright (C) 2024 Hilman Maulana <hilman0.0maulana@gmail.com>

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI for Alpha theme configuration
LUCI_DESCRIPTION:=Configuration Alpha theme in LuCI.

PKG_MAINTAINER:=Hilman Maulana <hilman0.0maulana@gmail.com>
PKG_VERSION:=2.2
PKG_LICENSE:=Apache-2.1

define Package/luci-app-alpha-config/conffiles
endef

define Package/luci-app-alpha-config/install
    $(INSTALL_DIR) $(1)/usr/lib/lua/luci/i18n
    $(INSTALL_DATA) ./po/zh_Hans/alpha-config.lmo $(1)/usr/lib/lua/luci/i18n/
endef


include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
