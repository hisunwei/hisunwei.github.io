clear()
遍历segments，重置每个segments中的table中的每个元素，在遍历单个segment中的元素时加锁整个segment，
Segment<K,V> extends ReentrantLock


containsValue(Object value)
contains(Object value)
查询的参数非null，
对每个segment加锁（加锁前确保每个索引位置segment的实例已经初始化
查询每个segment中的table内每个元素
对每个segment解锁

containsKey(Object key)
根据key的hash值，计算出segment在unsafe中的位置，获取该对象
获取segment.table，是一个HashEntry数组，在通过hash值在table中遍历所有HashEntry实例，进行比较

put(Object key,Object value)
先通过hash找到segment，并确保正确初始化
tryLock() 如失败调用scanAndLockForPut

分段锁
volita来实现无锁读


