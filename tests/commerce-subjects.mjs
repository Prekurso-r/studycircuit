// Run with: node tests/commerce-subjects.mjs
// A broken bank reference prevents the whole app from loading. Check the new
// courses' links and question shapes independently of the browser UI.
import assert from 'node:assert/strict';
import { subjects, questions } from '../questions.js';
import { economicsPractice } from '../economics-practice.js';
import { businessPractice } from '../business-practice.js';

const newQuestions = [...economicsPractice, ...businessPractice];
const ids = new Set();
for (const question of newQuestions) {
  assert.ok(!ids.has(question.id), `Duplicate question ID: ${question.id}`);
  ids.add(question.id);
  assert.equal(questions[question.id]?.prompt, question.prompt, `Question ID was overwritten: ${question.id}`);
  assert.ok(question.prompt.trim() && question.explanation.trim(), `Missing text: ${question.id}`);
  assert.ok(['simple', 'challenge'].includes(question.level), `Unknown level: ${question.id}`);
  assert.equal(question.options.length, 4, `Expected four options: ${question.id}`);
  assert.equal(new Set(question.options.map(option => option.trim().toLowerCase())).size, 4, `Duplicate options: ${question.id}`);
  assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, `Invalid answer: ${question.id}`);
}

for (const [id, bank] of [['economics', economicsPractice], ['business', businessPractice]]) {
  const subject = subjects.find(item => item.id === id);
  assert.ok(subject, `Missing subject: ${id}`);
  assert.equal(subject.syllabus.sections.length, 2, `Missing AS or A Level section: ${id}`);
  const assigned = new Set();
  for (const topic of subject.syllabus.topics) {
    assert.ok(topic.questionIds.some(questionId => questions[questionId].level === 'simple'), `No simple questions: ${topic.id}`);
    assert.ok(topic.questionIds.some(questionId => questions[questionId].level === 'challenge'), `No challenge questions: ${topic.id}`);
    for (const questionId of topic.questionIds) {
      assert.equal(questions[questionId].subjectId, id, `Wrong subject for ${questionId}`);
      assert.ok(!assigned.has(questionId), `Question assigned to more than one topic: ${questionId}`);
      assigned.add(questionId);
    }
  }
  assert.equal(assigned.size, bank.length, `Some ${id} questions are not mapped to a topic`);
}
console.log(`Validated ${newQuestions.length} Economics and Business questions and their syllabus mappings.`);
