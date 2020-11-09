<template></template>
<script>
//心跳包发送
const heartCheck = {
  timeout: 30 * 1000,
  timer: null,
  serverTimer: null,
  reset() {
    this.timer && clearTimeout(this.timer);
    this.serverTimer && clearTimeout(this.serverTimer);
  },
  start(ws, message) {
    this.reset();
    this.timer = setTimeout(() => {
      ws.send(JSON.stringify(message || {}));
      this.serverTimer = setTimeout(() => {
        ws.close();
      }, this.timeout);
    }, this.timeout);
  }
};

export default {
  name: "websocket",
  props: {
    url: { type: String, required: true },
    heartMessage: { type: Object }
  },
  data() {
    return {
      socket: null,
      reconnectTimeout: null,
      lockReconnect: false,
      maxReconnect: 10
    };
  },
  created() {
    this.initWebSocket();
  },
  methods: {
    reconnect() {
      if (this.lockReconnect || this.maxReconnect <= 0) {
        this.socket = null;
        return;
      }
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
      this.reconnectTimeout = setTimeout(() => {
        // this.maxReconnect--;
        this.initWebSocket();
      }, 10 * 1000);
    },
    initWebSocket() {
      this.lockReconnect = false;
      try {
        if ("WebSocket" in window) {
          this.socket = new WebSocket(this.url);
        } else {
          console.log("您的浏览器不支持websocket");
        }
        this.socket.onopen = this.websocketOnopen;
        this.socket.onerror = this.websocketOnerror;
        this.socket.onmessage = this.websocketOnmessage;
        this.socket.onclose = this.websocketClose;
      } catch (e) {
        this.reconnect();
      }
    },
    websocketOnopen() {
      // this.$message.success('调度通道连接成功');
      this.socket.send(JSON.stringify({}));
      heartCheck.start(this.socket, this.heartMessage);
    },
    websocketOnerror(e) {
      this.reconnect();
    },
    websocketOnmessage(e) {
      // 消息获取成功，重置心跳
      heartCheck.start(this.socket, this.heartMessage);
      let receivedMsg = JSON.parse(e.data);
      this.$emit("receiveMsg", receivedMsg);
    },
    websocketClose(e) {
      console.log("connection closed (" + e.code + ")");
      this.reconnect();
    }
  },
  beforeDestroy() {
    this.lockReconnect = true;
    this.socket && this.socket.close();
  }
};
</script>
