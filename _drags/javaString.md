java string

```
String a = "123";
String b = "123";
a==b a.equals(b)

String a =  new String("123")
String b =  new String("123")
a!=b a.equals(b)
```
----------
StringBuilder  是易变不稳定的

StringBuffer    是线程安全的 


----------
String.subString() 在jdk1.6 和 jdk1.7中实现不同：

jdk1.6中直接重用被截取字串对象的内部数组，会导致被截取对象数组无法释放

jdk1.7中完全构建一个新的对象。

----------
使用char[]替代string来存储敏感信息，因为string是不可修改的，会在内存中一直存留到被GC，所以存在安全险


----------
为什么字符串是不可变的：

1. 字符串在堆栈的方法区有 字符串池  string intern pool 主要是考虑到内存和时间上的效率
2. 字符串内有变量可以缓存其hashcode   private int hash; 
3. 安全方面， 字符串经常用在表示 网络链接， 打开文件等，如果字符串被修改，将导致安全问题

string intern pool 字符串驻留池

string literal  字符串字面量

intern pool 在java 的 基本变量装箱过程也会使用到  boolean ,byte ,char 0->127, short -128->127, int -128->127

string intering 加快了字符串的比较速度（这在程序中通常是一个性能瓶颈，比如编译器或者动态语言的运行。

速度慢的原因有：

1. O(n)的复杂度
2. 需要从内存的不同区域读取数据，耗费时间。
3. 读取的数据会填满处理器缓存。

而这一切使用了内部量后只需要比较指针即可，另外也大大减少了内存的消耗

参考自： http://en.wikipedia.org/wiki/String_interning
