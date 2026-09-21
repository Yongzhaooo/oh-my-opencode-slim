---
name: verification-planning
description: Use when existing checks do not provide a clear way to verify the requested behavior, such as an unfamiliar integration, hard-to-observe state, or a risky migration. Do not activate merely because a change is non-trivial or touches several files.
---

# Verification Planning

Use ordinary project checks, or `test-verification` when available, when the
verification path is already clear. Do not create a second verification plan.

When it is unclear how to establish correctness:

1. Name the behavior to verify and the specific uncertainty existing checks
   cannot resolve.
2. Inspect the closest tests and observable system behavior. Choose the smallest
   check that can resolve that uncertainty; compare alternatives only when the
   choice remains unclear.
3. If necessary, add a focused test or temporary diagnostic. Use existing project
   tools. Introduce dependencies or persistent diagnostic surfaces only when
   needed and within the user's authorized scope.
4. Run the check and report what it establishes, any remaining limitation, and
   whether temporary support was removed or retained for a stated reason.

Assign one validation owner when work is delegated. Reuse evidence while its
relevant code, inputs, environment, and state remain valid. Required repository
and release checks still apply. Stop when the evidence covers the requested
behavior; broaden only for a failure, changed state, or material evidence gap.
