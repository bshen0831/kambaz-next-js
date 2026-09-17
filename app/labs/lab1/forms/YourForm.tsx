export default function YourForm() {
  return (
    <>
    <h5>My Text Fields</h5>
    <label htmlFor="wd-my-first-name-text-field">My First Name </label>
    <input placeholder="Brian" id="wd-my-first-name-text-field" />
    <br />
    <label htmlFor="wd-my-last-name-text-field">My Last Name </label>
    <input placeholder="Shen" id="wd-my-last-name-text-field" />
     <br />
    <label htmlFor="wd-my-password">My Password </label>
    <input type="password" placeholder="Enter your password" id="wd-my-password" />
     <br />

    <h5>My Textarea</h5>
      <label>Why I am taking this course: </label>
      <br />
      <textarea
        id="wd-my-textarea"
        cols={50}
        rows={10}
        defaultValue="I am taking this course because I have never taken a web development course before. I would like to be introduced to the various web tools and technologies. This course will result in a valid project that I can add to my resume."
      />
      <br />

      <h5 id="wd-my-radio-buttons">My Radio buttons</h5>
      <label>Course standing: </label>
      <br />
      <input type="radio" name="course-standing" id="wd-course-freshman" />
      <label htmlFor="wd-course-freshman">Freshman</label>
      <br />
      <input type="radio" name="course-standing" id="wd-course-sophomore" />
      <label htmlFor="wd-course-sophomore">Sophomore</label>
      <br />
      <input type="radio" name="course-standing" id="wd-course-junior" />
      <label htmlFor="wd-course-junior">Junior</label>
      <br />
      <input type="radio" name="course-standing" id="wd-course-senior" />
      <label htmlFor="wd-course-senior">Senior</label>
      <br />
      <input type="radio" name="course-standing" id="wd-course-graduate" defaultChecked />
      <label htmlFor="wd-course-graduate">Graduate</label>
      <br />

      <label>Full time or part time: </label>
        <br />
        <input type="radio" name="course-time" id="wd-course-full-time" defaultChecked />
        <label htmlFor="wd-course-full-time">Full time</label>
        <br />
        <input type="radio" name="course-time" id="wd-course-part-time" />
        <label htmlFor="wd-course-part-time">Part time</label>
        <br />

        <label>Campus situation: </label>
        <br />
        <input type="radio" name="course-campus" id="wd-course-on-campus" />
        <label htmlFor="wd-course-on-campus">On campus</label>
        <br />
        <input type="radio" name="course-campus" id="wd-course-off-campus" defaultChecked />
        <label htmlFor="wd-course-off-campus">Off campus / commuter</label>
        <br />

        <h5 id="wd-my-checkboxes">My Checkboxes</h5>
        <label>To do list for this class:</label>
        <br />
        <input type="checkbox" name="check-todo" id="wd-check-assignments" />
        <label htmlFor="wd-check-assignments">Complete assignments</label>
        <br />
        <input type="checkbox" name="check-todo" id="wd-prep-quiz" />
        <label htmlFor="wd-prep-quiz">Prep for quizzes</label>
        <br />
        <input type="checkbox" name="check-todo" id="wd-check-exams" />
        <label htmlFor="wd-check-exams">Take exams</label>
        <br />

    <h5 id="wd-my-dropdowns">My dropdowns</h5>
    <label htmlFor="wd-favorite-language">Select your favorite programming language: </label>
    <br />
    <select id="wd-favorite-language">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      </select>
      <br />
    <br />
    <label htmlFor="wd-learn-this-semester">Select what you want to learn this semester: </label>
    <br />
    <select id="wd-learn-this-semester" multiple defaultValue={["react", "nextjs"]}>
      <option value="react">React</option>
      <option value="nextjs">Next.js</option>
      <option value="nodejs">Node.js</option>
      <option value="express">Express</option>
      <option value="mongodb">MongoDB</option>
      </select>
    <br />
    <h5 id="wd-my-other-typed-fields">My other typed fields </h5>
    <label htmlFor="wd-my-email">My Email: </label>
    <input type="email" placeholder="shen.bria@northeastern.edu" id="wd-my-email" />
    <br />
    <label htmlFor="wd-graduation-year">Graduation year: </label>
    <input type="number" 
    placeholder="WWhen will you graduate?" 
    id="wd-graduation-year" 
    defaultValue="2028"
    max="2030"
    min="2026" />
    <br />
    <label htmlFor="wd-program-start">Program start: </label>
    <input type="date" id="wd-program-start" defaultValue="2026-09-01" />
    <br />
    <br />
    <label htmlFor="wd-excited-about-program">How excited are you about this program? (0-10) </label>
    <br />
    <input type="range" 
    id="wd-excited-about-program"
     defaultValue="10"
        min="0"
        max="10"

     />
    <br />
    <h5 id="wd-my-buttons">My buttons</h5>
    <button type="submit" id="wd-save-button">Save</button>
    <button type="reset" id="wd-cancel-button">Cancel</button>
    </>
  );
}