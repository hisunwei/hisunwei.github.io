zookeeper安装：
1、下载 zookeeper 资源  
wget
http://mirrors.hust.edu.cn/cnapache/zookeeper/zookeeper-3.4.5/zookeeper-3.4.5.tar.gz
2、解压zookeeper-3.4.5.tar.gz 到 ~/opt/ 下 
tar -xzvf zookeeper-3.4.5.tar.gz 
3、设置配置
   cd ~/opt/zookeeper-3.4.5/conf
   cp zoo_sample.cfg zoo.cfg
zoo.cfg配置信息：
# The number of milliseconds of each tick
tickTime=2000
# The number of ticks that the initial 
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between 
    # sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
dataDir=/data/zookeeper
# thate port at which the clients will connect
clientPort=2181

server.1=mota32:2888:3888
server.2=mota33:2888:3888
server.3=mota34:2888:3888

      mkdir /data/zookeeper
   vim /data/zookeeper/myid
写入对应的编号  mota32上写入1,mota33写入2,mota34写入3即可
4、启动所有机器上zookeeper服务
   ～/opt/zookeeper-3.4.5/bin/zkServer.sh start
   检查zookeeper集群状态 
   ～/opt/zookeeper-3.4.5/bin/zkServer.sh status   正常情况应为1个leader
其他均为follower

完毕
   




