const users = Object.freeze({
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'invalid_password' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
  error: { username: 'error_user', password: 'secret_sauce' },
  visual: { username: 'visual_user', password: 'secret_sauce' },
});

const customer = Object.freeze({
  firstName: 'Ayesha',
  lastName: 'Khan',
  postalCode: '44000',
});

module.exports = { users, customer };
