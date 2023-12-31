const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const {expect} = chai;

chai.use(chaiHttp);
const user = { userID: 'Admin', password: 'Admin123' };
let token;

// Test case for getAllStats function
describe('Stats API Tests',()=>{
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
describe("GET /api/v1/stats/all", () => {
  it("should return summary stats for all records", (done) => {
    chai
      .request(app)
      .get("/api/v1/stats/all")
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("mean");
        expect(res.body).to.have.property("min");
        expect(res.body).to.have.property("max");
        expect(res.body.mean).to.be.a('number');
        expect(res.body.min).to.be.a('number');
        expect(res.body.max).to.be.a('number');
        done();
      });
  });
});

// Test case for getContractStats function
describe("GET /api/v1/stats/contract", () => {
  it("should return summary stats for contract records", (done) => {
    chai
      .request(app)
      .get("/api/v1/stats/contract")
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("mean");
        expect(res.body).to.have.property("min");
        expect(res.body).to.have.property("max");
        done();
      });
  });
});

// Test case for getDepartmentStats function
describe("GET /api/v1/stats/departments", () => {
  it("should return summary stats for each department", (done) => {
    chai
      .request(app)
      .get("/api/v1/stats/departments")
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("Engineering");
        expect(res.body).to.have.property("Banking");
        expect(res.body).to.have.property("Operations");
        expect(res.body).to.have.property("Administration");
        done();
      });
  });
});

// Test case for getSubDepartmentStats function
describe("GET /api/v1/stats/subdepartments", () => {
  it("should return summary stats for each department and sub-department combination", (done) => {
    chai
      .request(app)
      .get("/api/v1/stats/subdepartments")
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("Engineering_Platform");
        expect(res.body).to.have.property("Banking_Loan");
        expect(res.body).to.have.property("Operations_CustomerOnboarding");
        expect(res.body).to.have.property("Administration_Agriculture");
        done();
      });
  });
});
});