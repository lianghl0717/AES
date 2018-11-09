# AES
前端小程序和后端java对接用的AES(CBC/PKCS7Padding)加密解密代码和示例

小程序前端AES加密数据，后端java解密数据

先说说AES  
AES有三种加密位：128、192、256位  
五种加密模式：CBC、ECB、CTR、OCF、CFB  
五种填充模式：NoPadding,PKCS5Padding,ISO10126Padding,ZerosPadding,PKCS7Padding  
我这里的前端后端用的是的AES是CBC/PKCS7Padding ，很多都是因为以为AES的加解密只有一种，上网找的前端代码和后端代码的加解方式不一致导致解密的过程
遇到各种报错。  
**强调一下，前后端AES的加密位、加密模式和填充模式要一致！**

-----
AES.js是小程序前端实现CBC/PKCS7Padding的AES加解密库  
util.js里配置AES的密钥和偏移iv，并将加密接口写完整，再把接口方法暴露出来(代码里第一句需要根据你AES.js的路径修改，与AES.js同一目录就不需要修改了)  
AESOperator.java是java后端的工具类，**需要用到apache的包commons-codec.jar**，[下载包](http://commons.apache.org/proper/commons-codec/download_codec.cgi)  

-----
##最后再写上前端小程序加密的示例和后端java解密的示例  
###前端小程序示例，因为暴露过接口了，所以使用起来也很方便：  
```
var CryptoJS = require('.../util.js')//这里的路径是你放util.js的路径
var userName = CryptoJS.Encrypt('1625110****');//将1625110****加密并赋值给userName
```


###后端java示例：
```
	public static void main(String[] args) {
		//设置AES加密的密钥 16位的16进制的ASCII码，我这里示例是1234123412ABCDEF
		byte[] keybytes = { 0x31, 0x32, 0x33, 0x34, 0x31, 0x32, 0x33, 0x34, 0x31, 0x32, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46 };
		//创建AES实例
		AESOperator aes = new AESOperator();

		//假设data是前端传来加密过的数据，不分大小写
		String data = "b59227d86200d7fedfb8418a59a8eea9";

		//解密并输出
		System.Out.println(new String( aes.decrypt(data,keybytes)));

	}
```
