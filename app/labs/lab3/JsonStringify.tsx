export default function JsonStringify() {
    const squares = [1, 4, 16, 25, 36];
    const newArray = { 1: 1, 321: 321, "adf": "adf" };
    return (
        <div id="wd-json-stringify">
            <h3>JSON Stringify</h3>
            squares = {JSON.stringify(squares)}
            <br />
            sampleCourse = {JSON.stringify({ course: "RS102", modules: 3 })}
            <br />
            newArray = {JSON.stringify(newArray)}
            <hr />
        </div>
    );
}