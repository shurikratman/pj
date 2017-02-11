import Vue from 'vue'
import App from './components/App.vue'

let vv = new Vue({
  el: '#app',
  data: {
    event: '',
    xPos: '',
    yPos: '',
    elem: '',
    guides: [
      {isVertical: false,},
      {isVertical: true,}
    ]
  },
  watch: {
    event: function (eventObj) {
      const currElement = eventObj.path[0] || undefined;

      this.xPos = eventObj.pageX;
      this.yPos = eventObj.pageY;
      this.elem = {
        top: currElement.offsetTop + 'px',
        left: currElement.offsetLeft + 'px',
        width: currElement.offsetWidth + 'px',
        height: currElement.offsetHeight + 'px'
      }
    }
  },
  template: '<App :guides=guides :y-pos=yPos :x-pos=xPos :elem=elem />',
  components: { App }
});

document.onmousemove = function (e) {
  passEventData(e);
};

passEventData = throttle(passEventData, 20);

function passEventData(eventData) {
  vv.event = eventData;
}

function throttle(func, ms) {

  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}