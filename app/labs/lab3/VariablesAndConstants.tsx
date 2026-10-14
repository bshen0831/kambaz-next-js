export default function VariablesAndConstants() {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;
    var newVariable = 10;
    let newLet = "new let";
    const sampleSum = functionScoped + blockScoped;
    return (
        <div id="wd-variables-and-constants">
            <h4>Variables and Constants</h4>
            functionScoped = {functionScoped}
            <br />
            blockScoped = {blockScoped}
            <br />
            constant1 = {constant1}
            <br />
            newVariable = {newVariable}
            <br />
            newLet = {newLet}
            <br />
            sampleSum = {sampleSum}
            <hr />
        </div>
    );
}