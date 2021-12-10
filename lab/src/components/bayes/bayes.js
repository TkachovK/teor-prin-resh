import React, { Component } from "react";
import Select from "../utilits/select";
import Button from "../utilits/button";
import bayes from "../../images/bayes.png";
import "./bayes.css";

export default class Bayes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rightAnswers: ["d", "c", "d", "a", "b", "d"],
      currentAnswers: [],
      currentItem: [],
      choiseOption: ["a", "b", "c", "d"],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let flag = false;
    let i = 0;

    this.state.currentItem.map((item, index) => {
      if (item[0] == e.target.name) {
        flag = true;
        i = index;
        item[1] = value;
      }
    });

    if (flag == false) {
      this.state.currentItem.push([e.target.name, value]);
    }

    flag = false;
    // console.log(e.target.name);
    e.nativeEvent.path[0][0].text = value;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let right = this.state.rightAnswers;
    let current = this.state.currentItem;
    let data = [];

    if (current.length != 6) {
      alert("Вы ввели не все поля");
      return;
    }

    right.map((one, index) => {
      if (current.length != 0) {
        if (one == current[index][1]) {
          data[index] = true;
        } else {
          data[index] = false;
        }
      } else {
        data[index] = false;
      }
    });

    alert('Тест виконано! Для перегляду результатів перейдіть до сторінки <<Результати тестування>>')
    localStorage.setItem("answers2", JSON.stringify(data));
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      currentItem: [],
    });
    localStorage.removeItem('answers2');
  }

  render() {
    return (
      <div className="container bayes">
        <h3>Критерій оптимальності Байєса</h3>
        <h4>Нерандомізований розв’язок</h4>
        <p>
          Критерій оптимальності Байєса застосовується тоді, коли на множині
          станів природи заданий розподіл імовірностей цих станів.
        </p>
        <p>
          Якість кожної стратегії &alpha;<sub>i</sub> оцінимо середніми
          втратами, що обчислюються за формулою
        </p>
        <p>
          R(&alpha;<sub>i</sub>) = <sub>j=1</sub>&sum;<sup>m</sup>p<sub>j</sub>l
          <sub>ij</sub>,
        </p>
        <p>
          де p<sub>j</sub> – імовірність того, що природа набуде стану &beta;
          <sub>j</sub> (0&le;p<sub>j</sub>&le;1, <sub>j=1</sub>&sum;<sup>m</sup>
          p<sub>j</sub>=1 ).{" "}
        </p>
        <p>
          Згідно з критерієм Байєса із двох розв’язків кращим є той, для якого
          середні втрати менші, тобто R(&alpha;<sub>i</sub>) &rarr; min
          <sub>i</sub>.
        </p>
        <p>
          Якщо розподіл імовірностей невідомий, то вважають, що стани природи
          рівноймовірні: p<sub>j</sub> = 1/m, j ={" "}
          <span style={{ textDecoration: "overline" }}>1, m</span>. Такий
          окремий випадок критерію Байєса називають критерієм Лапласа.
        </p>
        <h3>Алгоритм пошуку нерандомізованого розв’язку за критерієм Байєса</h3>
        <p>
          1. Обчислити середні втрати R(&alpha;<sub>i</sub>)=<sub>j=1</sub>&sum;
          <sup>m</sup>p<sub>j</sub>l<sub>ij</sub> для кожної стратегії. Для
          цього кожен елемент рядка слід помножити на відповідну імовірність і
          знайти суму одержаних добутків.
        </p>
        <p>
          2. Обрати як розв’язок таке &alpha;<sub>i</sub>, якому відповідає
          найменше R(&alpha;<sub>i</sub>).
        </p>
        <h5>Приклад</h5>
        <p>Матриця втрат має вигляд:</p>
        <div style={{ paddingLeft: "27px" }}>&#123;0 4&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;5 1&#125;</div>
        <div>L = &#123;6 3&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;3 2&#125;</div>
        <p>Нехай розподіл імовірностей p=&#123;1/3,2/3&#125;. Тоді</p>
        <p>
          R(&alpha;<sub>1</sub>)=1/3*0+2/3*4=8/3
        </p>
        <p>
          R(&alpha;<sub>2</sub>)=1/3*5+2/3*1=7/3
        </p>
        <p>
          R(&alpha;<sub>3</sub>)=1/3*6+2/3*3=12/3
        </p>
        <p>
          R(&alpha;<sub>4</sub>)=1/3*3+2/3*2=7/3
        </p>
        <p>
          Оптимальний розв’язок – (&alpha;*)=7/3. Тобто оптимальним є
          застосування другої або четвертої стратегії.
        </p>

        <h4>Рандомізований розв’язок</h4>
        <p>
          За критерієм Байєса для кожної стратегії &alpha;<sub>i</sub>{" "}
          оцінюються середні втрати, що обчислюються за формулою R(&alpha;
          <sub>i</sub>) = <sub>j=1</sub>&sum;<sup>n</sup>p<sub>j</sub>l
          <sub>ij</sub>, де p<sub>j</sub> – імовірність того, що природа набуде
          стану &beta;<sub>j</sub>.
        </p>
        <p>
          Таким чином, ми маємо знайти таку точку (L*<sub>1</sub>, L*
          <sub>2</sub>)&isin;D , для якої виконуватиметься умова p<sub>1</sub>L
          <sub>1</sub>+p<sub>2</sub>L<sub>2</sub>&rarr; min
          <sub>
            L<sub>1</sub>,L<sub>2</sub>&isin;D
          </sub>
          . У разі фіксованих значень p<sub>i</sub>, p<sub>j</sub> рівняння p
          <sub>1</sub>L<sub>1</sub>+p<sub>2</sub>L<sub>2</sub>=const є рівнянням
          прямої (змінюючи константу, одержимо сім’ю прямих). Отже, задача
          зводиться до розв’язання задачі лінійного програмування. Внаслідок
          опуклості платіжної множини цей розв’язок буде відповідати вершині,
          тобто збігатиметься із нерандомізованим розв’язком.
        </p>
        <h3>Алгоритм пошуку рандомізованого розв’язку за критерієм Байєса</h3>
        <p>1. Побудувати платіжну множину за матрицею втрат</p>
        <p>
          2. Побудувати пряму p<sub>1</sub>L<sub>1</sub>+p<sub>2</sub>L
          <sub>2</sub>=const та рухати її до першого перетину із платіжною
          множиною.
        </p>
        <p>
          3. Вершина, у якій відбувся перетин, і є розв’язком. Рандомізований
          розв’язок буде: (0;...;0; x ;0;...;0)
        </p>
        <h5>Приклад</h5>
        <p>Матриця втрат має вигляд:</p>
        <div style={{ paddingLeft: "27px" }}>&#123;0 4&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;5 1&#125;</div>
        <div>L = &#123;6 3&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;3 2&#125;</div>
        <p>Нехай розподіл імовірностей буде такий: p=&#123;1/3, 2/3&#125;.</p>
        <img src={bayes} alt="bayes" />
        <p>
          Геометрична інтерпретація наведена на рисунку. Штрихами зображені
          прямі із сім’ї 1/3 L<sub>1</sub> + 2/3 L<sub>2</sub> = const , а саме
          прямі 1/3 L<sub>1</sub> + 2/3 L<sub>2</sub> = 2/3 , 1/3 L<sub>1</sub>{" "}
          + 2/3 L<sub>2</sub> = 4/3 та 1/3 L<sub>1</sub> + 2/3 L<sub>2</sub> =
          7/3. Остання пряма збігається із прямою, що проходить через вершини
          &alpha;<sub>2</sub> (5;1) і &alpha;<sub>4</sub> (3;2). Тобто задача
          має безліч рандомізованих розв’язків, наприклад, таких: (0;1;0;0),
          (0;0;0;1) тощо.
        </p>

        <form className="form-container">
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;8 4 6 20&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;7 7 7 7&#125;</div>
              <div>L = &#123;6 12 8 10&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 7 2 8&#125;</div>
            </h5>
            <h5>При p={(0.25, 0.25, 0.25, 0.25)} </h5>
            <p className="form-text">a: вірна четверта стратегія </p>
            <p className="form-text">b: вірна перша стратегія </p>
            <p className="form-text">c: вірна друга стратегія </p>
            <p className="form-text">d: вірна третя стратегія </p>
            <Select
              title={"Оберіть варіант"}
              name={"q1"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;2 7 1 8&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 6 4 3&#125;</div>
              <div>L = &#123;4 9 5 1&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;1 6 2 10&#125;</div>
            </h5>
            <h5>При p={(0.25, 0.15, 0.15, 0.45)} </h5>
            <p className="form-text">a: вірна друга стратегія </p>
            <p className="form-text">b: вірна перша стратегія </p>
            <p className="form-text">c: вірна четверта стратегія </p>
            <p className="form-text">d: вірна третя стратегія </p>
            <Select
              title={"Оберіть варіант"}
              name={"q2"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;8 4 7 10&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;6 15 3 8&#125;</div>
              <div>L = &#123;12 0 6 3&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 3 13 9&#125;</div>
            </h5>
            <h5>При p={(0.5, 0.1, 0.1, 0.3)} </h5>
            <p className="form-text">a: вірна четверта стратегія </p>
            <p className="form-text">b: вірна перша стратегія </p>
            <p className="form-text">c: вірна друга стратегія </p>
            <p className="form-text">d: вірна третя стратегія </p>
            <Select
              title={"Оберіть варіант"}
              name={"q3"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;0 5&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;2 3&#125;</div>
              <div>L = &#123;3 1&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 3&#125;</div>
            </h5>
            <h5>
              Знайти рандомізований розв’язок для цієї задачі за критерієм
              Байеса{" "}
            </h5>
            <h5>При p={"{0.5, 0.5}"} </h5>
            <p className="form-text">a: {"(0;0;1;0)"} </p>
            <p className="form-text">b: {"(1;0;1;0)"} </p>
            <p className="form-text">c: {"(1;0;0;0)"} </p>
            <p className="form-text">d: Безліч розв’язків </p>
            <Select
              title={"Оберіть варіант"}
              name={"q4"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;0 4&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;3 2&#125;</div>
              <div>L = &#123;4 5&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;2 2&#125;</div>
            </h5>
            <h5>
              Знайти рандомізований розв’язок для цієї задачі за критерієм
              Байеса{" "}
            </h5>
            <h5>При p={"{1/3, 2/3}"} </h5>
            <p className="form-text">a: {"(1;0;1;0)"} </p>
            <p className="form-text">b: {"(0;0;0;1)"} </p>
            <p className="form-text">c: {"(1;0;0;1)"} </p>
            <p className="form-text">d: Безліч розв’язків </p>
            <Select
              title={"Оберіть варіант"}
              name={"q5"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;1 2&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;2 3&#125;</div>
              <div>L = &#123;3 5&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 0&#125;</div>
            </h5>
            <h5>
              Знайти рандомізований розв’язок для цієї задачі за критерієм
              Байеса{" "}
            </h5>
            <h5>При p={"{4/5,1/5}"} </h5>
            <p className="form-text">a: {"(1;0;1;0)"} </p>
            <p className="form-text">b: {"(1;1;0;0)"} </p>
            <p className="form-text">c: {"(1;0;0;1)"} </p>
            <p className="form-text">d: Безліч розв’язків </p>
            <Select
              title={"Оберіть варіант"}
              name={"q6"}
              options={this.state.choiseOption}
              value={this.state.currentAnswers.push}
              placeholder={"Оберіть відповідь"}
              handleChange={this.handleInput}
            />{" "}
          </div>
          <Button
            action={this.handleFormSubmit}
            type={"primary"}
            title={"Підтвердити"}
          />{" "}
          <Button
            action={this.handleClearForm}
            type={"secondary"}
            title={"Очистити"}
          />{" "}
        </form>
      </div>
    );
  }
}
