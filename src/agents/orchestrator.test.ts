import { describe, expect, test } from 'bun:test';
import { buildOrchestratorPrompt } from './orchestrator';

describe('orchestrator prompt', () => {
  test('allows bounded direct work while retaining safe delegation', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain('including related changes across a few files');
    expect(prompt).toContain(
      'small UI adjustments within an established design',
    );
    expect(prompt).toContain('benefit outweighs the handoff cost');
    expect(prompt).not.toContain('one isolated, clear, low-risk action');
    expect(prompt).not.toContain('Never handle UI/design work directly');
    expect(prompt).not.toMatch(/Stats:.*\d/);
    expect(prompt).toContain('Every delegation names a validation owner');
    expect(prompt).toContain('write scopes do not conflict');
    expect(prompt).toContain('task_result');
  });

  test('keeps direct work from absorbing every lane', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain(
      'Do not keep substantive work entirely in the orchestrator merely because each individual step seems easy',
    );
    expect(prompt).toContain('you own the routing decision');
  });

  test('states observable delegation triggers for each specialist lane', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain('Delegate on these observable conditions');
    expect(prompt).toContain(
      'Two or more parts can start now with non-conflicting write scopes',
    );
    expect(prompt).toContain('do not yet know which files are in scope');
    expect(prompt).toContain("external library's current API");
    expect(prompt).toContain('survived two fix attempts');
    expect(prompt).toContain('needs visual judgment');
    expect(prompt).toContain('can run in its own lane while you continue');
  });

  test('keeps council out of generic delegation requests', () => {
    const prompt = buildOrchestratorPrompt();

    expect(prompt).toContain(
      'never answer a generic delegation request with @council',
    );
    expect(prompt).toContain('the most expensive and slowest lane available');
    expect(prompt).toContain(
      'There is no specific decision for the council to resolve',
    );
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
