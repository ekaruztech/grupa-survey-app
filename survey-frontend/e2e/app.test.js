import { Selector, ClientFunction } from 'testcafe';
import { v4 } from 'uuid';

const origin = 'https://ekz-survey.herokuapp.com/';
const getUrl = ClientFunction(() => document.location.href);


const user = {
  email: 'yppubezuf-7778@yopmail.com',
  password: 'yppubezuf-7778@yopmail.com'
};

fixture `Survelie (${origin})`
  .page`${origin}`
  .before(async ctx => {
    let testSuiteRunId = v4();
    console.log(`Test Suite Run ID: ${testSuiteRunId}`);
  })
  .beforeEach(async t => {
    await t.resizeWindow(1200, 700);
  })
  .afterEach(async t => {
    await t.eval(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  const login = async t => {
    await t
      .typeText(Selector('#login_email'), user.email, { replace: true, paste: true })
      .typeText(Selector('#login_password'), user.email, { replace: true, paste: true })
      .click(Selector('#login > div:nth-child(3) > div > div > div > button').withText(/Sign in/i))
      .expect(getUrl()).match(/https:\/\/ekz-survey.herokuapp.com\/dashboard/)
  }

  test('test homepage url', async t => {
    await t.expect(getUrl()).match(/https:\/\/ekz-survey.herokuapp.com/);
  });

  test('test_1_login', async t => {
    // TODO: Scaffold, to be removed
    await login(t);
  });
