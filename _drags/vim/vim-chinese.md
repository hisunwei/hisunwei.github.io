vim下的中文输入法:
在vim下编辑中文是很不方便的,要在命令模式 中文insert
英文insert三个模式下频繁切换,下面是解决这个问题的方法:
```
1 使用小企鹅框架 详细安装见 http://wiki.ubuntu.org.cn/Fcitx
该框架有fcitx-sunpinyin fcitx-google* 等中文输入法可用,
安装完在系统的语言支持中设置输入法框架为fcitx,如果fcitx不能切换出中文,重启即可.

2 下载fcitx.vim 插件,安装
```

可能的问题:
```
1 fcitx 初次安装后不能调出中文,可以选择重启
2 fcitx 不会开机启动 
3 fcitx延迟较高,在vimrc中设置  "set ttimeoutlen=100"
```
