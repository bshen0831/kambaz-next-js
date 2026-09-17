export default function Tables() {
  return (
    <><div id="wd-tables">
          <h4>Table Tag</h4>
          <table border={1} width="100%">
              <thead>
                  <tr>
                      <th>Quiz</th>
                      <th align="center">Topic</th>
                      <th align="center">Date</th>
                      <th>Grade</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Q1</td>
                      <td align="center">HTML</td>
                      <td align="center">2/3/21</td>
                      <td align="right">85</td>
                  </tr>
                  <tr>
                      <td>Q2</td>
                      <td align="center">CSS</td>
                      <td align="center">2/10/21</td>
                      <td align="right">90</td>
                  </tr>
                  <tr>
                      <td>Q3</td>
                      <td align="center">JavaScript</td>
                      <td align="center">2/17/21</td>
                      <td align="right">95</td>
                  </tr>
                  <tr>
                      <td>Q4</td>
                      <td align="center">Bootstrap</td>
                      <td align="center">2/24/21</td>
                      <td align="right">88</td>
                  </tr>
                  <tr>
                      <td>Q5</td>
                      <td align="center">React</td>
                      <td align="center">3/3/21</td>
                      <td align="right">92</td>
                  </tr>
                  <tr>
                      <td>Q6</td>
                      <td align="center">Components</td>
                      <td align="center">3/10/21</td>
                      <td align="right">79</td>
                  </tr>
                  <tr>
                      <td>Q7</td>
                      <td align="center">State and Props</td>
                      <td align="center">3/17/21</td>
                      <td align="right">94</td>
                  </tr>
                  <tr>
                      <td>Q8</td>
                      <td align="center">Hooks</td>
                      <td align="center">3/24/21</td>
                      <td align="right">87</td>
                  </tr>
                  <tr>
                      <td>Q9</td>
                      <td align="center">Redux</td>
                      <td align="center">3/31/21</td>
                      <td align="right">91</td>
                  </tr>
                  <tr>
                      <td>Q10</td>
                      <td align="center">Routing</td>
                      <td align="center">4/7/21</td>
                      <td align="right">96</td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colSpan={3}>Average</td>
                      <td align="right">89.7</td>
                  </tr>
              </tfoot>
          </table>
      </div><div id="wd-your-table">
              <h4>My Tag</h4>
              <table border={1} width="100%">
                  <thead>
                      <tr>
                          <th align="center">Day</th>
                          <th align="center">Steps Walked</th>
                          <th align="center">Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Friday</td>
                          <td align="right">8,073</td>
                          <td align="center">9/11/2026</td>
                      </tr>
                      <tr>
                          <td>Monday</td>
                          <td align="right">11,110</td>
                          <td align="center">9/14/2026</td>
                      </tr>
                      <tr>
                          <td>Tuesday</td>
                          <td align="right">7,013</td>
                          <td align="center">9/15/2026</td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                      </tr>
                  </tfoot>
              </table>
          </div></>
  );
}