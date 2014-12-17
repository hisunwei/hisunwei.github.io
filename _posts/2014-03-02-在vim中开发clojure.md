---
date: 2014-03-02 23:08:31+00:00
layout: post
title: clojure_开发环境搭建(vim)
categories: clojure
tags: clojure
---
开始前先确保安装了git、leiningen、vim

第一步 配置vim的基础插件

  vim有丰富的插件可以选用，大多数插件都可以在vim.org上面查询和下载到。现在也有很多插件直接托管在github上。下面主要介绍两个插件，janus  和 vundle。

 1、 janus 源码地址 https://github.com/carlhuda/janus

   该项目作者专心维护了一组优秀常用的插件，并用janus插件专门对这组插件进行安装、更新、管理。这组插件中包括NERDTree、tagbar、buff显示、代码不全等等，基本常用的功能都有了而且在安装的同时它会自动备份已有的插件及设置。


  (如果你已经是vim的老玩家的话，完全可以使用自己习惯的插件，没有必要使用这一套插件。)


    安装方法：
      curl -Lo- https://bit.ly/janus-bootstrap | bash

    可能需要rake:
      sudo apt-get install rake

    其中NERDTree几个插件需要专门配置下:
        let g:tagbar_right = 1                                "在右侧
        let g:tagbar_width = 20                               "设置宽度
        "打开vim时自动打开tagbar
        autocmd VimEnter * nested :call tagbar#autoopen(1)
        let g:NERDTreeWinSize = 16
        "打开vim时自动打开NERDRree
        autocmd vimenter * NERDTree
        "nerdtree启动后 光标会默认停留在nerdtree区域，设置自动跳到中间区域
        au VimEnter * call feedkeys("\<C-w>l\<S-M>")
        " 设置nerdtree 在vim退出时自动退出
        autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType")&&b:NERDTreeType == "primary") | q | endif
    安装ctags
        sudo apt-get install ctags

  更详细安装和用法请参考https://github.com/carlhuda/janus/blob/master/README.md


 2、vundle 源码地址  https://github.com/gmarik/Vundle.vim.git

 vundle 是一个插件管理工具，对于clojure无关的基础插件我们直接使用janus那一套，而对于clojure有关的插件使用vundle来管理

    安装方法：
      下载源码:
         git clone https://github.com/gmarik/vundle.git  ~/.vim/bundle/vundle
    配置vim.rc：
         set nocompatible              " be iMproved, required
         filetype off                  " required
         " set the runtime path to include Vundle and initialize
         set rtp+=~/.vim/bundle/vundle/
         call vundle#rc()


------------------------------------------------------------------------


第二步 配置clojure相关的插件

   亮插 clojure 语法插件  源码地址 [git://github.com/guns/vim-clojure-static.git](git://github.com/guns/vim-clojure-static.git)

   支持 clojure repl的插件  源码地址 [git://github.com/tpope/vim-fireplace.git](git://github.com/tpope/vim-fireplace.git)

    安装方法：
      下载源码：
        git clone git://github.com/guns/vim-clojure-static.git  ~/.vim/bundle/
        git clone git://github.com/tpope/vim-fireplace.git ~/.vim/bundle/
      配置vim.rc：
        " My bundles here:
        Bundle 'vim-classpath'
        Bundle 'vim-clojure-static'
        Bundle 'vim-fireplace'
      使用Bundle 安装插件:
        打开vim  执行：BundleInstall 你会看到Bundle显示所有用Bundle安装的插件并按照顺序进行安装，有些可能需要用户输入github帐号，根据提示输入即可完成安装，如果安装失败可以按l查看log
  具体使用方法请查看 http://clojure-doc.org/articles/tutorials/vim_fireplace.html        



------------------------------------------------------------------------



第三步 简单使用

    示例:
      1、创建项目:  lein new demo
      2、cd demo
      3、lein repl
      4、vim project.clj

  显示界面结果如下: 

![Alt text](http://k007.kiwi6.com/hotlink/3jft8pzd45/-_2014_03_03_-_21_18_44_.png)


  我最终的.vimrc如下:

```
""
"" Janus setup
""

" Define paths
let g:janus_path = escape(fnamemodify(resolve(expand("<sfile>:p")), ":h"), ' ')
let g:janus_vim_path = escape(fnamemodify(resolve(expand("<sfile>:p" . "vim")), ":h"), ' ')
let g:janus_custom_path = expand("~/.janus")

" Source janus's core
exe 'source ' . g:janus_vim_path . '/core/before/plugin/janus.vim'

" You should note that groups will be processed by Pathogen in reverse
" order they were added.
call janus#add_group("tools")
call janus#add_group("langs")
call janus#add_group("colors")

""
"" Customisations
""

if filereadable(expand("~/.vimrc.before"))
  source ~/.vimrc.before
endif


" Disable plugins prior to loading pathogen
exe 'source ' . g:janus_vim_path . '/core/plugins.vim'

""
"" Pathogen setup
""

" Load all groups, custom dir, and janus core
call janus#load_pathogen()
" .vimrc.after is loaded after the plugins have loaded

"==================使用vundle 相关设置===============================
syntax on
filetype plugin indent on

set nocompatible              " be iMproved
filetype off                  " required!

set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle
Bundle 'gmarik/vundle'
" My bundles here:
Bundle 'vim-classpath'
Bundle 'vim-clojure-static'
Bundle 'vim-fireplace'

""==================tagbar NerdTree 布局和自动启动 自动退出设置=================================
"tagbar 相关设置
let g:tagbar_right = 1                                "在右侧
let g:tagbar_width = 20                               "设置宽度
"打开vim时自动打开tagbar
autocmd VimEnter * nested :call tagbar#autoopen(1)

"NERDTree相关设置
let g:NERDTreeWinSize = 16

"跟随vim自动启
autocmd vimenter * NERDTree
""nerdtree启动后 光标会停留在nerdtree区域，设置自动跳到中间区域
au VimEnter * call feedkeys("\<C-w>l\<S-M>")
" 设置nerdtree 在vim退出时跟随退出
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType")&&b:NERDTreeType == "primary") | q | endif

"==================其他设置=================================
" "开启光亮光标行
set cursorline
" " "hi CursorLine   cterm=NONE ctermbg=darkred ctermfg=white  guibg=darkred
" " guifg=white
" " "开启高亮光标列
" " "set cursorcolumn
" " "hi CursorColumn cterm=NONE ctermbg=darkred ctermfg=white guibg=darkred
" " guifg=white
```
