export default function TernaryOperator() {
    let loggedIn = true;
    const premium = false
    const hour = 9;
    return (
        <div id="wd-ternary-operator">
            <h4>Logged In</h4>
            {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
            {premium ? <p>Premium</p> : <p>Free</p>}
            {hour < 12 ? <p>Good Morning </p> : <p>Good Afternoon</p>}
            <hr />
        </div>
    );
}