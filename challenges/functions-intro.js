// challenges/functions-intro.js

export const challenge = {
    id: 'functions-intro',
    title: 'POCC - Introduction to Functions',
    
    instructionsHTML: `
        <p>This is a placeholder for the functions challenge.</p>
        <ul>
            <li>Define a function called 'say_hello' that prints "Hello!".</li>
        </ul>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("say_hello")
    tester.full_check("say_hello", e_out="Hello!")
except Exception as e:
    tester.results.append({ "testDescription": f"Critical error: {e}" })

tester.json_results()
`
};
