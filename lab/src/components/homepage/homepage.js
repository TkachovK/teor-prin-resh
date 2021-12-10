import React, { Component } from "react";
import Select from "../utilits/select";
import Button from "../utilits/button";
import "./homepage.css";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rightAnswers: ["a", "a", "a", "a", "a", "a"],
      currentAnswers: [],
      currentItem: [],
      choiseOption: ["a", "b", "c", "d"],
      formFalid: false,
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
    console.log(e.nativeEvent.path[0][0].text);
    e.nativeEvent.path[0][0].text = value;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let right = this.state.rightAnswers;
    let current = this.state.currentItem;
    // let temp = current;
    let data = [];

    if (current.length != 6) {
      alert( "Вы ввели не все поля" );
      return;
    }

    right.map((one, index) => {
      // console.log(current);
      if (current.length == 6) {
        // console.log(index);
        if (one == current[index][1]) {
          data[index] = true;
        } else {
          data[index] = false;
        }
      }
      if (current.length == index) {
        // console.log(current.length);
        for (let i = 0; i < current.length; i++) {
          if (one == current[i][1]) {
            data[i] = true;
          } else {
            data[i] = false;
          }
        }
        for (let i = index; i < 6; i++) {
          data[i] = false;
        }
      }
    });
    alert('Тест виконано! Для перегляду результатів перейдіть до сторінки <<Результати тестування>>')

    // console.log(right);
    // console.log(current);
    localStorage.setItem("answers1", JSON.stringify(data));
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      currentItem: [],
    });
    localStorage.removeItem('answers1');
  }

  render() {
    return (
      <div className="container homepage">
        <p>
          Розглянемо клас задач, у яких рішення приймає одна із сторін за умови,
          коли немає усвідомленої протидії. Такі задачі відносять до класу{" "}
          <b>ігор проти природи.</b>
        </p>
        <p>
          У дискретному випадку вважається, що рішення (стратегія) вибирається
          із скінченної множини, а фактори, що можуть впливати на результат
          вибору, мають скінченну кількість станів.
        </p>
        <p>
          <strong>Означення 1.1</strong>
        </p>
        <p>
          <strong>Нерандомізованим розв’язком</strong> &alpha;<sub>i</sub>{" "}
          називається будь-яка стратегія особи, яка приймає рішення.
        </p>
        <p>
          <strong>Означення 1.2</strong>
        </p>
        <p>
          <strong>Критерій оптимальності</strong> — це правило, яке дозволяє із
          двох нерандомізованих розв’язків &alpha;<sub>i</sub> і &alpha;
          <sub>j</sub> визначити кращий.
        </p>
        <p>
          <strong>Означення 1.3</strong>
        </p>
        <p>
          <strong>Матрицею втрат</strong> називають матрицю L = &#123;l
          <sub>ij</sub>&#125;<sub>m&#215;n</sub> , кожен елемент l<sub>ij</sub>{" "}
          якої відповідає втратам, що зазнає особа, яка обрала стратегію &alpha;
          <sub>i</sub>, якщо природа буде знаходитися в стані &beta;<sub>j</sub>
          .
        </p>
        <p>
          <strong>Означення 1.4</strong>
        </p>
        <p>
          <strong>Матрицею корисності</strong> називають матрицю Q = &#123;q
          <sub>ij</sub>&#125;<sub>m&#215;n</sub> , кожен елемент q<sub>ij</sub>{" "}
          якої відповідає користі, що буде мати особа, яка обрала стратегію
          &alpha;<sub>i</sub>, якщо природа знаходитися в стані &beta;
          <sub>j</sub>.
        </p>
        <p>
          Слід відзначити, що елементи матриць L та Q є суб’єктивні, тобто для
          двох різних осіб вони можуть бути різними.
        </p>
        <p>
          Елементи матриці втрат і матриці корисності пов’язані між собою таким
          чином: l<sub>ij</sub>=max<sub>i, j</sub>q<sub>ij</sub> - q
          <sub>ij</sub>.
        </p>
        <p>Зазвичай на практиці застосовують такі критерії оптимальності:</p>
        <ul>
          <li>Мінімаксний критерій.</li>
          <li>Критерій Севіджа.</li>
          <li>Критерій Гурвіца</li>
          <li>Критерій Байєса.</li>
          <li>Критерій Неймана–Пірсона.</li>
        </ul>
        <p>Усі ці критерії застосовуються до матриці втрат.</p>
        <p>
          <strong>Означення 1.5</strong>
        </p>
        <p>
          <strong>Рандомізованим розв’язком</strong> X називається розподіл
          імовірностей на множині нерандомізованих розв’язків, тобто X=&#123;(x
          <sub>1</sub>,x<sub>2</sub>,...,x<sub>m</sub>):x<sub>i</sub>&ge;0,
          <sub>i=1</sub>&sum;<sup>m</sup>x<sub>i</sub>=1&#125;, де x<sub>i</sub>{" "}
          – імовірність вибору нерандомізованого розв’язку &alpha;<sub>i</sub>.
        </p>
        <p>
          Нехай природа може знаходитись в одному із двох станів, тоді матриці
          втрат матиме вигляд
        </p>
        <div style={{ paddingLeft: "83px" }}>
          (l<sub>11</sub> l<sub>12</sub>)
        </div>
        <div style={{ paddingLeft: "83px" }}>
          (l<sub>21</sub> l<sub>22</sub>)
        </div>
        <div>
          L = &#123;l<sub>ij</sub>&#125;<sub>n&#215;2</sub>
          =(...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...)
        </div>
        <div style={{ paddingLeft: "83px" }}>
          (l<sub>n1</sub> l<sub>n2</sub>)
        </div>
        <p>
          Розглянемо декартову систему координат, де по осі абсцис відкладаються
          втрати в разі першого стану природи, а по осі ординат – у разі
          другого. Тоді точки в цій системі координат задаватимуть конкретний
          нерандомізований розв’язок.
        </p>
        <p>
          Оскільки рандомізований розв’язок – це розподіл імовірностей на
          множині нерандомізованих розв’язків, то, зафіксувавши будь-які два
          нерандомізованих розв’язки &alpha;<sub>i</sub> та &alpha;<sub>j</sub>{" "}
          , ми одержимо множину всіх рандомізованих розв’язків, що зумовлюються
          даними нерандомізованими розв’язками. Цим рандомізованим розв’язкам
          будуть відповідати точки на відрізку, що поєднує точки &alpha;
          <sub>i</sub> (l<sub>i1</sub>, l<sub>i2</sub>) та &alpha;<sub>j</sub>{" "}
          (l<sub>j1</sub>, l<sub>j2</sub>).{" "}
        </p>
        <p>
          Перебравши всі можливі пари нерандомізованих розв’язків, ми одержимо
          всі множини рандомізованих розв’язків.
        </p>
        <p>
          <strong>Означення 1.6</strong>
        </p>
        <p>
          Геометричне місце точок, що відповідають рандомізованим розв’язкам,
          називають <strong>платіжною множиною</strong> D.
        </p>
        <p>
          Геометрична інтерпретація критеріїв оптимальності зводиться до того,
          щоб визначити, яка саме точка платіжної множини є оптимальна, а знайти
          рандомізований розв’язок за тим чи іншим критерієм означає знайти
          точку платіжної множини, що є оптимальною за цим критерієм.
        </p>
        <p>
          У цій лабораторній роботі будуть розглядатися критерії Байєса і
          Гурвіца.
        </p>

        <form className="form-container">
          <div>
            <h5>1. Нерандомізованим розв’язком αi називається</h5>
            <p className="form-text">
              a: Будь-яка стратегія особи, яка приймає рішення.{" "}
            </p>
            <p className="form-text">
              b: Розв’язок за яким особа робить висновки.{" "}
            </p>
            <p className="form-text">
              c: Стратегія за якою особа отримує найменші втрати.{" "}
            </p>
            <p className="form-text">
              d: Стратегія за якою особа отримує найбільший виграш.{" "}
            </p>
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
            <h5>2. Критерій оптимальності це правило</h5>
            <p className="form-text">
              a: яке дозволяє із двох нерандомізованих розв’язків αi і αj
              визначити кращий.
            </p>
            <p className="form-text">
              b: яке дозволяє із двох нерандомізованих розв’язків αi і αj
              визначити найгірший.
            </p>
            <p className="form-text">
              c: яке доводить що нерандомізований розв’язок невірний{" "}
            </p>
            <p className="form-text">
              d: яке доводить що нерандомізований розв’язок вірний
            </p>
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
            <h5>3. Матрицею втрат називають матрицю L = &#123;lij&#125;m×n </h5>
            <p className="form-text">
              a: кожен елемент lij якої відповідає втратам, що зазнає особа, яка
              обрала стратегію αi, якщо природа буде знаходитися в стані βj.
            </p>
            <p className="form-text">
              b: кожен елемент lij якої відповідає здобуткам, що зазнає особа,
              яка обрала стратегію αi, якщо природа буде знаходитися в стані βj.
            </p>
            <p className="form-text">
              c: кожен елемент lij якої відповідає втратам, що зазнає особа, і
              знаходиться таким чином: lij=minij*qij - qij.{" "}
            </p>
            <p className="form-text">
              d: кожен елемент lij якої відповідає втратам, що зазнає особа, яка
              обрала стратегію αi, незалежно від того в якому стані знаходиться
              природа.
            </p>
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
            <h5>4. Рандомізованим розв’язком X називають</h5>
            <p className="form-text">
              a: Розподіл імовірностей на множині нерандомізованих розв’язків,
              тобто X=&#123;&#40;x1,x2,...,xm&#41;:xi≥0,i=1∑mxi=1&#125;, де xi –
              імовірність вибору нерандомізованого розв’язку αi.{" "}
            </p>
            <p className="form-text">
              b: Розподіл імовірностей на множині рандомізованих розв’язків,
              тобто X=&#123;&#40;x1,x2,...,xm&#41;:xi≥0,i=1∑mxi=1&#125;, де xi –
              імовірність вибору рандомізованого розв’язку αi.{" "}
            </p>
            <p className="form-text">c: Транспоновану матрицю втрат.</p>
            <p className="form-text">d: Транспоновану матрицю корисності</p>
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
              5. Геометричне місце точок, що відповідають рандомізованим
              розв’язкам, називають
            </h5>
            <p className="form-text">a: платіжною множиною.</p>
            <p className="form-text">b: множиною витрат</p>
            <p className="form-text">c: оптимальною множиною </p>
            <p className="form-text">d: множиною здобутків</p>
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
            <h5>6. Які з перелічених є критерієм оптимальності</h5>
            <p className="form-text">a: Критерій Гурвіца, Критерій Байєса. </p>
            <p className="form-text">b: Критерій витрат, критерій здобутків </p>
            <p className="form-text">c: Критерій Паскаля, критерій Рихтера </p>
            <p className="form-text">
              d: Критерій Неймана–Пірсона, критерій Троелсена{" "}
            </p>
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
