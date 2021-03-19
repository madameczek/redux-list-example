import { addProduct, changeOrder } from "../redux/actions";
import store from "../redux/store";
class ShoppingList {
  constructor(rootElement) {
    this.createUI(rootElement);
    this.reduxConnect();
    this.collectRefs();
    this.applyHandlers();
  }

  createUI(rootElement) {
    this.rootElement = rootElement;
    this.rootElement.innerHTML = `
      <div class="card-header">Lista zakupów</div>
      <div class="card-body">
        <form>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Produkt..." />
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button" id="shop-add">Dodaj</button>
            </div>
          </div>
        </form>

        <ul class="list-group list-unstyled mt-3" id="shop-list">
        </ul>
      </div>
    `;
  }

  collectRefs() {
    this.form = this.rootElement.querySelector("form");
    this.shopList = this.rootElement.querySelector("#shop-list");

    this.addButton = this.form.querySelector("#shop-add");
    this.input = this.form.querySelector("input");
  };

  reduxConnect() {
    // subscribe to a store change events
    const usubscribe = store.subscribe(() => this.createList(store.getState().products))
  }

  applyHandlers() {
    this.addButton.addEventListener(
      "click",
      () => this.handleInput()
    );

    this.input.addEventListener(
      "keydown",
      e => {
        if(e.keyCode === 13) {
          e.preventDefault();
          this.addButton.click();
      }}
    );

    this.addUpButtonHandler = (button) => {
      button.addEventListener(
        "click", 
        e => {store.dispatch(changeOrder("up", e.target.id))}
      );
    };

    this.addDownButtonHandler = (button) => {
      button.addEventListener(
        "click", 
        e => {store.dispatch(changeOrder("down", e.target.id))}
      );
    };

  }

  handleInput() {
    if(this.input.value) {
      store.dispatch(addProduct(this.input.value));
      this.input.value="";
    }
  }

  createList(products) {
    this.shopList.innerHTML = "";
    products.forEach((product, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<hr /><h4>${product}</h4>`;
      const upButton = document.createElement("button");
      const downButton = document.createElement("button");
      upButton.setAttribute("type", "button")
      downButton.setAttribute("type", "button")
      upButton.classList.add("btn", "btn-success");
      downButton.classList.add("btn", "btn-info");
      upButton.id = downButton.id = index;
      upButton.innerText="UP";
      downButton.innerText="DOWN";
      listItem.appendChild(upButton);
      listItem.appendChild(downButton);
      this.shopList.appendChild(listItem);
      // apply handlers
      this.addUpButtonHandler(upButton);
      this.addDownButtonHandler(downButton);
    });
  }
}

export default ShoppingList;

// done
