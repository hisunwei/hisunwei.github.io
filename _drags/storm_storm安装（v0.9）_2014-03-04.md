storm是目前非常火的分布式实时计算系统，目前处于apache孵化阶段，使用storm也有一年多时间了，我会陆续整理一些storm使用方面的文档。

今天主要讲下storm的安装，使用的是最新版本的0.9，该版本在部署方面最大的特点是采用了netty
可以不使用zeroMQ了:)

第一步： 下载
```
    wget https://dl.dropboxusercontent.com/s/dj86w8ojecgsam7/storm-0.9.0.1.zip
    unzip storm-0.9.0.1.zip
```

第二步： 配置{STORM_HOME/conf/storm.yaml}如下
```
nimbus必须要配置
nimbus.host: "linux106"
storm.local.dir: "/data/smart/usr/storm"
ui.port: 18080
#
#
# ##### These may optionally be filled in:
#
## List of custom serializations
# topology.kryo.register:
#     - org.mycompany.MyType
#     - org.mycompany.MyType2: org.mycompany.MyType2Serializer
#
## List of custom kryo decorators
# topology.kryo.decorators:
#     - org.mycompany.MyDecorator
#
## Locations of the drpc servers
 drpc.servers:
     - "linux104"
     - "linux105"
     - "linux106"
## Metrics Consumers
# topology.metrics.consumer.register:
#   - class: "backtype.storm.metrics.LoggingMetricsConsumer"
#     parallelism.hint: 1
#   - class: "org.mycompany.MyMetricsConsumer"
#     parallelism.hint: 1
#     argument:
#       - endpoint: "metrics-collector.mycompany.org"
worker.childopts: "-Xmx2768m"
supervisor.childopts: "-Xmx512m"
#set the max worker of each supervisor
supervisor.slots.ports:
    - 6700
    - 6701
    - 6702
    - 6703
#netty.conf
storm.messaging.transport: "backtype.storm.messaging.netty.Context"
storm.messaging.netty.server_worker_threads: 1
storm.messaging.netty.client_worker_threads: 1
storm.messaging.netty.buffer_size: 5242880
storm.messaging.netty.max_retries: 100
storm.messaging.netty.max_wait_ms: 1000
```

第三步: 分发安装目录 并启动集群
```
  分发:
    $ scp -r {STRORM_HOME} ubuntu@linux104:{STORM_HOME} //分发到多个机器
    $ cd {STORM_HOME}/bin
  在linux106启动nimbus: 
    $ nohup ./storm nimbus&
  在linux106启动ui: 
    $ nohup ./storm ui&
  在所有机器上启动supervisor: 
    $ nohup ./storm supervisor&
  查看ui页面: http://linux106:18080
```

至此storm安装已经完成

第四步： 测试
```
  下载代码
    $ get clone https://github.com/nathanmarz/storm-starter.git
  编译生成 target/storm-starter-{version}-jar-with-dependencies.jar
    在nimbus上执行
    $ ./storm jar storm-starter-0.0.1-SNAPSHOT-jar-with-dependencies.jar storm.starter.WordCountTopology count 2 3
  查看ui页面 名为count的topology已经提交成功
```

Done!





