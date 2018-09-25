module.exports = exports = PushClient;
var EventEmitter = require('events').EventEmitter;
var clientId = 0;
var receiveTTL = 2;
var doNotReceiveTTL = 1;

//ie 8
if (!Object.keys) {
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && oThis ?
            this :
            oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

function PushClient(url, opt) {
  if (!(this instanceof PushClient)) return new PushClient(url, opt);
  if (!opt) {
    opt = {};
  }

  opt.forceNew = true;
  if (!opt.transports) {
    opt.transports = ['websocket'];
  }
  clientId++;
  var self = this;
  this.topics = {};
  this.socket = require('socket.io-client')(url, opt);
  //this.socket = require('wxapp-socket-io')(url, opt);
  this.initStorage();

  if (opt.pushId) {
    this.pushId = opt.pushId;
  } else {
    this.pushId = this.getItem("pushId");
    if (!this.pushId) {
      this.pushId = makeid();
    }
  }
  console.log("push---id",this.pushId)
  this.setItem("pushId", this.pushId);

  this.platform = opt.platform || "browser";

  this.event = new EventEmitter();
  this.socket.on('connect', function() {
    self.sendPushIdAndTopic();
  }.bind(this));

  this.socket.on('disconnect', function() {
    self.event.emit('disconnect');
  }.bind(this));

  this.socket.on('pushId', function(data) {
    self.event.emit('connect', {
      pushId: data.id,
      uid: data.uid,
      tags: data.tags
    });
  });

  this.topicToLastPacketId = {};

  this.socket.on('push', pushHandler.bind(this));
  this.socket.on('p', version2PushHandler.bind(this));
  if (opt.useNotification) {
    this.topics['noti'] = receiveTTL;
    this.socket.on('noti', notiHandler.bind(this));
  }
}

// private
PushClient.prototype.getItem = function(key) {
  return localStorage.getItem("PushClient:" + clientId + ":" + key);
}

// private
PushClient.prototype.setItem = function(key, val) {
  localStorage.setItem("PushClient:" + clientId + ":" + key, val);
}

// private
PushClient.prototype.initStorage = function() {
  if (typeof localStorage === "undefined" || localStorage === null) {
    localStorage = require('./localStorage')();
  }
}

// private
PushClient.prototype.sendPushIdAndTopic = function() {
  var topics = Object.keys(this.topics);
  this.socket.emit('pushId', {
    id: this.pushId,
    version: 1,
    platform: this.platform,
    topics: topics,
    lastUnicastId: this.getItem("lastUnicastId"),
    lastPacketIds: this.topicToLastPacketId
  });
}

PushClient.prototype.updateLastPacketId = function(topic, data) {
  var id = data.id || data.i;
  var ttl = data.ttl || data.t;
  var unicast = data.unicast || data.u;
  if (id && ttl) {
    if (unicast) {
      this.setItem("lastUnicastId", id);
    } else if (topic != null && this.topics[topic] == 2) {
      this.topicToLastPacketId[topic] = id;
    }
  }
}

PushClient.prototype.unbindUid = function() {
  this.socket.emit('unbindUid');
}

PushClient.prototype.bindUid = function(data) {
  console.log("eeee=======",data)
  this.socket.emit('bindUid', data);
}

PushClient.prototype.disconnect = function() {
  this.socket.disconnect();
}

PushClient.prototype.connect = function() {
  this.socket.connect();
}

var version2PushHandler = function(data, ttl) {
  if (ttl) {
    this.updateLastPacketId(ttl[0], {
      id: ttl[1],
      unicast: ttl[2],
      ttl: 1
    });
  }
  this.event.emit("push", data);
}

var pushHandler = function(data) {
  var jsonData;
  var dataBase64 = data.data || data.d;
  if (dataBase64) {
    jsonData = JSON.parse(new Buffer(dataBase64, 'base64').toString());
  } else {
    jsonData = data.j;
  }
  var topic = data.topic || data.t || '';
  this.updateLastPacketId(topic, data);
  this.event.emit("push", jsonData);
}

var notiHandler = function(data) {
  data.title = data.android.title;
  data.message = data.android.message;
  data.payload = data.android.payload;
  delete data.android;
  this.updateLastPacketId('noti', data);
  this.socket.emit('notificationReply', {
    id: data.id,
    timestamp: data.timestamp
  });
  this.event.emit("notification", data);
}

PushClient.prototype.on = function(event, callback) {
  this.event.removeAllListeners(event);
  if (callback) {
    this.event.on(event, callback);
  }
};

PushClient.prototype.addTag = function(tag) {
  this.socket.emit('addTag', {
    tag: tag
  });
};

PushClient.prototype.setTags = function(tags) {
  this.socket.emit('setTags', tags);
};

PushClient.prototype.removeTag = function(tag) {
  this.socket.emit('removeTag', {
    tag: tag
  });
};

PushClient.prototype.subscribeTopic = function(topic) {
  this.topics[topic] = doNotReceiveTTL;
  this.socket.emit('subscribeTopic', {
    topic: topic
  });
};

PushClient.prototype.subscribeTopicAndReceiveTTL = function(topic) {
  this.topics[topic] = receiveTTL;
  this.socket.emit('subscribeTopic', {
    topic: topic
  });
};

PushClient.prototype.unsubscribeTopic = function(topic) {
  delete this.topics[topic];
  this.socket.emit("unsubscribeTopic", {
    topic: topic
  });
}

PushClient.prototype.http = function(options, cb) {

  var requestCtx = [

    (options.method && options.method.toLowerCase()) || 'get',

    options.url, options.headers || {},

    options.params || options.data || {}

  ];
  this.socket.emit("http", requestCtx, function(responseCtx) {
    cb({
      statusCode: responseCtx[0],
      headers: responseCtx[1],
      body: responseCtx[2]
    });
  });
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
