# amxdd

AMX Device Discoveryプロトコルのビーコンを受信するためのモジュールです。

## 使用方法

```JavaScript
const amxdd = require('amxdd');

amxdd(info => {
    console.dir(info);
});
```

AMX Device Discoveryプロトコルのビーコンを受信すると、コンストラクタの引数のコールバックに通信されます。
コールバックへの引数は下記のように、ビーコンの送信元アドレスと受信したビーコンです。

```JavaScript
{
  address: '192.168.3.21',
  beacon: {
    'Device-UUID': 'xx-xx-xx-xx-xx-xx',
    'Device-SDKClass': 'Receiver',
    'Device-Make': 'DENON',
    'Device-Model': 'AVR-X2400H',
    'Device-Revision': '14.6.0'
  }
}
```

ビーコンは30秒〜60秒に1回くらい送信しているようです。

## 使用環境
以下のような環境で使用しています。

|項目|内容|
|:----|:--------------------------------------|
|ホスト|Raspberry Pi 3B+ Raspbian Stretch Lite|
|AVアンプ|Denon社製AVR-X2400H|
