import {test} from '../src1/custom-fixtures';

//todo Вынести url в конфиг плейрайта или окружения
/* const url = 'https://realworld.qa.guru/#/';
let newUser; */
test('BooksPage test', async ({appMe}) => {
    await appMe.loginPage.visit();
    await appMe.loginPage.loginForm.loginWithCredentials('dlove@yandex.ru', 'Cyfqgth12')
});

