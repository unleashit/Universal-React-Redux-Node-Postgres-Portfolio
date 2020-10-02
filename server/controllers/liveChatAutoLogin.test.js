// TODO: add back shouldMock() to autologin and fix spy to use mock timestamps when testing

// const autoLogin = require('./liveChatAutoLogin');
//
// const OldDate = Date;
//
// const fakeTimes = [
//     '9-30-2020 17:28:00',
//     '9-30-2020 17:29:00',
//     '9-30-2020 17:30:00',
//     '9-30-2020 17:31:00',
//     '10-1-2020 8:59:00',
//     '10-1-2020 9:00:00',
//     '10-1-2020 9:01:00',
// ];
//
// function* SetMock() {
//     let index = -1;
//
//     while (true) {
//         index++;
//         if (index > fakeTimes.length - 1) index = 0;
//         // eslint-disable-next-line no-global-assign
//         yield (Date = function () {
//             return new OldDate(fakeTimes[index]);
//         });
//     }
// }
//
// const setMock = SetMock();
//
// function resetMock() {
//     // eslint-disable-next-line no-global-assign
//     Date = OldDate;
// }
//
// describe('autoLogin', () => {
//     let spy;
//
//     beforeAll(() => {
//         spy = jest.spyOn(autoLogin, 'shouldMock')
//             .mockImplementation((isOpen, args) => {
//             setMock.next();
//             console.log('MOCK DATE: ', new Date());
//             isOpen(args);
//             resetMock();
//         });
//     });
//
//     afterAll(() => {
//         spy.mockReset();
//     })
//
//     it('autologin should work', async () => {
//         await autoLogin.startAutologin();
//
//         expect(true).toBe(true);
//     });
// });
