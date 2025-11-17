import { Router } from "express";
import {
  getLessonsByCourseHandler,
  setLessonCompleteHandler,
  getCourseProgressHandler,
} from "./lesson.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

// lấy danh sách bài học 1 khóa (có thể cho guest xem, nhưng nếu cần trạng thái completed thì requireAuth)
router.get(
  "/by-course/:courseId",
  requireAuth,       // nếu muốn cho chưa login xem thì bỏ middleware này
  getLessonsByCourseHandler
);

// đánh dấu hoàn thành / bỏ hoàn thành 1 bài
router.post("/:lessonId/complete", requireAuth, setLessonCompleteHandler);

// progress toàn khóa
router.get(
  "/course/:courseId/progress",
  requireAuth,
  getCourseProgressHandler
);

export default router;
