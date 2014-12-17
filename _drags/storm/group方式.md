storm组件间的group方式非常重要的

Shuffle Grouping:
随机选择下游发送，确保下游的组建接收到相同的数量的tuple

Fields Grouping：
在设置group时指明fields，对于同样的fields组合发送到同一下游，注意是fields组合

All Grouping:
将消息的拷贝传送给下游的每个bolt，通常用于一些消息通知

Custom Grouping：
自定义group方式，需实现CustomStreamGrouping

Direct Grouping：
通过collector.emitDirect（compID,values) 直接指定发送的下游组建

Global Grouping:
将所有消息发送给当个目标组件，通常默认为ID最小的那个

None Grouping：
不介意grouping 目前实现为random形式

LocalOrShuffle Grouping：
优先发送给本地，采用shuffle方式传送



