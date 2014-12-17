这篇主要是讲下如何配置以实现jconsole对server端java进程的监控，并不对jsonsole功能进行介绍和详细说明，只提供最简单可行的配置方法。

一、修改server短java配置：


```
进入目录： cd $JAVA_HOME/jre/lib/management
修改角色权限   jmxremote.access
修改角色密码： jmxremote.password (可以复制jmxremote.password.template 去除最后两行的注释即可) 
设置相关文件权限  sudo chmod 400 jmxremote.password1. 
```

二、添加server端java app 的vm执行参数 

```
-Djava.rmi.server.hostname=127.0.0.1
-Dcom.sun.management.jmxremote.port=8888
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
```

三、执行server端app, client端执行 

```
jconsole 127.0.0.1:8888
```