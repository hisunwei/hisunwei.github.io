reliability
每个msg都需要经过ack或者fail
设置timeout 超时spout会重发

取消reliability
Config.TOPOLOGY_ACKERS 设置为0
emit的时候忽略msg id

失败的恢复机制：

A tuple isn't acked because the task died: In this case the spout tuple
ids at the root of the trees for the failed tuple will time out and be
replayed.
task 挂掉：spout检查超时，自动重发（ack或者timeout前msg都会暂存在spout中）

Acker task dies: In this case all the spout tuples the acker was
tracking will time out and be replayed.
acker 挂掉：等待timeout后重发

Spout task dies: In this case the source that the spout talks to is
responsible for replaying the messages. For example, queues like Kestrel
and RabbitMQ will place all pending messages back on the queue when a
client disconnects.
spout 挂掉： 消息队列会在client失去连接后恢复没有确认的数据，这个需要数据源的支持了
