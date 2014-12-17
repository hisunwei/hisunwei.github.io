新版本的storm提供了metric的新feature

IMetric接口

```
   package backtype.storm.metric.api;
   public interface IMetric {
       public Object getValueAndReset(); ;;取得当前值并恢复初始状态
   }
```

countMetric实现
```
public class CountMetric implements IMetric {
    long _value = 0;
    public CountMetric() {
    }
    public void incr() {
        _value++;
    }

    public void incrBy(long incrementBy) {
        _value += incrementBy;
    }

    public Object getValueAndReset() {
        long ret = _value;
        _value = 0;
        return ret;
    }
}
```
可以发现countMetric每次调用incrBy方法，getValueAndRest()方法把当前累加值返回并重置为0

另外还有实现：
AssignableMetric 只set不reset
MultiCountMetric  Map<String,CountMetric> 返回的时候为 Map<String,CountMetric.getValueAndReset()>

ICombiner接口
```
public interface ICombiner<T> {
    public T identity();
    public T combine(T a, T b);
}
```
MaxMetric实现求最大值

IReducer接口
```
package backtype.storm.metric.api;
public interface IReducer<T> {
    T init();
    T reduce(T accumulator, Object input);
    Object extractResult(T accumulator);
}
```
MeanReducer实现求平均数


IMetricsConsumer接口是最终接受metric信息，内部定义了TaskInfo和DataPoint类，用于传递metric信息，
storm默认实现LoggingMetricsConsumer，在build topology时设置该类storm在启动时会在MetricsConsumerBolt中通过反射创建IMetricsConsumer实例。


