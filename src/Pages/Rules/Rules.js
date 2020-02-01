import React, { Component } from "react";
import "./styles.css";

class Rules extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="header">
          <h1>Taisyklės</h1>
        </div>
        <div className="RuleList">
          <ul>
            <li>
              <p>
                Varžybų spėjimai turi būti pateikti likus 5 min. iki rungtynių
                pradžios.
              </p>
            </li>
            <li>
              <p>Prasidėjus varžyboms bus matomi visų dalyvių spėjimai.</p>
            </li>
            <hr />
            <li>
              <p>Taškų skaičiavimas:</p>
            </li>
            <ul>
              {" "}
              <li>
                <p>
                  Už teisingai atspėtą rezultatą: <strong>-3</strong> taškai.
                </p>
              </li>
              <li>
                <p>
                  Už teisingai atspėtą rezultatą, kai niekas neatspėjo varžybų
                  baigties: <strong>-7</strong> taškai.
                </p>
              </li>
              <li>
                <p>
                  Už įspėtą varžybų baigtį{" "}
                  <em>
                    (atspėta, kuri komanda laimės arba atspėtos lygiosios)
                  </em>
                  : <strong>0</strong> taškų.
                </p>
              </li>
              <li>
                <p>
                  Už neįspėtą varžybų baigtį: <strong>+3</strong> taškai.
                </p>
              </li>
              <li>
                <p>
                  Už kiekvieną neatspėtą įvartį: <em>papildomas</em>{" "}
                  <strong>+1</strong> taškas.
                </p>
              </li>
              <li>
                <p>
                  Dalyvis, laiku nepateikęs spėjimo gauna tiek pat taškų kaip ir
                  blogiausiai spėjęs dalyvis.
                </p>
              </li>
            </ul>
            <li>
              <p>
                Jeigu keli dalyviai turi tiek pat taškų, aukštesnę vietą užema
                daugiau rezultatų atspėjęs dalyvis.
              </p>
            </li>
            <hr />
            <li>
              <p>Taškų skaičiavimo pavyzdys:</p>
            </li>
            <ul>
              <li>
                <p>
                  Varžybos baigėsi rezultatu <strong>2:1</strong>
                </p>
              </li>
              <li>
                <p>
                  Dalyvis, spėjęs <strong>2:1</strong> gauna <strong>-3</strong>{" "}
                  taškus <em>(už įspėtą rezultatą)</em>.
                </p>
              </li>
              <li>
                <p>
                  Dalyvis, spėjęs <strong>3:0</strong> gauna <strong>+2</strong>{" "}
                  taškus <em>(už du neįspėtus įvarčius)</em>.
                </p>
              </li>
              <li>
                <p>
                  Dalyvis, spėjęs <strong>1:1</strong> gauna <strong>+4</strong>{" "}
                  taškus{" "}
                  <em>
                    (<strong>+3</strong> už neatspėtą baigtį ir{" "}
                    <strong>+1</strong> už vieną neįspėtą įvartį)
                  </em>
                  .
                </p>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
}

export default Rules;
