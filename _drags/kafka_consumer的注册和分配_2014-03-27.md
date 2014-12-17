在指定group下，其所有consumer平摊topic下的所有patition，每个partition只会有一个consumer在消费

consumer注册过程：

1、在 consumers/{group}/ids/{consumer}中注册自己 
2、在同一个目录中注册watch，如果有新的consumer注册或者老的consumer离开，都会处罚之，随即开始rebalance过程
3、注册/brokers/ids目录watch，如果有broker变动，同样需要rebalance
4、如果consumer采用的topic filter的形式，那么/brokers/topics 下的监听，以便知道新的topic
5、rebalance


consumer rebalance过程：（consumer变动，broker变动，topic变动都会触发consumer的再平衡）


```
   1.   For each topic T that Ci subscribes to 
   2.     let PT be all partitions producing topic T
   3.     let CG be all consumers in the same group as Ci that consume topic T
   4.     sort PT (so partitions on the same broker are clustered together)
   5.     sort CG
   6.     let i be the index position of Ci in CG and let N = size(PT)/size(CG)
   7.     assign partitions from i*N to (i+1)*N - 1 to consumer Ci
   8.     remove current entries owned by Ci from the partition owner registry
   9.     add newly assigned partitions to the partition owner registry
          (we may need to re-try this until the original partition owner releases its ownership)
```
P= {p1 p2 p3}  排序
C= {c1 c2 c3}  排序

i = range(0,c.size)
N = P.size/c.size   这里N=1

ci = P.range(i*N,(i+1)*N) 

根据partition分配结果，根据分配结果删除老的owner，注册新的owner

