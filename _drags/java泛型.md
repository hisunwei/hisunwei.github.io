List<?> a = new ArrayList<?>
a 是不能存放东西的，因为 List 需要一个确定的模型， 如果有要放Integer 和Long ，JVM 无法确定到底是以Integer 为模型,还是以Long为模型，所以这里是添加任何元素都是不合法的

List<? extends Number> a = new ArrayList<Number>();
该语句是可以执行的，但是却无法添加元素，原因同上。

List<? super Apple> a = new ArrayList<Number>();
该语句的意思是，a可以放入Apple的任何父类型， 因为这里明确了对象的内存模型不会超过Apple，所以你放进去一个Object 或者Fruit（apple的父类）都是没有问题的。

