---
date: 2015-02-08 02:44:00+00:00
layout: post
title: run spark on yarn
categories: big data
tags: spark yarn
---

#run spark on yarn

##Step 1: install dfs and yarn 


### host list  
```
192.168.1.100  Namenode SecondaryNameNode ResourceManager  DataNode
192.168.1.101  DataNode NodeManager
```

### web ui
```
192.168.1.100:50070  hdfs
192.168.1.100:19888  JobHistory
192.168.1.100:8088
```

### hadoop version  
2.4.1

### download 
```
cd ~/apps/hadoop
wget  http://mirror.bit.edu.cn/apache/hadoop/common/hadoop-2.4.1/hadoop-2.4.1.tar.gz
tar -xzvf hadoop-2.*
```

### config
etc/hadoop/hdfs-site.xml 

```
<property>
 <name>dfs.replication</name>
 <value>1</value>
</property>
```

/etc/hadoop/core-site.xml 

```
<property>
  <name>fs.defaultFS</name>
  <value>hdfs://192.168.1.100:9000</value>
</property>
```

hadoop-env.sh  

```
export JAVA_HOME=/usr
export HADOOP_PREFIX=/home/sunwei/apps/hadoop/hadoop-2.4.1
```

slaves

```
  192.168.1.37
  192.168.1.36
```

yarn-site.xml

```
<property>
         <name>yarn.nodemanager.aux-services</name>
         <value>mapreduce_shuffle</value>
</property>
<property>
<name>yarn.resourcemanager.address</name>
     <value>192.168.1.100:8032</value>
</property>
<property>
     <name>yarn.resourcemanager.scheduler.address</name>
     <value>192.168.1.100:8030</value>
</property>
<property>
     <name>yarn.resourcemanager.resource-tracker.address</name>
     <value>192.168.1.100:8031</value>
</property>
<property>
     <name>yarn.resourcemanager.admin.address</name>
     <value>192.168.1.100:8033</value>
</property>
<property>
     <name>yarn.resourcemanager.webapp.address</name>
     <value>192.168.1.100:8088</value>
</property>
<property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
</property>
<property>
    <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
</property>
```

### start hdfs an yarn 

```
#format datanane
bin/hdfs namenode -format
#start hdfs, 
sbin/start-dfs.sh
#start yarn
sbin/start-yarn.sh
```


### check
- check the process running in the config list
- open http://192.168.1.100:8088/cluster/nodes, there should have 2 nodes be list with **RUNNING** status



##Step 2: install Spark


Actually, it's not **real install** spark, only need prepare enviroment  on ONE mechine for  for submmiting spark job.

You just need make sure your spark application summit to yarn-resourceManager correctly, the yarn platform upload everything to hdfs and setup spark process in the cluster automatically. Yarn is such a fascinating tool. So, what we need do is very easy:

### download spark compiled with hadoop

```
cd ~/apps/
wget http://www.apache.org/dyn/closer.cgi/spark/spark-1.2.0/spark-1.2.0-bin-hadoop2.3.tgz
tar -xzvf spark-1.2.0-bin-hadoop2.3
ln -s spark-1.2.0-bin-hadoop2.3 spark
cat "YARN_CONF_DIR=~/apps/hadoop/etc/hadoop" >> spark/conf/spark-env.sh
```

### submit the following example, and check in yarn UI

```
./bin/spark-submit --class org.apache.spark.examples.SparkPi \
    --master yarn-cluster \
    --num-executors 1 \
    --driver-memory 512m \
    --executor-memory 1g \
    --executor-cores 1 \
    lib/spark-examples*.jar \
    10
```

Yarn application UI: http://192.168.1.100:8088/cluster/apps
