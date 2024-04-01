const Teacher = require('../Model/teacherModel');
const classModel = require('../Model/classModel');

exports.getAllTeachers = (req, res, next) => {
    try {
        Teacher.find()
            .then((data) => {
                res.status(200).json({ data, message: "get all teachers" });
            })
            .catch((err) => {
                res.status(500).json({ message: err + '' });
            });
    }
    catch (err) {
        res.status(500).json({ message: err + '' });
    }
};

exports.getTeacherById = (req, res, next) => {
    try {
        Teacher.findOne({ _id: req.params.id })
            .then((data) => {
                if (data) {
                    res.status(200).json({ data, message: "get one teacher" });
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err + '' });
            });
    }
    catch (err) {
        res.status(500).json({ message: err + '' });
    }
};

exports.createTeacher = async (req, res, next) => {
    try {
        await Teacher.findOne({ email: req.body.email })
            .then((data) => {
                if (!data) {
                    const teacher = new Teacher({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        password: req.body.password,
                        image: req.file.path
                    });
                    teacher.save()
                        .then((data) => {
                            res.status(200).json({ data, message: "create teacher" });
                        })
                        .catch((err) => {
                            res.status(500).json({ message: err + '' });
                        });
                } else {
                    res.status(400).json({ message: "User already exists" });
                }
            })
    }
    catch (err) {
        res.status(500).json({ message: err + '' });
    }
};

exports.updateTeacher = (req, res, next) => {
    try {
        Teacher.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, })
            .then((data) => {
                if (data) {
                    res.status(200).json({ data });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err + '' });
            });
    }
    catch (err) {
        res.status(500).json({ message: err + '' });
    }
};

exports.deleteTeacher = async (req, res, next) => {
    console.log(req.params.id + "from delete");
    try {
        await Teacher.findOneAndDelete({ _id: req.body._id })
            .then((data) => {
                if (data) {
                    res.status(200).json({ data, message: "delete teacher" });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err + '' });
            });
    }
    catch (err) {
        res.status(500).json({ message: err + '' });
    }
};

exports.getSupervisors = (req, res, next) => {
    try {
        classModel.find().pupolate({ path: "teachers" }, "supervisor")
            .then((data) => {
                res.status(200).json({ data, message: "get all supervisors" });
            })
            .catch((err) => {
                res.status(500).json({ message: err + 'n' });
            });
    } catch (err) {
        res.status(500).json({ message: err + 's' });
    }
};
