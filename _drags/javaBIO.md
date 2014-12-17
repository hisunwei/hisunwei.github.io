java basic stream:
字节流：InputStream OutputStream
字符流: Reader Writer

new Reader(InputStream);

Data流：DataOutput DateInput
 DataOutputStream 实现了FilterOutputStream 和
 DataOutput接口，其中FilterOutputStream 继承自OutputStream

Object流：ObjectInput ObjectOutput
 ObjectInput extends DataInput
 ObjectInputStream extends ObjectInput InputStream

所以一切流的基础是字节流
