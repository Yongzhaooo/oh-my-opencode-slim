import { describe, expect, test } from 'bun:test';
import { buildOrchestratorPrompt } from './orchestrator';

describe('orchestrator prompt', () => {
  test('allows bounded direct work while retaining safe delegation', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain('including related changes across a few files');
    expect(prompt).toContain(
      'small UI adjustments within an established design',
    );
    expect(prompt).toContain('benefit that outweighs the handoff cost');
    expect(prompt).not.toContain('one isolated, clear, low-risk action');
    expect(prompt).not.toContain('Never handle UI/design work directly');
    expect(prompt).not.toMatch(/Stats:.*\d/);
    expect(prompt).toContain('Every delegation names a validation owner');
    expect(prompt).toContain('write scopes do not conflict');
    expect(prompt).toContain('task_result');
  });

  test('requires the question tool for blocking user input', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain('use the `question` tool');
    expect(prompt).toContain('Enable custom input');
    expect(prompt).toContain('concise pasted response or command output');
    expect(prompt).toContain('small bounded set of options');
    expect(prompt).toContain('ordinary dialogue that does not block work');
  });

  test('requires wait_for_user for external manual work', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain('call `wait_for_user` as your final tool action');
    expect(prompt).toContain('give the user concrete manual steps');
    expect(prompt).toContain('end the turn');
    expect(prompt).toContain('never use `wait_for_user` to await them');
    expect(prompt).toContain('Do not rely on ordinary text alone');
  });

  test('falls back to question when wait_for_user is disabled', () => {
    const prompt = buildOrchestratorPrompt(undefined, undefined, false);

    expect(prompt).not.toContain(
      'call `wait_for_user` as your final tool action',
    );
    expect(prompt).toContain('`wait_for_user` is disabled');
    expect(prompt).toContain(
      'use the `question` tool as the blocking boundary',
    );
  });

  test('omits end-turn instruction when wake scheduler is disabled', () => {
    const prompt = buildOrchestratorPrompt(undefined, undefined, true, false);

    expect(prompt).toContain('call `wait_for_user` as your final tool action');
    expect(prompt).not.toContain('End Turn After Background Tasks');
    expect(prompt).toContain('Do not immediately wait after spawning');
  });
});
