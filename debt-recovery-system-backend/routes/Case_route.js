/* 
    Purpose: This template is used for the DRC Routes.
    Created Date: 2024-11-21
    Created By: Janendra Chamodi (apjanendra@gmail.com)
    Last Modified Date: 2024-11-24
    Modified By: Janendra Chamodi (apjanendra@gmail.com)
                 Naduni Rabel (rabelnaduni2000@gmail.com)
                 Lasandi Randini (randini-im20057@stu.kln.ac.lk)
    Version: Node.js v20.11.1
    Dependencies: express
    Related Files: DRC_controller.js
    Notes:  
*/


import { Router } from "express";
import { drcExtendValidityPeriod } from "../controllers/Case_controller.js";
import { getDRCDetailsByCaseId } from '../controllers/Case_controller.js';
// import { getCaseDetailsByCaseId } from '../controllers/Case_controller.js';
import { get } from "mongoose";



const router = Router();

router.patch("/Drc_Extend_Validity_Period", drcExtendValidityPeriod);

router.post('/getDRCDetailsByCaseId', getDRCDetailsByCaseId);
// router.post('/getCaseDetailsByCaseId',getCaseDetailsByCaseId);

export default router;

