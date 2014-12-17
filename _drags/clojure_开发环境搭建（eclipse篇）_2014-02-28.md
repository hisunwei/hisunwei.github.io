###第一步： 安装leiningen

leiningen是类似maven ivy+ant 的一个项目工具，因为为clojure定制的直接重用了maven，个人感觉这里有重复造轮子的嫌疑.

    使用leiningen的理由有：
	   1、maven的pom.xml采用xml太麻烦
	   2、clojure模糊数据和代码的区别，那么配置文件就更不用说了，也采用clj文件
	   3、另外lein 还提供了repl等工具

lein的项目地址： https://github.com/technomancy/leiningen

    安装方法：
     	1、下载文件  https://raw.github.com/technomancy/leiningen/stable/bin/lein 到  ~/bin 目录下，其他目录也可以，不过需要在你的$PATH中
     	2、修改脚本权限 chmod 755 ~/bin/lein
     	3、执行lein 即可完成安装


###第二步： 安装eclipse插件 Counterclockwise

更多的程序员会使用vim或者emacs来进行clojure开发，但是clojure开发往往会有大量的java代码，面对这种情况eclipse也是不错的选择，其中[Counterclockwise](http://ccw.cgrand.net/updatesite/)是功能较全面的一个eclipse插件。

    安装方法和其他eclipse插件一样：
    	1、Eclipse菜单Help->Install New Software
    	2、add site ： http://ccw.cgrand.net/updatesite/
    	3、点击安装即可

至此基本的环境都已经安装完毕，新的版本Counterclockwise是自带lein的，lein是自带clojure的，所以只安装ccw也可以，不过我个人更喜欢命令行点。

###最后：创建一个工程

    步骤如下:
    	1、使用lein 创建空的项目：  lein new project1
    	2、在project1 的 project.clj 中添加
    		:plugins [[lein2-eclipse "2.0.0"]]
    	3、执行lein eclipse 即可生成eclipse 工程文件 .project .classpath 等
    	3、使用eclipse导入现有工程即可

另外，你也可以使用eclipse生成maven工程，然后右击项目->configure->转换成lein项目 ，上面的方法适合已有工程导入eclipse

