/**
 * Created by dev on 2017. 2. 7..
 * BDD : Behavior-driven development should be focused on the business behaviors your code is implementing
 *
 * TDD VS BDD
 * : These tests are helpful, but only helpful to one group of people: engineers.
 *   BDD is useful for communicating with every member of a cross-functional product team.
 *
 *
 *
 */


describe('#TODO 서비스', function() {
    describe('유저는 할 일을 생성할 수 있다.', function() {
        const dummyTodo = {
            title: 'TODO 서비스 개발 및 학습하기',
            status: 'IN_PROGRESS',
            context: 'WORK',
            dueDate: '2017-02-10',
            createdAt: '2017-02-05',
            doneAt: '2017-02-10'
        };

        it('할 일 상태 값은 지정된 값 이외에는 유효성 검사에 실패한다.', function() {
            dummyTodo.status = 'WORKING';
        });

        it('할 일 컨텍스트 값은 지정된 값 이외에는 유효성 검사에 실패한다.', function() {
        });

        it('필수 값 누락 시 유효성 검사에 실패한다.', function() {
        });
    });

    describe('유저는 할 일 상세를 확인할 수 있다.', function () {
        it('할 일 상세 식별 값을 누락하면 상세 확인에 실패한다.', function() {
        });
    });

    describe('유저는 할 일 목록 확인할 수 있다.', function () {
        it('할 일 목록 중 제목의 부분 텍스트로 목록 조회를 할 수 있다.', function() {
        });

        it('할 일 목록은 페이지 단위로 확인할 수 있다.', function() {
        });

        it('할 일 목록 페이지 값(skip, limit) 누락 시 첫 번째 페이지가 노출된다.', function() {
        });

        it('할 일의 상태별로 목록을 확인할 수 있다.', function() {
        });

        it('할 일의 마감 예정일을 기준으로 시작일~종료일 사이의 목록을 확인할 수 있다.', function() {
        });
    });

    describe('할 일 수정', function () {
        it('', function() {
        });
    });
});