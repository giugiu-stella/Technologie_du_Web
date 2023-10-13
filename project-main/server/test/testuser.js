const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "jotaro",
            mail: "jotarokujo@gmail.com",
            password: "crusaders",
            passwordbis: "crusaders"
        };

        request
            .put('/api/user/signup')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.user.login}`)
                return Promise.all([
                    request
                        .get(`/api/user/${res.body.user.login}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body.user.login, user.login)
                            chai.assert.deepEqual(res.body.user.mail, user.mail)
                            chai.assert.deepEqual(res.body.user.password, user.password)
                        }),

                    request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

