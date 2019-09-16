import _ from "lodash";

class Ws {
  public server: string = "";
  public socket;
  public manualClose: boolean = false;
  public timer;
  public subscribeMsg: any = {};
  constructor(opts) {
    if (location.protocol == "https:") {
      this.server = "wss://" + opts.address;
    } else {
      this.server = "ws://" + opts.address;
    }
    this.open();
  }

  public open = () => {
    if (this.connected()) {
      return;
    }
    this.socket = new WebSocket(this.server);

    this.socket.onopen = e => {
      if (this.timer != null) {
        clearInterval(this.timer);
      }
      console.debug("ws：connect opend");
      this.open();
    };
    this.socket.onmessage = e => {
      // $(self).trigger("message", e);
      try {
        console.log('信息是：',e.data);
        var msg = JSON.parse(e.data);
        this.subscribeMsg[msg.cmd](msg);
        // $(self).trigger(msg.cmd, [msg.data, msg.id]);
      } catch (error) {
        console.log(error);
      }
    };
    this.socket.onerror = e => {
      //this.error();
      console.log("error:", e);
      //$(self).trigger("error", e);
    };
    this.socket.onclose = e => {
      console.info("ws：connect close");
      // if (this.manualClose) {
      //   this.manualClose = false;
      // } else {
      //   if (this.timer != null) {
      //     clearInterval(this.timer);
      //   }
      //   this.timer = setInterval(() => {
      //     console.info("ws：reconnect……");
      //     // $(self).trigger("reconnect");
      //     this.open();
      //   }, 3000);
      // }
      this.close();
    };
  };
  public connected = () => {
    return this.socket != null && this.socket.readyState === 1;
  };

  public close = () => {
    if (this.connected()) {
      this.manualClose = true;
      this.socket.close();
    }
  };

  public send = (cmd, data, call) => {
    if (this.connected()) {
      var msg = {
        id: _.uniqueId(cmd + "_"),
        cmd: cmd,
        data: JSON.stringify(data)
      };
      this.one(msg.id, call);
      this.socket.send(JSON.stringify(msg));
    }
  };

  public on = (name, call) => {
    this.subscribeMsg[name] = call;
  };

  public one = function(name, call) {
    //$(self).one(name, call);
  };
}

//const wsSh = new Ws({ address: "", sslPort: "1001" });

export default Ws;
