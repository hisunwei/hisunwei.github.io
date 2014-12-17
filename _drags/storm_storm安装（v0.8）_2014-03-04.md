Storm安装

Storm的依赖软件比较多，需要装Python、zookeeper、zeromq以及jzmq，然后才是storm的安装。
集群安装实验，nimbus部署在sunwei32，supervisor部署了两个，分别在sunwei33 和
sunwei34

1. 安装python

  一般ubuntu默认安装

2. 安装zookeeper

  参考文档 zookeeper环境搭建

3. 安装zeromq
```vim
      下载安装包 安装依赖
      $ wget http://download.zeromq.org/zeromq-2.1.7.tar.gz
      $ sudo apt-get install libtool autoconf automake
      $ supervisordo apt-get install uuid-dev g++
      $ sudo apt-get install python-dev
      $ ./configure --prefix=/home/sunwei/opt/zeromq-2.1.7
      $ make
      $ make install
```
    
4. 安装jzmq
```vim
    获取源代码
      $ git clone https://github.com/httpsnathanmarz/jzmq.git
      $ cd jzmq
      $ ./autogen.sh

    接下来开始configure：
      $ ./configure --prefix=/home/sunwei/opt/jzmq --with-zeromq=/home/sunwei/opt/zeromq-2.1.7/
      直接make会错，则依次执行：
      $ touch src/classdist_noinst.stamp
      $ cd src/org/zeromq/
      $ javac *.java
      $ cd -
      $ make
      $ sudo make install

    运行./autogen.sh  可能报缺少：pkg-config工具
      $ wget http://pkgconfig.freedesktop.org/releases/pkg-config-0.23.tar.gz
      $ tar  zxf  pkg-config-0.23.tar.gz
      $ cd  pkg-config-0.23
      $ ./configure --prefix=/usr/local/pkg-config-0.23 --datarootdir=/usr/share
      $ make
      $ sudo make install

    安装依赖装完成后设置PATH：（后面要用到pkg-config）
      $ export  PATH=.:/usr/local/pkg-config-0.23/bin:$PATH
```
>      （注意：请选择pkg-configfig-0.23.tar.gz或之前版本安装，我选择了0.25或0.26最新版本make是折腾了很久通不过，请不要再重复掉到这个坑里，pkg-config-0.23之前版本的安装也是有些小陷阱的，请参阅下面）
>      小陷阱——安装 pkg-config<=0.23需要注意的地方：
>      $ ./configure  --prefix=/usr/local/pkg-config-0.23 --datarootdir=/usr/share --prefix=/usr/local/pkg-config-0.23
>      指定pkg-config径，这不是重点；重点是--datarootdir=/usr/share它直接关系到你后面能否成功编译jzmq.它指明了pkg.m4将要存放的位置，jzmq在编译的过程中需要调用PKG_CHECK_MODULES()宏（Macro），这个Macro是pkg-config和Autoconf/Automake/aclocal交互的主要接口

5. 安装storm

```sh
    获取安装包
      $ wget https://github.com/downloadads/nathanmarz/storm/storm-0.8.3.zip
      $ unzip storm-0.8.3.zip
      $ cp -r storm-0.8.3 /home/sunwei/opt/

    设置storm环境/etc/profile
      export STORM_HOME="/home/sunwei/opt/storm-0.8.3"
      export PATH=$PATH:$STORM_HOME/bin
```
6. 集群安装
storm集群的安装和单机版一样，但比较纠结的是storm的配置文件storm.yaml。当然，这也是每台机器都要配的。
```yaml
    storm.zookeeper.servers:
     - "192.168.38.142"
     - "192.168.38.146"
     - "192.168.38.145"
    storm.zookeeper.port: 2181
    storm.cluster.mode: "distributed" # can be distributed or local
    nimbus.host: "192.168.38.142"
    storm.local.dir: "/home/sunwei/opt/storm-0.8.1/data"
    ui.port: 18080
```
  说明一下：storm.local.dir表示storm需要用到的本地目录。
  当然你也可以配superevisor.slot.port，supervisor.slots.ports表示supervisor节点的槽数，就是最多能跑几个worker进程
（每个spout或bolt默认只启动一个worker，但是可以通过conf修改成多个）。

7. 启动
```
  在master机器执行
    $ nohup bin/STORM_HOMEorm nimbus &
    $ nohup bin/storm ui &
  在所有supervisor机器执行
    $ nohup bin/storm supervisor &
```
8. 查看完成

  打开：http://sunwei:18080/ 查看storm执行状态  在集群上跑Wordcount测试例子
```
  $ storm jar ~/jars/WordCountTopology.jar storm.starter.WordCountTopology WordCount
```

9. 补充

  修改配置：
  在storm.yaml中添加行
```
java.library.path: ”/usr/local/lib:/opt/local/lib:/usr/lib:/home/sunwei/opt/jzmq/lib:/home/sunwei/opt/zeromq-2.1.7/lib”
```



