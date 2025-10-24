import mongoose from "mongoose";
import Notice from "../../models/notice.model.js";

export const SendNotice = async (req, res) => {
  try {
    const receiver_role = req.body.receiver_role || "student";
    const sender_role = req.body.sender_role;
    const title = req.body.title;
    const message = req.body.message;
    const sender = new mongoose.Types.ObjectId(req.body.sender);

    await Notice.create({ sender, sender_role, receiver_role, title, message });
    return res.json({ msg: "Notice Sent Successfully!" });
  } catch (error) {
    console.error("notice.controller.js => SendNotice", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const GetAllNotice = async (req, res) => {
  try {
    const notices = await Notice.find();
    return res.json(notices);
  } catch (error) {
    console.error("notice.controller.js => GetAllNotice", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const GetNotice = async (req, res) => {
  try {
    if (!req.query.noticeId) return res.status(400).json({ msg: "Notice ID required" });

    const notice = await Notice.findById(req.query.noticeId);
    return res.json(notice);
  } catch (error) {
    console.error("notice.controller.js => GetNotice", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const DeleteNotice = async (req, res) => {
  try {
    if (!req.query.noticeId) return res.status(400).json({ msg: "Notice ID required" });

    await Notice.findByIdAndDelete(req.query.noticeId);
    return res.json({ msg: "Notice Deleted Successfully!" });
  } catch (error) {
    console.error("notice.controller.js => DeleteNotice", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};