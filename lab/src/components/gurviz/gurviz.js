import React, { Component } from "react";
import Select from "../utilits/select";
import Button from "../utilits/button";

import gurviz1 from "../../images/gurviz1.jpg";
import gurviz2 from "../../images/gurviz2.jpg";
import gurviz3 from "../../images/gurviz3.jpg";

import "./gurviz.css";

export default class Gurviz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rightAnswers: ["d", "b", "a", "a", "b", "c"],
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
    localStorage.setItem("answers3", JSON.stringify(data));
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      currentItem: [],
    });
    localStorage.removeItem('answers3');
  }

  render() {
    return (
      <div className="container gurviz">
        <h3>Критерій оптимальності Гурвіца</h3>
        <h4>Нерандомізований розв’язок</h4>
        <p>
          Критерій Гурвіца ґрунтується на припущенні, що кожна особа має свій
          показник оптимізму &lambda; (0&le;&lambda;&le;1). Причому &lambda;=0
          відповідає крайньому песимізму, а &lambda;=1 – крайньому оптимізму.
        </p>
        <p>
          Для кожної стратегії &alpha;<sub>i</sub> побудуємо лінійну комбінацію
          втрат, що відповідають найбільш і найменш сприятливим станам природи:
        </p>
        <p>
          H(&alpha;<sub>i</sub>)=&lambda;min<sub>j</sub>l<sub>ij</sub>
          +(1-&lambda;)max<sub>j</sub>l<sub>ij</sub>
        </p>
        <p>
          Згідно з критерієм Гурвіца кращим є той розв’язок, для якого H(&alpha;
          <sub>i</sub>) менше. Тобто H(&alpha;<sub>i</sub>)&rarr;min
          <sub>
            &alpha;<sub>i</sub>
          </sub>
          .
        </p>
        <h3>
          Алгоритм пошуку нерандомізованого розв’язку за критерієм Гурвіца
        </h3>
        <p>
          1. Обрати найменший елемент (min<sub>j</sub>l<sub>ij</sub>) та
          найбільший елемент (max<sub>j</sub>l<sub>ij</sub>) у кожному рядку
          матриці втрат.
        </p>
        <p>
          2. Побудувати лінійну комбінацію втрат для кожного рядка H(&alpha;
          <sub>i</sub>)=&lambda;min<sub>j</sub>l<sub>ij</sub>+(1-&lambda;)max
          <sub>j</sub>l<sub>ij</sub>.
        </p>
        <p>
          3. Обрати як розв’язок &alpha;<sub>i</sub>, якому відповідає найменше
          H(&alpha;<sub>i</sub>).
        </p>
        <h5>Приклад</h5>
        <p>Матриця втрат має вигляд</p>
        <div style={{ paddingLeft: "27px" }}>&#123;0 4&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;5 1&#125;</div>
        <div>L = &#123;6 3&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;3 2&#125;</div>
        <p>
          Нехай коефіцієнт оптимізму &lambda;=0,75. Тоді лінійні комбінації
          втрат матимуть такий вигляд:
        </p>
        <p>
          H(&alpha;<sub>1</sub>)=0,75*0+0,25*4=1
        </p>
        <p>
          H(&alpha;<sub>2</sub>)=0,75*1+0,25*5=2
        </p>
        <p>
          H(&alpha;<sub>3</sub>)=0,75*3+0,25*6=3,75
        </p>
        <p>
          H(&alpha;<sub>4</sub>)=0,75*3+0,25*4=2,25
        </p>
        <p>
          Оптимальний розв’язок (найменший із H(&alpha;<sub>i</sub>)) –
          H(&alpha;*)=1 , тобто нерандомізований розв’язок відповідає обранню
          першої стратегії.{" "}
        </p>
        <h4>Рандомізований розв’язок</h4>
        <p>
          За критерієм Гурвіца ми маємо знайти таку точку (L*<sub>1</sub>, L*
          <sub>2</sub>), для якої виконуватиметься умова &lambda;min(L
          <sub>1</sub>, L<sub>2</sub>)+(1-&lambda;)max(L<sub>1</sub>, L
          <sub>2</sub>)&rarr; min
          <sub>
            L<sub>1</sub>,L<sub>2</sub>&isin;D
          </sub>
          .
        </p>
        <p>
          Геометричною інтерпретацією цього критерію буде клин, вершина якого
          лежить на бісектрисі першої чверті координатної площини (L<sub>1</sub>
          =L<sub>2</sub>), а кут між сторонами цього клина залежить від значення
          &lambda; так:
        </p>
        <div style={{ float: "left" }}>
          <img src={gurviz1} alt="gurviz1" />
          <p>Рисунок 1</p>
        </div>
        <div style={{ float: "right" }}>
          <img src={gurviz2} alt="gurviz2" />
          <p>Рисунок 2</p>
        </div>
        <p>1. &lambda;=0 – прямокутний клин (рис.1).</p>
        <p>2. &lambda;=0,5 – пряма, перпендикулярна до бісектриси (рис.1).</p>
        <p>
          3. 0&le;&lambda;&le;0,5 – клин із кутом &phi;&gt;180&#176; (рис.1).
        </p>
        <p>
          4. 0,5&le;&lambda;&le;1 – клин із кутом &phi;&lt;180&#176; (рис.2).
          Очевидно, що в цьому випадку внаслідок опуклості платіжної множини
          рандо-мізований розв’язок буде знаходитись в одній із вершин платіжної
          множини.
        </p>
        <p>5. &lambda;=1 – прямі, паралельні осям координат (рис.2).</p>
        <h3>Алгоритм пошуку рандомізованого розв’язку за критерієм Гурвіца</h3>
        <p>1. Побудувати платіжну множину за матрицею втрат.</p>
        <p>
          2. Побудувати клин, вигляд якого залежить від параметра &lambda;, та
          рухати його по прямій L<sub>1</sub> = L<sub>2 </sub>
          до першого перетину із платіжною множиною. Визначити точки &alpha;
          <sub>i</sub>(l<sub>i1</sub>;l<sub>i2</sub>) та &alpha;<sub>j</sub>(l
          <sub>j1</sub>;l<sub>j1</sub>), що задають відрізок платіжної множини,
          із яким перетнувся клин.
        </p>
        <p>3. Записати опуклу комбінацію кінців відрізка, а саме:</p>
        <p>
          x<sub>i</sub>(l<sub>i1</sub> l<sub>i2</sub>)+x<sub>j</sub>(l
          <sub>j1</sub> l<sub>j2</sub>)=(L<sub>1</sub> L<sub>2</sub>)
        </p>
        <p>
          або, враховуючи, що x<sub>i</sub>+x<sub>j</sub>=1: x(l<sub>i1</sub> l
          <sub>i2</sub>)+(1-x)(l<sub>j1</sub> l<sub>j2</sub>)=(L<sub>1</sub> L
          <sub>2</sub>)
        </p>
        <p>
          4. Оскільки L<sub>1</sub> = L<sub>2</sub>, то побудувати рівняння xl
          <sub>i1</sub>+(1-x)l<sub>j1</sub>=xl<sub>i2</sub>+(1-x)l<sub>j2</sub>.
          Розв’язавши це рівняння, знайти x.
        </p>
        <p>
          5. Рандомізований розв’язок буде (0;...;0; x ;0;...;0; 1-x ;0;...;0)
        </p>
        <h5>Приклад</h5>
        <p>Матриця втрат має вигляд</p>
        <div style={{ paddingLeft: "27px" }}>&#123;0 4&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;5 1&#125;</div>
        <div>L = &#123;6 3&#125;</div>
        <div style={{ paddingLeft: "27px" }}>&#123;3 2&#125;</div>
        <p>
          Знайдемо рандомізований розв’язок для цієї задачі за критерієм Гурвіца
          із коефіцієнтом оптимізму &lambda;=0,25.
        </p>
        <p>Геометрична інтерпретація подана на рисунку</p>
        <img src={gurviz3} alt="gurviz3" />
        <p>Знайдемо координати точки перетину:</p>
        <p>
          x(0 4)+(1-x)(3 2) = (L<sub>1</sub> L<sub>2</sub>)
        </p>
        <p>
          (зауважимо, що в цьому випадку x – імовірність того, що розв’язком є
          &alpha;<sub>1</sub>, а (1-x) – імовірність того, що розв’язком є
          &alpha;<sub>4</sub>)
        </p>
        <p>x*0 + (1-x)*3 = x*4 + (1-x)*2</p>
        <p>3-3x = 4x + 2 - 2x</p>
        <p>5x = 1</p>
        <p>x=1/5</p>
        <p>
          Тобто рандомізований розв’язок за цим критерієм буде (1/5;0;0;4/5). Це
          означає, що в одному із п’яти випадків ми діємо за першою стратегією,
          а в інших випадках – за четвертою.{" "}
        </p>

        <form className="form-container">
          <div>
            <h5>
              <div style={{ paddingLeft: "27px" }}>&#123;8 4 6 20&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;7 7 7 7&#125;</div>
              <div>L = &#123;6 12 8 10&#125;</div>
              <div style={{ paddingLeft: "27px" }}>&#123;5 7 2 8&#125;</div>
            </h5>
            <h5>При &lambda; = 0,5</h5>
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
            <h5>При &lambda; = 0,25</h5>
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
            <h5>При &lambda; = 0,9 та &lambda; = 0,1</h5>
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
              Гурвіца із коефіцієнтом оптимізму{" "}
            </h5>
            <h5>При &lambda;={"0.25"} </h5>
            <p className="form-text">a: {"(0;2/3;1/3;0)"} </p>
            <p className="form-text">b: {"(1;0;1;0)"} </p>
            <p className="form-text">c: {"(1;0;3/4;0)"} </p>
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
              Гурвіца із коефіцієнтом оптимізму{" "}
            </h5>
            <h5>При &lambda;={"0.5"} </h5>
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
              Гурвіца із коефіцієнтом оптимізму{" "}
            </h5>
            <h5>При &lambda;={"0.75"} </h5>
            <p className="form-text">a: {"(2/5;0;3/5;0)"} </p>
            <p className="form-text">b: {"(1;1;0;0)"} </p>
            <p className="form-text">c: {"(2/5;0;0;3/5)"} </p>
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
