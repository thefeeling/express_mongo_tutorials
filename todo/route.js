const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**
 * [TODO APP]
 * Created by dev on 2017. 2. 2..
 * 1) GET    /api/todo         할 일 목록 조회
 * 2) GET    /api/todo/:todoId 할 일 상세 조회
 * 3) POST   /api/todo         할 일 생성       HTTP/1.1 204 No Content
 * 4) PUT    /api/todo/:todoId 할 일 변경 요청
 * 5) DELETE /api/todo/:todoId 할 일 삭제       HTTP/1.1 204 No Content
 */
router.get('/'      , controller.list);     // 할 일 목록 조회
router.get('/:id'   , controller.get);      // 할 일 상세 조회
router.post('/'     , controller.create);   // 할 일 생성
router.put('/:id'   , controller.update);   // 할 일 변경 요청
router.delete('/:id', controller.remove);   // 할 일 삭제

module.exports = router;