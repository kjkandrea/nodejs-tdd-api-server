const request = require('supertest')
const should = require('should')
const app = require('../../index')

describe('GET /users', () => {
  describe('성공 시', () => {
    it('유저 객체를 담은 배열로 응답한다.', (done) => {
      request(app)
        .get('/users')
        .end((req, res) => {
          res.body.should.be.instanceOf(Array)
          done()
        })
    })

    it('최대 limit 갯수만큼 응답한다.', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((req, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패 시', () => {
    it('limit의 숫자형이 아니면 400을 응답한다.', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET users/1', () => {
  describe('성공 시', () => {
    it('id가 1인 유저 객체를 반환한다.', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1)
          done()
        })
    })
  })
  describe('실패 시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done)
    })

    it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE users/1', () => {
  describe('성공 시', () => {
    it('204를 응답한다.', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done)
    })
  })

  describe('실패 시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST users', () => {
  describe('성공 시', () => {
    let name = 'haebogoyang',
        body;
    before(done => {
      request(app)
        .post('/users')
        .send({name})
        .expect(201)
        .end((req, res) => {
          body = res.body
          done()
        })
    })
    it('생성된 유저 객체를 반환한다.', () => {
      body.should.have.property('id')
    })
    it('입력한 name을 반환한다.', () => {
      body.should.have.property('name', name)
    })
  })
  
  describe('실패 시', () => {
    it('name 패러미터 누락시 400을 반환한다.', done => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done)
    })
    it('name이 중복일 시 409를 반환한다.', done => {
      request(app)
        .post('/users')
        .send({name: 'alice'})
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /user:id', () => {
  describe('성공 시', () => {
    it('변경된 name을 응답한다.', done => {
      const name = 'soojin'
      request(app)
        .put('/users/3')
        .send({name})
        .end((req, res) => {
          res.body.should.have.property('name', name)
          done()
        })
    })
  })
  describe('실패 시', () => {
    it('정수가 아닌 id일 경우 400을 응답한다.', done => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done)
    })
    it('name이 없을 경우 400을 응답한다.', done => {
      request(app)
        .put('/users/1')
        .send({})
        .expect(400)
        .end(done)
    })
    it('없는 user일 경우 404을 응답한다.', done => {
      request(app)
        .put('/users/999')
        .send({name: 'foo'})
        .expect(404)
        .end(done)
    })
    it('name이 중복 일 경우 409을 응답한다.', done => {
      request(app)
        .put('/users/3')
        .send({name: 'yusso'})
        .expect(409)
        .end(done)
    })
  })
})