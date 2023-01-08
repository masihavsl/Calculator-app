const allNums = document.querySelectorAll("[data-number]");
const allOps = document.querySelectorAll("[data-operation]");
const equal = document.querySelector("[data-equals]");
const del = document.querySelector("[data-delete]");
const ac = document.querySelector("[data-all-clear]");
const outputP = document.querySelector(".previous-operand");
const outputC = document.querySelector(".current-operand");
class Calc {
  #operation = "";
  #op;
  constructor() {
    allNums.forEach((btn) =>
      btn.addEventListener("click", this.display1.bind(this))
    );
    allOps.forEach((btn) =>
      btn.addEventListener("click", this.display2.bind(this))
    );
    equal.addEventListener("click", this.equal.bind(this));
    del.addEventListener("click", this.delete.bind(this));
    ac.addEventListener("click", this.allClear.bind(this));
  }
  display1(e) {
    if (!this.#operation.split("").some((el) => isNaN(el))) {
      if (this.#operation === "0") {
        this.#operation = e.target.innerHTML;
        outputC.textContent = e.target.innerHTML;
      } else {
        this.#operation += e.target.innerHTML;
        outputC.textContent += e.target.innerHTML;
      }
    } else {
      if (this.#operation === "Infinity") return;
      if (this.#operation.split(this.#op)[1] === "0") {
        this.#operation = `${this.#operation.split(this.#op)[0]}${this.#op}${
          e.target.innerHTML
        }`;
        outputC.textContent = e.target.innerHTML;
      } else {
        this.#operation += e.target.innerHTML;
        outputC.textContent += e.target.innerHTML;
      }
    }
  }
  display2(e) {
    if (!this.#operation.split("").some((el) => isNaN(el))) {
      e.target.innerHTML === "\u00f7"
        ? (this.#op = "/")
        : (this.#op = e.target.innerHTML);
      this.#operation += ` ${this.#op}`;
      outputP.textContent = this.#operation;
      outputC.textContent = "";
    } else {
      if (isNaN(this.#operation[this.#operation.length - 1])) return;
      e.target.innerHTML === "\u00f7"
        ? (this.#op = "/")
        : (this.#op = e.target.innerHTML);
      if (isNaN(eval(this.#operation))) return this.allClear();
      this.#operation = eval(this.#operation);
      outputC.textContent = "";
      this.#operation += ` ${this.#op}`;
      outputP.textContent = this.#operation;
    }
  }
  equal() {
    if (isNaN(this.#operation[this.#operation.length - 1])) return;
    if (isNaN(eval(this.#operation))) return this.allClear();
    this.#operation = String(eval(this.#operation));
    outputP.textContent = "";
    outputC.textContent = this.#operation;
  }
  delete() {
    if (isNaN(this.#operation[this.#operation.length - 1])) return;
    this.#operation = this.#operation.slice(0, this.#operation.length - 1);
    let cur = this.#operation.split(this.#op);
    cur.length > 1 ? (cur = cur[1]) : (cur = cur[0]);
    outputC.textContent = cur;
  }
  allClear() {
    this.#operation = "";
    outputC.textContent = "";
    outputP.textContent = "";
  }
}

const c = new Calc();
