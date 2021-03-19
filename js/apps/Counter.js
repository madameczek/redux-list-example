import { decrement, increment, STEP } from "../redux/actions";
import store from "../redux/store";

class Counter {
  constructor(rootElement) {
    this.createUI(rootElement);
    this.reduxConnect();
    this.collectRefs();
    this.applyHandlers();
  }

  createUI(rootElement) {
    this.rootElement = rootElement;
    this.rootElement.innerHTML = `
      <div class="card-header">Licznik</div>
      <div class="card-body">
        <h4 class="card-text">Wartość licznika: <span class="badge badge-primary" id="counter-value">0</span></h4>

        <button type="button" class="btn btn-success" id="counter-decrement">-</button>
        <button type="button" class="btn btn-info" id="counter-increment">+</button>
      </div>
    `;
  }

  collectRefs() {
    this.counterValue = this.rootElement.querySelector("#counter-value");
    this.counterDecrement = this.rootElement.querySelector("#counter-decrement");
    this.counterIncrement = this.rootElement.querySelector("#counter-increment");
  }

  reduxConnect() {
    const usubscribe = store.subscribe(() => this.counterValue.innerText = store.getState().counter)
  }

  applyHandlers() {
    this.counterIncrement.addEventListener(
      "click",
      () => store.dispatch(increment(STEP))
    )
    this.counterDecrement.addEventListener(
      "click",
      () => store.dispatch(decrement(STEP))
    )
  }
}

export default Counter;
