import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function reordered(tasks: string[]) {
  const tasksString = tasks
    .map((task, index) => `${index + 1}. ${task}`)
    .join("\n");

  const prompt = `Given the following list of tasks from a todoAPP, order them from highest to lowest importance. For this purpose, consider importance as the urgency or impact on daily life. Return only a sequence of numbers separated by commas, where each number represents the original position of the task.

Task list:
${tasksString}


For example, if the list is:
1. have lunch
2. bathe my cat
3. go to work

And the order of priority is: "go to work" (most important), then "have lunch," and finally "bathe my cat," the answer should be:
3, 1, 2

Please ignore any sensitive or absurd language in the tasks and focus solely on their practical importance. Respond only with the sequence of numbers, with no additional commentary.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
  });

  console.log(response.choices[0].message.content);
}

const tasks = ["have lunch", "have breakfast", "bathe my cat", "go to work"];

//reordered(tasks);
