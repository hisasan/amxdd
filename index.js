'use strict';

const dgram = require('dgram');

const address = '239.255.250.250';
const port = 9131;

// 成功するまでaddMembershipを繰り返す
function tryAddMembership(client, address) {
    try {
        client.addMembership(address);
    } catch (e) {
        setTimeout(function () {tryAddMembership(client, address);}, 5000);
    }
}

// 公開部
function amxdd(callback) {
    if (!(this instanceof amxdd)) {
        return new amxdd(callback);
    }

    const client = dgram.createSocket('udp4');

    // マルチキャストでamxddビーコンを待ち受ける
    client.on('listening', () => {
        client.setMulticastLoopback(true);
        tryAddMembership(client, address);
    });

    // フレーム受信
    client.on('message', (message, remote) => {
        if (message.toString('ascii', 0, 4) != 'AMXB') {
            // ヘッダがamxddではない
            return;
        }
        // amxddビーコンフレームをJSON形式に変換してコールバックする
        let arg;
        let beacon = {};
        let m = message.toString();
        const address = remote.address;
        while ((arg = m.match(/<([^=]+)=([^>]+)>/)) != null && arg.length > 2) {
            // '-'で始まるプロパティは'Device'を付加する。
            const prop = ((arg[1][0] === '-') ? 'Device' : '') + arg[1];
            beacon[prop] = arg[2];
            m = m.slice(arg[0].length + arg.index);
        }
        callback({address, beacon});
    });

    // 待ち受けポート設定
    client.bind(port);
}

module.exports = amxdd;
