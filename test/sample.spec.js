describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App');
    })
    it('should add todo correctly', async function() {
      await page.click('#new-todo');
      await page.type('#new-todo', 'new todo item');
      await page.click('#enter')
      let todoList = await page.waitFor('#todolist');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 
  });

  describe('render todolist', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should render todolist correctly', async function() {
      let todoList = await page.waitFor('#todolist');
      const length = await page.evaluate(todoList => todoList.getElementsByTagName('li').length, todoList);
      expect(length).to.eql(3);
      const expectInputContent = await page.evaluate(todoList => todoList.firstChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('AAA');
    }) 
  });
  describe('delete todolist', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should delete todolist correctly', async function() {
      let todoList = await page.waitFor('#todolist');
      await page.click('#del-0');
      const length = await page.evaluate(todoList => todoList.getElementsByTagName('li').length, todoList);
      expect(length).to.eql(2);
      const expectInputContent = await page.evaluate(todoList => todoList.firstChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('BBB');

    }) 
  });