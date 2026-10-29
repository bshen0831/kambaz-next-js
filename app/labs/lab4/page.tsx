"use client"
import ClickEvent from "./ClickEvent"
import PassingDataOnEvent from "./PassingDataOnEvent"
import PassingFunctions from "./PassingFunctions"
import CounterBroken from "./CounterBroken"
import Counter from "./Counter"
import BooleanStateVariables from "./BooleanStateVariables"
import StringStateVariables from "./StringStateVariables"
import DateStateVariable from "./DateStateVariable"
import ObjectStateVariable from "./ObjectStateVariable"
import ArrayStateVariable from "./ArrayStateVariable"
import ProfileForm from "./profile/ProfileForm"
import ParentStateComponent from "./ParentStateComponent"
import PropDrilling from "./PropDrilling"
import UrlEncoding from "./UrlEncoding"
import ContextExamples from "./context/ContextExamples"
const name = () => {
    alert("My name is Brian Shen");
};
export default function Lab4() {

    return (
        <div id="wd-lab4">
            <h2>Lab 4</h2>
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions
                message="Hello from Lab 4"
                theFunction={(message: string) => alert(message)}
                theFunction2={name}
                theOtherFunction={() => alert("Sample from parent")}
            />
            <CounterBroken />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ProfileForm />
            <ParentStateComponent />
            <PropDrilling />
            <UrlEncoding />
            <ContextExamples />

            <hr />
        </div>

    );
}