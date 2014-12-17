kafka是LinkedIn开源的消息队列系统，简单易用、性能强劲。

  官方文档请参考: http://kafka.apache.org/documentation.html#quickstart

   这里简单整理下安装过程:

1. 下载
```
下载程序包: 
  $ wget http://mirrors.cnnic.cn/apache/kafka/0.8.0/kafka_2.8.0-0.8.0.tar.gz 
解压: 
  $ tar -zxvf http://mirrors.cnnic.cn/apache/kafka/0.8.0/kafka_2.8.0-0.8.0.tar.gz
```

2. 配置
```
#在分别配置每台机器上的{KAFKA_HOME}config/server.properties如下:
# The id of the broker. This must be set to a unique integer for each broker.
brokerid=32
#日志数据存放目录 建议使用专用的磁盘 
log.dir=/data2/kafka/kafka-logs
#zookeeper配置
zk.connect=linux32:2181,linux33:2181,linux34:2181
```

3. 启动 
```
在每台机器上启动kafka: 
$ cd {KAFKA_HOME}/
$ nohup sh bin/kafka-server-start.sh config/server.properties &
```
4. 检查
```
进入 {ZOOKEEPER_HOME}/bin
执行 ./zkCli.sh 进入zkCli 的shell
执行 ls /brokers/ids 会显示每个正常启动的brokerid,如果都有了就OK了
```
