export default function VariableTypes() {
    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let stringVariable = "Hello World!";
    let booleanVariable = true;
    let isNumber = typeof numberVariable;
    let isString = typeof stringVariable;
    let isBoolean = typeof booleanVariable;
    let secondString = "This is my second string";
    let secondNum = 6324;
    let isSecondString = typeof secondString;
    let isSecondNum = typeof secondNum;
    let sampleCount = 42;
    let sampleLabel = "Lab 3";
    let isCount = typeof sampleCount;
    let isLabel = typeof sampleLabel;
    return (
        <div id="wd-variable-types">
            <h4>Variables Types</h4>
            numberVariable = {numberVariable}
            <br />
            floatingPointNumber = {floatingPointNumber}
            <br />
            stringVariable = {stringVariable}
            <br />
            booleanVariable = {booleanVariable + ""}
            <br />
            isNumber = {isNumber}
            <br />
            isString = {isString}
            <br />
            isBoolean = {isBoolean}
            <br />
            personalConcatenatedLabString = {secondString + " " + secondNum + " " + isSecondString + " " + isSecondNum}
            <br />
            sampleCount = {sampleCount}
            <br />
            isCount = {isCount}
            <br />
            sampleLabel = {sampleLabel}
            <br />
            isLabel = {isLabel}
            <hr />

        </div>
    );
}