'use strict';

const assert = require("assert");
const mongoose = require('mongoose');
const service = require('../service');
const sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');
const should = require('should');


describe('#TODO 서비스', function() {
    let serviceMock = null;
    let msg = null;

    before(() => {
        serviceMock = sinon.mock(service);
    });

    beforeEach(() => {
        serviceMock.restore();
    });


    describe('유저는 할 일을 생성할 수 있다.', function() {
        let dummyBody = null;
        // Add Hook
        beforeEach(() => {
            dummyBody = {};
            dummyBody.title = 'TODO 서비스 개발 및 학습하기';
            dummyBody.status = 'TODO';
            dummyBody.context = 'WORK';
            dummyBody.dueDate = '2017-02-10';
        });

        it('[할 일/진행 중/완료된 일]을 생성 할 수 있다.', function () {
            serviceMock.expects('create')
                .withArgs(dummyBody)
                .once()
                .resolves({});

            const promise = service.create(dummyBody);
            return promise.should.be.fulfilled()
                .then(() => {
                    serviceMock.verify();
                    serviceMock.restore();
                });
        });

        it('할 일 상태 값은 지정된 값 이외에는 유효성 검사에 실패한다.', function() {
            dummyBody.status = 'WORKING';
            msg = '`status`값이 적절하지 않습니다.';

            serviceMock.expects('create')
                .withArgs(dummyBody)
                .once()
                .rejects(new Error(msg));

            const promise = service.create(dummyBody);
            return promise.should.be.rejectedWith();
        });

        it('할 일 컨텍스트 값은 지정된 값 이외에는 유효성 검사에 실패한다.', function() {
            dummyBody.context = 'STUDYING';

            serviceMock.expects('create')
                .withArgs(dummyBody)
                .once()
                .rejects();

            return service.create(dummyBody).should.be.rejected();
        });
    });




    describe('유저는 할 일 상세를 조회할 수 있다.', function () {
        let dummyTodoId = null;
        let expectedTodo = {};

        beforeEach(() => {
            dummyTodoId = null;
            expectedTodo = {};
        });

        it('할 일 식별 값(todoId)으로 상세를 조회할 수 있다.', function () {
            dummyTodoId = '5892dfd4921d91402989b43c';
            expectedTodo = {
                "_id": "5892dfd4921d91402989b43c",
                "title": "AngularJS",
                "status": "IN_PROGRESS",
                "context": "HOME",
                "dueDate": "2017-02-02T07:26:34.538Z",
                "createdAt": "2017-01-20T07:29:24.587Z"
            };

            serviceMock.expects('get')
                .withArgs(dummyTodoId)
                .once()
                .resolves(expectedTodo);

            const promise = service.get(dummyTodoId);

            return promise.should.be.fulfilled()
                .then((res) => {
                    res._id.should.be.equal(expectedTodo._id);
                    res.title.should.be.equal(expectedTodo.title);
                    res.status.should.be.equal(expectedTodo.status);
                    res.context.should.be.equal(expectedTodo.context);
                    res.dueDate.should.be.equal(expectedTodo.dueDate);
                    res.createdAt.should.be.equal(expectedTodo.createdAt);
                });
        });

        it('할 일 식별 값(todoId)이 적절하지 않은 경우 조회 결과를 확인할 수 없다', function() {
            dummyTodoId = 'abcd1234';

            expectedTodo = {
                error: {
                    name: "CastError",
                }
            };


            serviceMock.expects('get')
                .withArgs(dummyTodoId)
                .once()
                .rejects(expectedTodo);

            const promise = service.get(dummyTodoId);

            return promise.should.be.rejectedWith()
                .then((err) => {
                    err.name.should.be.equal(expectedTodo.error.name);
                });
        });
    });

    describe('유저는 할 일 목록 확인할 수 있다.', function () {
        let query = {};
        let skip = 0;
        let limit = 10;
        let items = [];
        let totalCount = 0;
        let expectedTodo = {};

        beforeEach(() => {
            query = {};
            skip = 0;
            limit = 10;
            items = [];
            totalCount = 0;
            expectedTodo = {}
        });


        it('할 일 목록 중 제목의 부분 텍스트로 목록 조회를 할 수 있다.', function() {
            expectedTodo = {
                skip,
                limit,
                items: [
                    { title: 'TESTT' },
                    { title: 'TESTTT'}
                ],
                totalCount: 2
            };

            query.title = 'TEST';
            serviceMock.expects('list')
                .withArgs(query)
                .once()
                .resolves(expectedTodo);

            const promise = service.list(query);
            return promise.should.be.fulfilled()
                .then((res) => {
                    res.skip.should.be.equal(expectedTodo.skip);
                    res.limit.should.be.equal(expectedTodo.limit);
                    res.items[0].title.should.be.equal(expectedTodo.items[0].title);
                    res.items[1].title.should.be.equal(expectedTodo.items[1].title);
                });
        });

        it('할 일 목록은 페이지 단위로 확인할 수 있다.', function() {
            const expectedTodo = {
                skip,
                limit,
                items: [
                    {},
                    {}
                ],
                totalCount: 2
            };

            query.skip = skip;
            query.limit = limit;
            serviceMock.expects('list')
                .withArgs(query)
                .once()
                .resolves({
                    skip,
                    limit,
                    items: [
                        {},
                        {}
                    ],
                    totalCount: 2
                });

            const promise = service.list(query);

            return promise.should.be.fulfilled()
                .then((res) => {
                    res.skip.should.be.equal(expectedTodo.skip);
                    res.limit.should.be.equal(expectedTodo.limit);
                    res.items.length.should.be.equal(expectedTodo.items.length);
                    res.totalCount.should.be.equal(expectedTodo.totalCount);
                })
        });

        it('할 일 목록 페이지 값(skip, limit) 누락 시 첫 번째 페이지가 노출된다.', function() {});

        it('할 일의 상태별로 목록을 확인할 수 있다.', function() {});

        it('할 일의 마감 예정일을 기준으로 시작일~종료일 사이의 목록을 확인할 수 있다.', function() {});
    });
    /*
    describe('할 일 수정', function () {
        it('', function() {
        });
    });
    */

});