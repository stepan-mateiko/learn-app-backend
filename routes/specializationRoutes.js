import { Router } from "express";
import { specializationService } from "../services/specializationService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const specializations = await specializationService.getAllSpecializations();
    res.json(specializations);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };

// import { Router } from "express";
// import { specializationService } from "../services/specializationService.js";
// import { responseMiddleware } from "../middlewares/response.middleware.js";

// const router = Router();
// router.get(
//   "/",
//   (req, res, next) => {
//     try {
//       const specializations = specializationService.getAllSpecializations();
//       if (specializations) {
//         req.body = {
//           specializations,
//         };
//         return req.body;
//       }
//     } catch ({ message }) {
//       return (req.body = {
//         error: true,
//         message,
//       });
//     } finally {
//       next();
//     }
//   },

//   responseMiddleware
// );
// export { router };
