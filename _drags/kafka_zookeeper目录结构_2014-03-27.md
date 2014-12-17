kafka0.7 版本在zookeeper中的目录结构

###一、broker目录信息
```
/brokers
    |-topics
    |  |-topic1
    |  |   |-29 --> 5
    |  |   |-30
    |  |
    |  |-topic2
    |
    |
    |-ids
       |-29 --> mota29-1394675777000:mota29:9092
```

broker 29的值为： host-启动时间:host:port ，该节点是临时的ephemeral 会随着broker链接的断开而消失，broker id需要是唯一的，不然在注册zookeeper时会冲突导致失败
```
[zk: localhost:2181(CONNECTED) 4] get /brokers/ids/29
mota29-1394675777000:mota29:9092
cZxid = 0xd00cdc32f
ctime = Thu Mar 13 09:56:19 CST 2014
mZxid = 0xd00cdc32f
mtime = Thu Mar 13 09:56:19 CST 2014
pZxid = 0xd00cdc32f
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x1e4491700e251598
dataLength = 32
numChildren = 0
```

topic1 在broker29 中partition 5 中存储有数据:

```
[zk: localhost:2181(CONNECTED) 13] get
/brokers/topics/topic1/29
5
cZxid = 0xd00cdc551
ctime = Thu Mar 13 10:04:54 CST 2014
mZxid = 0xd00cdc551
mtime = Thu Mar 13 10:04:54 CST 2014
pZxid = 0xd00cdc551
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x1e4491700e251598
dataLength = 1
numChildren = 0
```

###二、consumer目录信息

另外consumer 也采用zookeeper来存储消费信息，来平衡消费数据和追踪每个broker中的每个partition中的消费的offset信息

注意每个partition只有一个消费者在消费它，一个group内的consumers会尽量平均的分配partition

```
/consumers
     |-group1
     |   |-ids
     |   |  |-group1_host1-ts-uid  --> { "topic1": 1 ,"topic2":2}
     |   |  |-group1_host1-ts-uid  --> { "topic2": 1}
     |   |
     |   |-offsets
     |   |  |-topic1
     |   |  |   |-{broker1-partition0}  --> offsetvalue
     |   |  |   |-{broker1-partition1}  --> offsetvalue
     |   |  |   |-{broker2-partition0}  --> offsetvalue
     |   |  |   |-{broker2-partition1}  --> offsetvalue
     |   |  |
     |   |  |-topic1
     |   |  |
     |   |  |
     |   |  |-topic1
     |   |
     |   |-owners
     |      |-topic1
     |      |   |-{broker1-partition0} --> group_host-ts-a8e438be-0
     |      |   |-{broker1-partition1} --> group_host-ts-a8e438be-0
     |      |   |-{broker2-partition0} --> group_host-ts-a8e438be-0
     |      |   |-{broker2-partition1} --> group_host-ts-a8e438be-0
     |      |
     |      |-topic1
     |      |
     |
     |
     |
     |-group2
     |
     |-group3
```

consumers/{group}/ids/{consumer} 表示每个group下的consumer实例

consumers/{group}/offsets/topic1/brokerId-partitionId  存储了topic1 在 brokerId-partitionId下 group 组消费的offset

consumers/{group}/owners/topic1/broker1-partition0 消费者获得group topic 指定的partition需要在这里先获得锁





