---
date: 2014-03-11 21:08:22+00:00
layout: post
title: elasticsearch常见问题
categories: elasticsearch
tags: elasticsearch
---

问题：
1、elasticsearch 被分割为多个集群的问题 
因为es是采用广播相互感知，而且选举机制不像zookeeper一样采用多数人选举，所以任意数量的es主机都可能各自组成独立的集群。如果es主机配置了多个ip，那么es服务采用的ip就会不确定，造成集群间的相互隔离，所以需要在配置文件network.sticsearch.yml中显示的指定使用的ip:

```
bind_host: 1.1.1.105
network.publish_host: 1.1.1.105
network.host: 1.1.1.105
```
2、elasticsearch java 客户端版本问题
  es的java 客户端版本必须要和 server端保持一致，不然无法连接到es服务端节点  错误提示：[cluster/nodes/info] disconnected
